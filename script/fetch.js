// Funsi Resi
fetch('script/resi.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        displayResi(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

document.addEventListener('DOMContentLoaded', function () {
    const confirmButton = document.getElementById('confirmation');

    confirmButton.addEventListener('click', function () {
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.innerHTML = "Apakah pilihan Anda sudah sesuai?";
    });
});

// Funsi Kurir
fetch('script/kurir.json')
    .then(response => response.json())
    .then(data => {
        const kurirList = document.getElementById('kurirList');
        let activeButton = false;

        data.kurir.forEach(kurir => {
            const kurirButton = document.createElement('div');
            kurirButton.classList.add('kurir-button');
            kurirButton.innerHTML = `
                                <i class="fas fa-user"></i>
                                <span>${kurir.nama}</span>
                            `;
            kurirButton.addEventListener('click', () => {
                if (activeButton) {
                    activeButton.classList.remove('active');
                }
                kurirButton.classList.add('active');
                activeButton = kurirButton;
                console.log(`Kurir ${kurir.nama} diklik`);
            });
            kurirList.appendChild(kurirButton);
        });
    });

// Funsi Akun
fetch('script/akun.json')
    .then(response => response.json())
    .then(data => {
        const akunList = document.getElementById('akunList');

        data.akunKurir.forEach(akunKurir => {
            const akunButton = document.createElement('div');
            akunButton.classList.add('akunItem');
            akunButton.innerHTML = `
                                <div class="item1">
                                <i class="fas fa-user"></i>
                                <span>${akunKurir.nama}</span>
                                </div>
                                <div class="item2">
                                <button>Edit</button>
                                <button>Hapus</button>
                                </div>
                            `;
            akunList.appendChild(akunButton);
        });
    });

// Funsi Lokasi
fetch('script/lokasi.json')
    .then(response => response.json())
    .then(data => {
        const kecamatanSelect = document.getElementById('kecamatan');
        const kelurahanSelect = document.getElementById('kelurahan');

        data.kecamatan.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            kecamatanSelect.appendChild(optionElement);
        });

        data.kelurahan.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            kelurahanSelect.appendChild(optionElement);
        });
    });