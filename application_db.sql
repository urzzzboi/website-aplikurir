-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Bulan Mei 2024 pada 07.36
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.12

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
  `ID_Data_Kurir` int(11) NOT NULL,
  `ID_Data_User` int(11) NOT NULL,
  `ID_Data_Zona` int(11) NOT NULL,
  `Nama_Kurir` varchar(255) NOT NULL,
  `Nomor_HP_Kurir` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_users`
--

CREATE TABLE `data_users` (
  `id` int(11) NOT NULL,
  `Email_User` varchar(255) NOT NULL,
  `Password_User` varchar(16) NOT NULL,
  `Status_User` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `data_users`
--

INSERT INTO `data_users` (`id`, `Email_User`, `Password_User`, `Status_User`, `createdAt`, `updatedAt`) VALUES
(2, 'alfonsganteng@gmail.com', '$2b$10$sVfKaEJCc', 'agen', '2024-05-23 17:02:25', '2024-05-23 17:02:25'),
(3, 'zoyaanzasmara@gmail.com', '$2b$10$IbrXpavjY', 'admin', '2024-05-23 17:02:26', '2024-05-23 17:02:26'),
(4, 'test@example.com', '$2b$10$a3/CiPs08', 'admin', '2024-05-23 17:06:44', '2024-05-23 17:06:44'),
(5, 'admin@email.com', 'admin123', 'admin', '2024-05-24 01:34:29', '2024-05-24 01:34:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penerimaan_paket`
--

CREATE TABLE `penerimaan_paket` (
  `ID_Data_Penerimaan_Paket` int(11) NOT NULL,
  `ID_Data_Zona` int(11) NOT NULL,
  `Nama_Pengirim` varchar(255) NOT NULL,
  `No_HP_Pengirim` varchar(12) NOT NULL,
  `Deskripsi` text NOT NULL,
  `Berat` float NOT NULL,
  `Dimensi` int(11) NOT NULL,
  `Jumlah_Kiriman` int(11) NOT NULL,
  `Nama_Penerima` varchar(255) NOT NULL,
  `No_HP_Penerima` varchar(12) NOT NULL,
  `Alamat_Tujuan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengantaran_paket`
--

CREATE TABLE `pengantaran_paket` (
  `ID_Data_Pengantaran_Paket` int(11) NOT NULL,
  `ID_Data_Riwayat` int(11) NOT NULL,
  `ID_Data_Kurir` int(11) NOT NULL,
  `ID_Data_Penerimaan_Paket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `riwayat`
--

CREATE TABLE `riwayat` (
  `ID_Data_Riwayat` int(11) NOT NULL,
  `Waktu_Pengiriman` time NOT NULL,
  `Tanggal_Pengiriman` date NOT NULL,
  `Status_Pengiriman` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `zona`
--

CREATE TABLE `zona` (
  `ID_Data_Zona` int(11) NOT NULL,
  `Kecamatan` varchar(40) NOT NULL,
  `Kelurahan` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `data_kurir`
--
ALTER TABLE `data_kurir`
  ADD PRIMARY KEY (`ID_Data_Kurir`),
  ADD KEY `fk_user_datakurir` (`ID_Data_User`),
  ADD KEY `fk_zona_datakurir` (`ID_Data_Zona`);

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
  ADD KEY `fk_zona_penerimaanpaket` (`ID_Data_Zona`);

--
-- Indeks untuk tabel `pengantaran_paket`
--
ALTER TABLE `pengantaran_paket`
  ADD PRIMARY KEY (`ID_Data_Pengantaran_Paket`),
  ADD KEY `fk_riwayat_pengantaranpaket` (`ID_Data_Riwayat`),
  ADD KEY `fk_datakurir_pengantaranpaket` (`ID_Data_Kurir`),
  ADD KEY `fk_penerimaanpaket_pengantaranpaket` (`ID_Data_Penerimaan_Paket`);

--
-- Indeks untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  ADD PRIMARY KEY (`ID_Data_Riwayat`);

--
-- Indeks untuk tabel `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`ID_Data_Zona`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `data_kurir`
--
ALTER TABLE `data_kurir`
  MODIFY `ID_Data_Kurir` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `data_users`
--
ALTER TABLE `data_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `penerimaan_paket`
--
ALTER TABLE `penerimaan_paket`
  MODIFY `ID_Data_Penerimaan_Paket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengantaran_paket`
--
ALTER TABLE `pengantaran_paket`
  MODIFY `ID_Data_Pengantaran_Paket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  MODIFY `ID_Data_Riwayat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `zona`
--
ALTER TABLE `zona`
  MODIFY `ID_Data_Zona` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `data_kurir`
--
ALTER TABLE `data_kurir`
  ADD CONSTRAINT `fk_user_datakurir` FOREIGN KEY (`ID_Data_User`) REFERENCES `user` (`ID_Data_User`),
  ADD CONSTRAINT `fk_zona_datakurir` FOREIGN KEY (`ID_Data_Zona`) REFERENCES `zona` (`ID_Data_Zona`);

--
-- Ketidakleluasaan untuk tabel `penerimaan_paket`
--
ALTER TABLE `penerimaan_paket`
  ADD CONSTRAINT `fk_zona_penerimaanpaket` FOREIGN KEY (`ID_Data_Zona`) REFERENCES `zona` (`ID_Data_Zona`);

--
-- Ketidakleluasaan untuk tabel `pengantaran_paket`
--
ALTER TABLE `pengantaran_paket`
  ADD CONSTRAINT `fk_datakurir_pengantaranpaket` FOREIGN KEY (`ID_Data_Kurir`) REFERENCES `data_kurir` (`ID_Data_Kurir`),
  ADD CONSTRAINT `fk_penerimaanpaket_pengantaranpaket` FOREIGN KEY (`ID_Data_Penerimaan_Paket`) REFERENCES `penerimaan_paket` (`ID_Data_Penerimaan_Paket`),
  ADD CONSTRAINT `fk_riwayat_pengantaranpaket` FOREIGN KEY (`ID_Data_Riwayat`) REFERENCES `riwayat` (`ID_Data_Riwayat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
