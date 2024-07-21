-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Jul 2024 pada 19.33
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `application_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_kurir`
--

CREATE TABLE `data_kurir` (
  `id_kurir` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `handphone` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(16) NOT NULL,
  `kecamatan` varchar(40) NOT NULL,
  `kelurahan` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `data_kurir`
--

INSERT INTO `data_kurir` (`id_kurir`, `nama`, `handphone`, `email`, `password`, `kecamatan`, `kelurahan`) VALUES
(28, 'Agus', '085267182834', 'agus@email.com', 'agus123', 'Medan Area', 'Pasar Merah Timur'),
(29, 'Yanto', '082275121677', 'yanto@email.com', 'yanto123', 'Medan Area', 'Pasar Merah Timur'),
(30, 'Xavier', '082275121677', 'xavier@email.com', '123', 'Medan Area', 'Kotamatsum IV'),
(31, 'Wahyu', '085267182834', 'wahyu@email.com', '123', 'Medan Kota', 'Kotamatsum III');

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_users`
--

CREATE TABLE `data_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(16) NOT NULL,
  `status` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `data_users`
--

INSERT INTO `data_users` (`id`, `email`, `password`, `status`, `createdAt`, `updatedAt`) VALUES
(5, 'admin@email.com', '123', 'admin', '2024-07-02 02:40:46', '2024-07-02 02:40:46'),
(7, 'karyawan@email.com', '123', 'karyawan', '2024-07-02 02:40:37', '2024-07-02 02:40:37'),
(23, 'agen@email.com', '123', 'agen', '2024-07-02 02:41:02', '2024-07-02 02:41:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penerimaan_paket`
--

CREATE TABLE `penerimaan_paket` (
  `ID_Data_Penerimaan_Paket` int(11) NOT NULL,
  `Nama_Pengirim` varchar(255) NOT NULL,
  `No_HP_Pengirim` varchar(12) NOT NULL,
  `Deskripsi` text NOT NULL,
  `Berat` float NOT NULL,
  `Dimensi` int(11) NOT NULL,
  `Jumlah_Kiriman` int(11) NOT NULL,
  `Nama_Penerima` varchar(255) NOT NULL,
  `No_HP_Penerima` varchar(12) NOT NULL,
  `Alamat_Tujuan` varchar(255) NOT NULL,
  `kecamatan` varchar(254) NOT NULL,
  `kelurahan` varchar(254) NOT NULL,
  `nomor_resi` varchar(12) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `latitude` float(10,7) NOT NULL,
  `longitude` float(10,7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `penerimaan_paket`
--

INSERT INTO `penerimaan_paket` (`ID_Data_Penerimaan_Paket`, `Nama_Pengirim`, `No_HP_Pengirim`, `Deskripsi`, `Berat`, `Dimensi`, `Jumlah_Kiriman`, `Nama_Penerima`, `No_HP_Penerima`, `Alamat_Tujuan`, `kecamatan`, `kelurahan`, `nomor_resi`, `createdAt`, `latitude`, `longitude`) VALUES
(25, 'Zoya', '082245453737', 'Baju', 0.5, 200, 2, 'Hans', '082245453737', 'Jalan Kalimantan, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Medan Kota', 'Kotamatsum III', 'AK3716269561', '2024-07-10 13:50:30', 3.5873978, 98.6918411),
(26, 'Gery', '082245453737', 'Sepatu', 0.5, 300, 1, 'Tony', '082245453737', 'Jalan Batang Kuis d/h Jambi, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20214, Indonesia', 'Medan Kota', 'Kotamatsum III', 'AK4515763283', '2024-07-10 13:55:23', 3.5889201, 98.6919098),
(27, 'Alfons', '082245453737', 'Headset', 0.4, 300, 1, 'Sari', '082245453737', 'Jalan Mohammad Husni Thamrin, Pasar Baru, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Medan Kota', 'Kotamatsum III', 'AK4401802013', '2024-07-10 13:59:08', 3.5892079, 98.6903458),
(28, 'Ananda', '082245453737', 'Boneka', 0.4, 27, 1, 'Cahya', '082245453737', 'Steam Education Centre, Jalan H.O.S. Cokroaminoto, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Medan Kota', 'Kotamatsum III', 'AK4862017714', '2024-07-10 14:03:05', 3.5910871, 98.6900711),
(29, 'Figo', '082245453737', 'Tas', 0.6, 294, 1, 'Dahlia', '082245453737', 'Jalan Bintang, Pasar Baru, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Medan Kota', 'Kotamatsum III', 'AK6899384260', '2024-07-10 14:07:29', 3.5900316, 98.6881790),
(30, 'Figo', '082245453737', 'Tas', 0.6, 294, 1, 'Dahlia', '082245453737', 'Jalan Bintang, Pasar Baru, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Medan Kota', 'Pasar Baru', 'AK3157347881', '2024-07-10 17:03:29', 0.0000000, 0.0000000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengantaran_paket`
--

CREATE TABLE `pengantaran_paket` (
  `Id_pengantaran_paket` int(11) NOT NULL,
  `paket_id` int(11) DEFAULT NULL,
  `kurir_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `riwayat`
--

CREATE TABLE `riwayat` (
  `id_data_riwayat` int(11) NOT NULL,
  `id_kurir` int(11) NOT NULL,
  `waktu_pengiriman` time NOT NULL,
  `tanggal_pengiriman` date NOT NULL,
  `status_pengiriman` varchar(10) NOT NULL,
  `nomor_resi` varchar(12) NOT NULL,
  `Alamat_Tujuan` varchar(255) NOT NULL,
  `Nama_Penerima` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `riwayat`
--

INSERT INTO `riwayat` (`id_data_riwayat`, `id_kurir`, `waktu_pengiriman`, `tanggal_pengiriman`, `status_pengiriman`, `nomor_resi`, `Alamat_Tujuan`, `Nama_Penerima`) VALUES
(1, 31, '23:09:01', '2024-07-22', 'Selesai', 'AK3716269561', 'Jalan Kalimantan, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Hans'),
(2, 31, '23:10:41', '2024-07-22', 'Selesai', 'AK4515763283', 'Jalan Batang Kuis d/h Jambi, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20214, Indonesia', 'Tony'),
(3, 31, '23:18:23', '2024-07-22', 'Selesai', 'AK4401802013', 'Jalan Mohammad Husni Thamrin, Pasar Baru, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Sari'),
(4, 31, '23:18:35', '2024-07-22', 'Gagal', 'AK4862017714', 'Steam Education Centre, Jalan H.O.S. Cokroaminoto, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Cahya'),
(5, 31, '23:18:42', '2024-07-22', 'Gagal', 'AK6899384260', 'Jalan Bintang, Pasar Baru, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Dahlia'),
(6, 31, '23:09:01', '2024-07-21', 'Selesai', 'AK3716269561', 'Jalan Kalimantan, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Hans'),
(7, 31, '23:10:41', '2024-07-21', 'Selesai', 'AK4515763283', 'Jalan Batang Kuis d/h Jambi, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20214, Indonesia', 'Tony'),
(8, 31, '23:18:23', '2024-07-21', 'Selesai', 'AK4401802013', 'Jalan Mohammad Husni Thamrin, Pasar Baru, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Sari'),
(9, 31, '23:18:35', '2024-07-21', 'Gagal', 'AK4862017714', 'Steam Education Centre, Jalan H.O.S. Cokroaminoto, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Cahya'),
(10, 31, '23:18:42', '2024-07-21', 'Gagal', 'AK6899384260', 'Jalan Bintang, Pasar Baru, Medan Kota, Kota Medan, Sumatera Utara, Sumatra, 20232, Indonesia', 'Dahlia');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `data_kurir`
--
ALTER TABLE `data_kurir`
  ADD PRIMARY KEY (`id_kurir`);

--
-- Indeks untuk tabel `data_users`
--
ALTER TABLE `data_users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `penerimaan_paket`
--
ALTER TABLE `penerimaan_paket`
  ADD PRIMARY KEY (`ID_Data_Penerimaan_Paket`),
  ADD UNIQUE KEY `nomor_resi` (`nomor_resi`);

--
-- Indeks untuk tabel `pengantaran_paket`
--
ALTER TABLE `pengantaran_paket`
  ADD PRIMARY KEY (`Id_pengantaran_paket`),
  ADD KEY `kurir_id` (`kurir_id`),
  ADD KEY `paket_id` (`paket_id`);

--
-- Indeks untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  ADD PRIMARY KEY (`id_data_riwayat`),
  ADD KEY `id_kurir` (`id_kurir`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `data_kurir`
--
ALTER TABLE `data_kurir`
  MODIFY `id_kurir` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT untuk tabel `data_users`
--
ALTER TABLE `data_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `penerimaan_paket`
--
ALTER TABLE `penerimaan_paket`
  MODIFY `ID_Data_Penerimaan_Paket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `pengantaran_paket`
--
ALTER TABLE `pengantaran_paket`
  MODIFY `Id_pengantaran_paket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  MODIFY `id_data_riwayat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pengantaran_paket`
--
ALTER TABLE `pengantaran_paket`
  ADD CONSTRAINT `pengantaran_paket_ibfk_1` FOREIGN KEY (`kurir_id`) REFERENCES `data_kurir` (`id_kurir`),
  ADD CONSTRAINT `pengantaran_paket_ibfk_2` FOREIGN KEY (`paket_id`) REFERENCES `penerimaan_paket` (`ID_Data_Penerimaan_Paket`);

--
-- Ketidakleluasaan untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  ADD CONSTRAINT `riwayat_ibfk_2` FOREIGN KEY (`id_kurir`) REFERENCES `data_kurir` (`id_kurir`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
