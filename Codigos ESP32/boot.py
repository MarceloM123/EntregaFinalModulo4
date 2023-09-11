# This file is executed on every boot (including wake-boot from deepsleep)
import network

def connect_to_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    
    if not wlan.isconnected():
        print('Connecting to network...')
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            pass
        
    print('Network config:', wlan.ifconfig())

connect_to_wifi('INFINITUM1DC6_2.4', 'Mp83485845')