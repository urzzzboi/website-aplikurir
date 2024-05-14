//Fungsi Menyembunyikan password
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.querySelector('.toggle-password i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.remove('far', 'fa-eye');
        passwordIcon.classList.add('fas', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fas', 'fa-eye-slash');
        passwordIcon.classList.add('far', 'fa-eye');
    }
}

//Fungsi Login Berdasarkan opsi
function redirectToPage() {
    const userType = document.getElementById('user-type').value;
    if (userType === 'admin') {
        window.location.href = 'halaman-admin.html';
    } else if (userType === 'agen') {
        window.location.href = 'halaman-agen.html';
    } else if (userType === 'karyawan') {
        window.location.href = 'halaman-karyawan.html';
    }
}

//Fungsi mengecek email & password
function validateLoginForm() {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const userType = document.getElementById('user-type').value;

    if (email.trim() === '' || password.trim() === '') {
        alert('Mohon lengkapi email dan password Anda.');
        return false;
    }

    switch (userType) {
        case 'admin':
            sessionStorage.setItem('userType', userType);
            window.location.href = 'halaman-admin.html';
            break;
        case 'agen':
            sessionStorage.setItem('userType', userType);
            window.location.href = 'halaman-agen.html';
            break;
        case 'pegawai':
            sessionStorage.setItem('userType', userType);
            window.location.href = 'halaman-karyawan.html';
            break;
        default:
            alert('Peran yang dipilih tidak valid.');
            return false;
    }

    return false;
}

//Fungsi memunculkan opsi pada beranda
document.addEventListener('DOMContentLoaded', function () {
    const userType = sessionStorage.getItem('userType');
    const welcomeMessage = `${userType}`;
    document.getElementById('welcome-message').innerText = welcomeMessage;
});

//Fungsi Logout
function logout() {
    const confirmation = confirm('Apakah Anda yakin akan logout?');

    if (confirmation) {
        window.location.href = 'login-page.html';
    } else {

    }
}

//Fungsi ke halaman
function goToPage(pageName) {
    let url = pageName + '.html';

    switch (pageName) {
        case 'penentuan-kurir':
        case 'pendaftaran':
        case 'riwayat':
            window.location.href = url;
            break;
        default:
            console.error('Halaman tidak valid');
            return;
    }
}

//Fungsi kembali
function goBack() {
    window.history.back();
}


// Function untuk membuat checkbox pada box resi
function createCheckbox(resi) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('resi-checkbox');

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');
    checkboxContainer.appendChild(checkbox);

    const resiBox = document.createElement('div');
    resiBox.classList.add('resi-box');
    resiBox.innerHTML = `
                <h1>No. Resi: ${resi.nomor_resi}</h1>
                <p>Nama Pengirim: <span>${resi.nama_pengirim}</span> | Nama Penerima: <span>${resi.nama_penerima}</span></p>
            `;
    resiBox.appendChild(checkboxContainer);
    return resiBox;
}

//Fungsi resi
function displayResi(resiData) {
    const resiScrollView = document.getElementById('resiScrollView');

    resiData.forEach(resi => {
        const resiElement = createCheckbox(resi);
        resiScrollView.appendChild(resiElement);
    });

    //Fungsi Check All
    const checkAllCheckbox = document.getElementById('checkAll');

    checkAllCheckbox.addEventListener('change', function () {
        const resiCheckboxes = document.querySelectorAll('.resi-checkbox');

        resiCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

// Fungsi enampilkan atau menyembunyikan bidang input dan opsi kecamatan/kelurahan sesuai dengan status akun yang dipilih
function showFields() {
    var accountType = document.getElementById("accountType").value;
    var fieldsContainer = document.getElementById("fieldsContainer");
    var locationFields = document.getElementById("locationFields");
    var locationHeader = document.getElementById("locationHeader");
    var button = document.getElementById("button-add");
    var titleText = document.getElementById("titleText");
    var rightForm = document.querySelector(".right");
    var lineCenter = document.querySelector(".line-center");

    if (accountType === "kurir") {
        lineCenter.style.display = "block";
        rightForm.style.display = "flex";
        rightForm.style.justifyContent = "space-between";
        titleText.textContent = "Menambahkan data akun"; // Menampilkan teks di atas data
        locationFields.style.display = "block";
        locationHeader.style.display = "block";
        button.style.display = "block"; // Menampilkan tombol "Tambah"
        fieldsContainer.innerHTML = `
            <input type="text" placeholder="Nama*">
            <input type="text" placeholder="Nomor Handphone*">
            <input type="email" placeholder="Email*">
            <input type="password" placeholder="Password*">
            <input type="password" placeholder="Ulangi Password*">
        `;
    }
    else if (accountType === "agen") {
        lineCenter.style.display = "block";
        rightForm.style.display = "inline-flex";
        rightForm.style.justifyContent = "end";
        titleText.textContent = "Menambahkan data akun"; // Menghapus teks di atas data
        locationFields.style.display = "none";
        locationHeader.style.display = "none";
        button.style.display = "block"; // Menampilkan tombol "Tambah"
        fieldsContainer.innerHTML = `
            <input type="email" placeholder="Email*">
            <input type="password" placeholder="Password*">
            <input type="password" placeholder="Ulangi Password*">
        `;
    }
    else if (accountType === "karyawan") {
        lineCenter.style.display = "block";
        rightForm.style.display = "inline-flex";
        rightForm.style.justifyContent = "end";
        titleText.textContent = "Menambahkan data akun"; // Menghapus teks di atas data
        locationFields.style.display = "none";
        locationHeader.style.display = "none";
        button.style.display = "block"; // Menampilkan tombol "Tambah"
        fieldsContainer.innerHTML = `
            <input type="email" placeholder="Email*">
            <input type="password" placeholder="Password*">
            <input type="password" placeholder="Ulangi Password*">
        `;
    }
    else {
        lineCenter.style.display = "none";
        rightForm.style.display = "none";
        titleText.textContent = ""; // Menghapus teks di atas data
        locationFields.style.display = "none";
        locationHeader.style.display = "none";
        button.style.display = "none"; // Menyembunyikan tombol "Tambah"
        fieldsContainer.innerHTML = "";
    }
}



