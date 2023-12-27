const cancionSeleccionada = document.getElementById('cancionSeleccionada');
const player = document.getElementById('player');
const audioSource = document.getElementById('audioSource');
const songImage = document.getElementById('songImage');
const downloadMessage = document.getElementById('downloadMessage');
const nombreCancion = document.getElementById('nombreCancion');

// ... (tu código existente)

// Variable para almacenar todas las canciones
const songListItems = document.querySelectorAll('#cancionSeleccionada li');

// Evento clic en la lista de canciones
cancionSeleccionada.addEventListener('click', async function (event) {
    // Obtiene el texto dentro del elemento clickeado (el nombre de la canción)
    const selectedSong = event.target.textContent;

    // Verifica si la opción seleccionada no es "none"
    if (selectedSong) {
        const songUrl = `/music/${selectedSong}.mp3`;
        const imageUrl = `/static/img/${selectedSong}.jpg`;

        try {
            // Carga la canción y la imagen
            await Promise.all([
                loadAudio(songUrl),
                loadImage(imageUrl)
            ]);

            // Ambos han cargado correctamente, ahora podemos reproducir la canción
            player.load();
            player.play();
            songImage.style.display = "block"; // Muestra el elemento songImage
            nombreCancion.textContent = selectedSong;

            // Agregar el evento 'ended' al reproductor de audio
            player.addEventListener('ended', function () {
                // Cuando la canción actual haya terminado, elige una canción aleatoria
                const randomIndex = Math.floor(Math.random() * songListItems.length);
                const randomSong = songListItems[randomIndex];

                // Configura la URL del reproductor de audio con la nueva canción aleatoria
                const randomSongName = randomSong.textContent;
                const randomSongUrl = `/music/${randomSongName}.mp3`;
                const randomImageUrl = `/static/img/${randomSongName}.jpg`;

                // Carga la nueva canción y la imagen aleatoria
                Promise.all([
                    loadAudio(randomSongUrl),
                    loadImage(randomImageUrl)
                ]).then(() => {
                    // Reproduce la nueva canción aleatoria
                    player.load();
                    player.play();
                    nombreCancion.textContent = randomSongName;
                }).catch(error => {
                    console.error('Error al cargar la canción o la imagen:', error);
                });
            });
        } catch (error) {
            console.error('Error al cargar la canción o la imagen:', error);
        }
    } else {
        // Si la opción seleccionada es "none", oculta la imagen del logo
        songImage.src = "";
        location.reload(); // Recarga la página
    }
});

// Resto de tu código...



// Función para cargar la canción
async function loadAudio(url) {
    return new Promise((resolve, reject) => {
        audioSource.src = url;
        player.load();
        player.oncanplaythrough = resolve;
        player.onerror = reject;
    });
}

// Función para cargar la imagen
async function loadImage(url) {
    return new Promise((resolve, reject) => {
        songImage.src = url;
        songImage.onload = resolve;
        songImage.onerror = reject;
    });
}

// Función para descargar una canción
async function downloadSong() {
    try {
        const urlInput = document.getElementById('urlInput');

        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: urlInput.value
            })
        });

        const data = await response.json();
        downloadMessage.textContent = `Descarga exitosa. Título: ${data.message}, se autorefrescará en 5 segundos.`;

        // refresh page to update song list
        setTimeout(function () {
            location.reload();
        }, 5000);
    } catch (error) {
        console.error('Error al descargar la canción:', error);
        downloadMessage.textContent = 'Error al descargar la canción.';
    }
}

const searchInput = document.getElementById('searchInput');

// Array para almacenar todas las canciones (sin filtros)
const allSongs = Array.from(cancionSeleccionada.children);

// Escucha los cambios en la barra de búsqueda
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    // Filtra las canciones según el término de búsqueda
    const filteredSongs = allSongs.filter(song => song.textContent.toLowerCase().includes(searchTerm));
    // Muestra solo las canciones filtradas
    allSongs.forEach(song => song.style.display = filteredSongs.includes(song) ? 'block' : 'none');
});

