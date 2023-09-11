# EntregaFinalModulo4

## Estructura de este repositorio

Para esta entrega utilizamos el dataset de Titanic para predecir si un pasajero sobrevivio el evento o no, los resultados y las prediccion se despliegan en una interfaz y su funcionamiento esta hecho en un modelo de regresion logistica en el microcontrolador ESP32. El objetivo es demostrar la conexion y representar los resultados en un ambiente intuitivo para el usuario. Para probar la importacion de datos en la interfaz es recomendable utilizar el archivo de train_data.csv que es un archivo que ya paso por el procesamiento de ETL para hacer pruebas y obtener las predicciones con de acuerdo al modelo. 

Se utiliza el dataset del [Titanic](https://www.kaggle.com/competitions/titanic/data)
Extracción, Transformación y Carga (ETL) para optimizar la lectura y el rendimiento del modelo. Puedes encontrar el proceso de ETL en [este enlace](https://github.com/ArturoGarzaTec/TC3006C.101_Equipo.git).

En la raíz de este repositorio, encontrarás lo siguiente:

### Carpetas

- **interfaz_modulo4_equipo7**: En esta carpeta se aborda el contenido de la interfaz y su implementacion en *NEXT.JS*.

- **Codigos ESP32**: En esta carpeta se encuentra la entrega de la implementacion del modelo en el microcontrolador.

### Archivo

- **VideoModulo4**: Video que demuestra el funcionamienmto de la interfaz ya conectada con el microcontrolador.

## Instalacion

- Descargar ambos archivos **interfaz_modulo4_equipo7** y **Codigos ESP32**.
- Configurar el ruteo con de acuerdo al ambiente utilizado: Que la interfaz corra en el puerto 3000 y el codigo ESP corra en el puerto 8001, los archivos ya estan configurados de esta manera por default. De esta manera ambos podran recibir y mandar datos.
- Configurar el archivo de main.py e ingresar las caracterisitcas de su WIFI, nombre y contra. 


    
Nota: La documentacion o readme de las implementaciones se encuentran dentro de los archivos como comentarios o texto agregado. 
