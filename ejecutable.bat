:: Crear un entorno virtual
python -m venv .venv

:: Activar el entorno virtual
call .venv\Scripts\activate

:: Instalar requisitos
pip install -r requirements.txt

:: Ejecutar la aplicación
python app.py

:: Pausa para mantener la ventana abierta
pause
