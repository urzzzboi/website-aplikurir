const halamanAdmin = (req, res) => {
    res.render('page/halaman-admin', { user: req.session.user || "" });
}

const halamanAgen = (req, res) => {
    res.render('page/halaman-agen', { user: req.session.user || "" });
}

const halamanKaryawan = (req, res) => {
    res.render('page/halaman-karyawan', { user: req.session.user || "" });
}

const halamanPenentuan = (req, res) => {
    res.render('page/admin/penentuan-kurir');
}

const halamanPendaftaran = (req, res) => {
    res.render('page/admin/pendaftaran');
}

const halamanRiwayat = (req, res) => {
    res.render('page/admin/riwayat');
}

const halamanAkun = (req, res) => {
    res.render('page/admin/list-akun');
}

const halamanPengantaran = (req, res) => {
    res.render('page/list-pengantaran');
}

const halamanPaket = (req, res) => {
    res.render('page/agen/list-paket');
}

const pilihkurir = (req, res) => {
    res.render('page/admin/pendaftaran-kurir');
}

const pilihagenkaryawan = (req, res) => {
    res.render('page/admin/pendaftaran-agen-karyawan');
}





export default { halamanAdmin, halamanAgen, halamanKaryawan, halamanPenentuan, halamanPendaftaran, halamanRiwayat, halamanAkun, halamanPengantaran, halamanPaket, pilihagenkaryawan, pilihkurir, };