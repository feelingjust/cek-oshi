 let oshiList = [];

        fetch('oshi.json')
            .then(response => response.json())
            .then(data => {
                oshiList = data;
            })
            .catch(error => console.error('Error loading JSON:', error));

                function pickRandom(list) {
            return list[Math.floor(Math.random() * list.length)];
        }

        let isCooldown = false;

        function cekOshi() {
            if (isCooldown) return;

            const name = document.getElementById('nameInput').value.trim();
            if (!name) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ketik namanya dengan benar dan Pastikan telah memasukkan nama!',
                });
                return;
            }

            const oshi = pickRandom(oshiList);
            const response = `
                <div class="oshi-info">
                    <p><b><i class="fas fa-user-circle"></i> Nama: ${name}</b></p>
                    <p><i class="fas fa-heart"></i> Oshi: ${oshi.name}</p>
                    <img id="oshiImage" src="${oshi.image}" alt="${oshi.name}">
                </div>
            `;
            document.querySelector('.result-content').innerHTML = response;
            const loadingSpinner = document.getElementById('loadingSpinner');
            loadingSpinner.style.display = 'block';
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
                document.getElementById('oshiImage').style.display = 'block';
                document.querySelector('.oshi-info').style.display = 'block';
            }, 1000);

            isCooldown = true;
            const cekButton = document.getElementById('cekButton');
            cekButton.classList.add('cooldown');
            cekButton.disabled = true;
            let cooldownTime = 10;
            cekButton.innerHTML = `Cek (${cooldownTime})`;
            const interval = setInterval(() => {
                cooldownTime -= 1;
                cekButton.innerHTML = `Cek (${cooldownTime})`;
                if (cooldownTime <= 0) {
                    clearInterval(interval);
                    isCooldown = false;
                    cekButton.classList.remove('cooldown');
                    cekButton.disabled = false;
                    cekButton.innerHTML = '<i class="fas fa-search"></i> Cek';
                }
            }, 1000);
        }
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
            const sources = audio.getElementsByTagName('source');
            let currentTrack = 0;
    audio.volume = 1
    audio.addEventListener('ended', () => {
                currentTrack = (currentTrack + 1) % sources.length;
                audio.src = sources[currentTrack].src;
                audio.play().catch(error => {
                    console.error("Audio play failed: ", error);
                });
            });
    document.addEventListener('click', () => {
        audio.play().catch(error => {
            console.error("Audio play failed: ", error);
        });
    });
}); 