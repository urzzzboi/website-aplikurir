const halamanAdmin = (req, res) => {
    res.render('page/halaman-admin', {user: req.session.user || "" });
}

const halamanAgen = (req, res) => {
    res.render('page/halaman-agen', {user: req.session.user || "" });
}

const halamanKaryawan = (req, res) => {
    res.render('page/halaman-karyawan', {user: req.session.user || "" });
}

const halamanPenentuan = (req, res) =>{
    res.render('page/penentuan-kurir');
}

const halamanPendaftaran = (req, res) =>{
    res.render('page/pendaftaran');
}

const halamanRiwayat = (req, res) =>{
    res.render('page/riwayat');
}

const halamanAkun = (req, res) =>{
    res.render('page/list-akun');
}

const halamanPengantaran= (req, res) =>{
    res.render('page/list-pengantaran');
}



export default {halamanAdmin, halamanAgen, halamanKaryawan,halamanPenentuan, halamanPendaftaran, halamanRiwayat, halamanAkun, halamanPengantaran};