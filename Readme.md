# Descargador y reproductor de música

## Descripción

Este proyecto es un descargador y reproductor de música, el cual te permite descargar música de YouTube o YouTube Music y reproducirla de forma local, sin interrupciones, sin anuncios y sin necesidad de estar conectado a internet para escuchar tu música favorita, obviamente siempre que ya antes la hayas descargado.

>[!IMPORTANT]
>**Recordatorio: Este proyecto es solo para fines educativos, no me hago responsable del mal uso que se le pueda dar.**

## Tecnologías utilizadas

- Python
- FastAPI
- HTML
- CSS
- JavaScript
- Bootstrap
  

## Dependencias de Python utilizadas

1. **fastapi**: Un marco de trabajo web moderno, rápido (de alto rendimiento), basado en estándares para construir APIs con Python 3.6+ basado en las anotaciones de tipo estándar de Python.
2. **pydantic**: Una biblioteca de análisis de datos para Python que utiliza anotaciones de tipo de Python.
3. **pytube**: Una biblioteca ligera y dependiente de Python para descargar videos de YouTube.
4. **requests**: Una biblioteca simple para hacer solicitudes HTTP en Python.
5. **unicodedata**: Este módulo proporciona acceso a la base de datos de caracteres Unicode, que define las propiedades de todos los caracteres Unicode.
6. **os**: Este módulo proporciona una forma portátil de utilizar la funcionalidad dependiente del sistema operativo.
7. **zipfile**: Este módulo proporciona herramientas para crear, leer, escribir, agregar y listar un archivo ZIP.

## Estructura del Proyecto

```
.gitignore
app.py
ejecutable.bat
music/
Readme.md
requirements.txt
static/
	css/
		style.css
		style2.css
	img/
	js/
		script.js
		script2.js
temp/
	debo_existir.pipipi
templates/
	index.html
	inicio.html
```

## Cómo ejecutar el proyecto

1. Asegúrate de tener instalado Python y pip en tu sistema.
2. Por comodidad te recomiendo crear un entorno virtual para el proyecto.
3. Instala las dependencias del proyecto con el comando `pip install -r requirements.txt`.
4. Ejecuta el archivo `app.py` con el comando `python app.py`.
5. Si eres usuario de `windows` puedes ejecutar el archivo `ejecutable.bat` para ejecutar el proyecto.
6. Abre tu navegador y ve a la dirección `http://localhost:28024/`.
## Cómo contribuir

Si deseas contribuir a este proyecto, por favor realiza un fork del repositorio, realiza tus cambios y luego envía un pull request.

## Licencia

licencia open source.
