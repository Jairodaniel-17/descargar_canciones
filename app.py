# crear API con fastapi para descargar canciones en formato mp3 desde youtube y almacenarlas en una carpeta local

import re
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from pytube import YouTube
import unicodedata
import requests
import os

app = FastAPI()

# carpeta donde guardar las canciones
music_path = os.getcwd() + "/music"
static_path = os.getcwd() + "/static"
image_path = os.getcwd() + "/static/img"
temp_path = os.getcwd() + "/temp"

# ruta para serivir archivos estaticos (canciones)
app.mount("/music", StaticFiles(directory=music_path), name="music")
app.mount("/static", StaticFiles(directory=static_path), name="static")
app.mount("/img", StaticFiles(directory=image_path), name="img")
app.mount("/temp", StaticFiles(directory=temp_path), name="temp")
templates = Jinja2Templates(directory="templates")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def lista_de_canciones():
    songs = os.listdir(music_path)
    return {"songs": songs}


@app.get("/")
async def root(request: Request):
    """
    Manejador para el punto de entrada raíz.

    Args:
        request (Request): El objeto de solicitud entrante.

    Returns:
        TemplateResponse: La respuesta que contiene la plantilla index.html renderizada.
    """
    # retorna un diccionario con las canciones, escoger la key "songs"
    canciones = lista_de_canciones()
    # mensaje de bienvenida en la pagina principal
    bienvenida = "Bienvenido mi estimado, aquí puedes descargar y escuchar tus canciones favoritas de youtube"
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "songs": canciones["songs"], "bienvenida": bienvenida},
    )


def save_img_change_name(titulo, logo):
    titulo_normalizado = unicodedata.normalize("NFKD", titulo)
    # Limpiar el título para usarlo como nombre de archivo
    caracteres_no_permitidos = r"[\"\'/\\:*?<>|,]"
    titulo_limpio = re.sub(caracteres_no_permitidos, "", titulo_normalizado)
    print(titulo_limpio)
    response = requests.get(logo)
    new_name = f"{titulo_limpio}.jpg"
    with open(os.path.join(temp_path, new_name), "wb") as file:
        file.write(response.content)
    return titulo_limpio


class Item(BaseModel):
    url: str


# ruta de descarga de la cancion alternativa con mejoras
@app.post("/download")
async def download_song_two(item: Item):
    # obtener la url de la cancion
    url = item.url
    # obtener el titulo de la cancion
    yt = YouTube(url)
    titulo = yt.title
    # descargar la cancion en la carpeta temp
    yt.streams.filter(only_audio=True).first().download(temp_path)
    # descargar logo de la cancion (imagen) en la carpeta temp
    logo = yt.thumbnail_url
    new_name = save_img_change_name(titulo, logo)
    # buscar el archivo descargado en la carpeta temp
    for file in os.listdir(temp_path):
        if file.endswith(".mp4"):
            # cambiar el nombre de la cancion descargada en la carpeta temp
            os.rename(
                os.path.join(temp_path, file),
                os.path.join(temp_path, f"{new_name}.mp4"),
            )
    # convertir a mp3
    for file in os.listdir(temp_path):
        if file.endswith(".mp4"):
            os.rename(
                os.path.join(temp_path, file),
                os.path.join(temp_path, file.replace(".mp4", ".mp3")),
            )
    # mover la cancion descargada a la carpeta music
    os.rename(
        os.path.join(temp_path, f"{new_name}.mp3"),
        os.path.join(music_path, f"{new_name}.mp3"),
    )
    # mover la imagen descargada a la carpeta img
    os.rename(
        os.path.join(temp_path, f"{new_name}.jpg"),
        os.path.join(image_path, f"{new_name}.jpg"),
    )
    return {"message": new_name}


# uvicorn app:app --host localhost --port 7860 --reload
if __name__ == "__main__":
    os.system("start http://localhost:7860/")
    os.system("uvicorn app:app --host localhost --port 7860 --reload")
