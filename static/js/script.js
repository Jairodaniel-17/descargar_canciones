const songSelect = document.getElementById('songSelect');
const player = document.getElementById('player');
const audioSource = document.getElementById('audioSource');
const songImage = document.getElementById('songImage');
const downloadMessage = document.getElementById('downloadMessage');

// Función para cargar la canción y la imagen al seleccionar una canción
songSelect.addEventListener('change', async function () {
    const selectedSong = songSelect.value;

    // Verifica si la opción seleccionada no es "none"
    if (selectedSong !== "none") {
        const songUrl = `/music/${selectedSong}`;
        const imageUrl = `/static/img/${selectedSong.replace('.mp3', '')}.jpg`;

        try {
            await Promise.all([
                loadAudio(songUrl),
                loadImage(imageUrl)
            ]);

            // Ambos han cargado correctamente, ahora podemos reproducir la canción
            player.load();
            player.play();
            songImage.style.display = "block"; // Show the songImage element
        } catch (error) {
            console.error('Error al cargar la canción o la imagen:', error);
        }
    } else {
        // Si la opción seleccionada es "none", oculta la imagen del logo
        songImage.src = "";
        location.reload(); // Refresh the page
    }
});

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
