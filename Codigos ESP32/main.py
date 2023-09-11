import socket
import json
import network
from LogisticRegression import *
import machine
from machine import Pin, SoftI2C
from i2c_lcd import I2cLcd
from time import sleep

I2C_ADDR = 0x27
total_rows = 2
total_cols = 16

i2c = SoftI2C(scl=Pin(22), sda=Pin(21), freq=10000)
lcd = I2cLcd(i2c, I2C_ADDR, total_rows, total_cols)


def run_predict(passenger_lst):
    model = LogisticRegression()
    predictions = model.predict(passenger_lst)

    #print(predictions)
    
    return predictions


def turn_to_lists(data):
    passenger_ids = []
    passenger_lst = []
    
    for passenger in data:
        passenger_ids.append(passenger["PassengerId"])
        curr_passenger = [passenger["Pclass"], passenger["Age"], passenger["Sex"], passenger["Fam"], passenger["Fare"], passenger["Embarked"]]
        passenger_lst.append(curr_passenger)
    
    #print(passenger_lst)
    
    return (passenger_ids, passenger_lst)


def turn_to_dict(ids, predictions):
    new_data = []
    n = len(predictions)
    
    for i in range(n):
        passenger = {
            "PassengerId": ids[i],
            "Prediction": predictions[i]
        }
        new_data.append(passenger)
    
    #print(new_data)
    
    return new_data


def handle_request(request):
    try:
        # Separate the header and the body to get the JSON data from the body
        header, body = request.split('\r\n\r\n', 1)
        headers = header.split('\r\n')
        method, path, _ = headers[0].split(' ')
        
        # Handling preflight (OPTIONS) requests
        if method == 'OPTIONS':
            response = ''
            status_code = '200 OK'
        elif method == 'POST' and path == '/esp32-passengers':
            
            lcd.putstr("Recibiendo datos")
            sleep(1)
            lcd.clear()
            print("Recibiendo datos")
            
            # Load the JSON data from the body of the request
            data = json.loads(body)
            
            # Convert JSON body to list of lists
            passenger_ids, passenger_lst = turn_to_lists(data)
            
            # Make predictions with Logistic Regression Class
            
            lcd.putstr("Generamos Predicciones")
            sleep(1)
            lcd.clear()
            print("Generamos Predicciones")
            
            predictions = run_predict(passenger_lst)
            
            # Convert predictions to dict
            new_data = turn_to_dict(passenger_ids, predictions)
            
            # Create a JSON response with the prediction
            response = json.dumps(new_data)
            status_code = '200 OK'
            
            lcd.putstr("Regresando datos")
            sleep(1)
            lcd.clear()
            print("Regresando datos")
            
        else:
            response = json.dumps({'status': 'error', 'message': 'Not Found'})
            status_code = '404 Not Found'
    except Exception as e:
        # If an error occurs, create a JSON error response
        response = json.dumps({'status': 'error', 'message': str(e)})
        status_code = '400 Bad Request'

    # Create the full HTTP response with the status line, Content-Type header, and JSON response body
    response_headers = [
        'HTTP/1.1 ' + status_code,
        'Content-Type: application/json',
        'Access-Control-Allow-Origin: *',
        'Access-Control-Allow-Methods: POST, OPTIONS',
        'Access-Control-Allow-Headers: Content-Type',
        'Content-Length: ' + str(len(response)),
        '',  # End of headers
        response
    ]
    return '\r\n'.join(response_headers)


def start_server():
    addr = socket.getaddrinfo('0.0.0.0', 8001)[0][-1]
    s = socket.socket()
    s.bind(addr)
    s.listen(5)
    
    print('Listening on', addr)
    lcd.putstr("Conectando a red")
    sleep(1)
    lcd.clear()
    
    while True:
        conn, addr = s.accept()
        print('Got a connection from %s' % str(addr))
        request = conn.recv(2048)
        request = request.decode('utf-8')
        print('Content = %s' % request)
        
        response = handle_request(request)
        
        conn.send(response.encode('utf-8'))
        conn.close()


# Run
start_server()

