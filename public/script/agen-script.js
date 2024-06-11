let map;
let marker;

function initMap() {
    map = L.map("map").setView([3.5951646965262394, 98.6715265542528], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", function (e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);

        axios
            .get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
            )
            .then((response) => {
                const address = response.data.display_name;
                document.getElementById("alamat_tujuan").value = address;
                document.getElementById("latitude").value = e.latlng.lat;
                document.getElementById("longitude").value = e.latlng.lng;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Error fetching data. Please try again.");
            });
    });
}

document.getElementById("confirm-address").addEventListener("click", () => {
    const address = document.getElementById("alamat_tujuan").value;
    if (address) {
        axios
            .get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    address
                )}`
            )
            .then((response) => {
                if (response.data.length > 0) {
                    const { lat, lon } = response.data[0];
                    const latLng = [parseFloat(lat), parseFloat(lon)];
                    map.setView(latLng, 13);
                    if (marker) {
                        map.removeLayer(marker);
                    }
                    marker = L.marker(latLng).addTo(map);
                    document.getElementById("latitude").value = lat;
                    document.getElementById("longitude").value = lon;
                } else {
                    alert("Alamat tidak ditemukan. Coba lagi.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Error fetching data. Please try again.");
            });

        const modal = document.getElementById("addressModal");
        modal.style.display = "block";
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    } else {
        alert("Masukkan alamat terlebih dahulu.");
    }
});

document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById("addressModal").style.display = "none";
};

window.onclick = function (event) {
    const modal = document.getElementById("addressModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

window.addEventListener("load", initMap);

// Mendapatkan elemen select
const kecamatanSelect = document.getElementById('kecamatan');
const kelurahanSelect = document.getElementById('kelurahan');

// Memuat data dari file JSON
fetch('/public/data/lokasi.json')
    .then(response => response.json())
    .then(data => {
        // Mengisi opsi kecamatan
        for (let kecamatan in data) {
            let option = document.createElement('option');
            option.value = kecamatan;
            option.textContent = kecamatan;
            kecamatanSelect.appendChild(option);
        }

        // Event listener ketika kecamatan dipilih
        kecamatanSelect.addEventListener('change', function () {
            // Menghapus opsi kelurahan sebelumnya
            kelurahanSelect.innerHTML = '<option value="">--Pilih Kelurahan--</option>';

            // Mendapatkan kelurahan berdasarkan kecamatan yang dipilih
            let kelurahans = data[this.value];
            if (kelurahans) {
                kelurahans.forEach(function (kelurahan) {
                    let option = document.createElement('option');
                    option.value = kelurahan;
                    option.textContent = kelurahan;
                    kelurahanSelect.appendChild(option);
                });
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
