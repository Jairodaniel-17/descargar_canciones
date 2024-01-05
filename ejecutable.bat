:: Crear un entorno virtual
::python -m venv .venv

:: Activar el entorno virtual
call .venv\Scripts\activate

:: Instalar requisitos
::pip install -r requirements.txt
:: limpiar
:: cls
:: Ejecutar la aplicación
python app.py

:: Pausa para mantener la ventana abierta
pause
