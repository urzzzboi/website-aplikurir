import express from "express";
import session from "express-session";
import userRoutes from "./routers/root.js";
import { sequelize } from "./models/model.js";

//ini express
const app = express();

const hostname = "172.22.171.125";
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Ini pesan rahasia, sepertinya",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.post("/dataPengantaranLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);

    const query =
      "SELECT * FROM data_kurir WHERE email = :email AND password = :password";

    const [user] = await sequelize.query(query, {
      replacements: { email, password },
      type: sequelize.QueryTypes.SELECT,
    });

    if (user) {
      req.session.idKurir = user.id;
      res.send(user);
    } else {
      res.status(401).send("Email atau password salah");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan pada server");
  }
});

app.get("/dataPengantaran/:idKurir", (req, res) => {
  const idKurir = req.params.idKurir;
  sequelize
    .query(
      `SELECT 
        pp.Id_pengantaran_paket,
        pp.kurir_id,
        pp.paket_id,
        dk.nama AS nama_kurir,
        dk.handphone AS handphone_kurir,
        dk.email,
        dk.password,
        pk.Nama_Pengirim,
        pk.No_HP_Pengirim,
        pk.Deskripsi,
        pk.Berat,
        pk.Dimensi,
        pk.Jumlah_Kiriman,
        pk.Nama_Penerima,
        pk.No_HP_Penerima,
        pk.Alamat_Tujuan,
        pk.kecamatan,
        pk.kelurahan,
        pk.nomor_resi,
        pk.createdAt AS penerimaan_createdAt,
        pk.latitude,
        pk.longitude
      FROM pengantaran_paket pp
      JOIN penerimaan_paket pk ON pp.paket_id = pk.ID_Data_Penerimaan_Paket
      JOIN data_kurir dk ON pp.kurir_id = dk.id_kurir
      WHERE dk.id_kurir = :idKurir`,
      {
        replacements: { idKurir: idKurir },
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/riwayat", (req, res) => {
  const {
    id_kurir,
    nomor_resi,
    Alamat_Tujuan,
    Nama_Penerima,
    status_pengiriman,
    waktu_pengiriman, 
    tanggal_pengiriman,
  } = req.body;

  sequelize
    .query(
      `
    INSERT INTO riwayat (id_kurir, nomor_resi, Alamat_Tujuan, Nama_Penerima, status_pengiriman, waktu_pengiriman, tanggal_pengiriman)
    VALUES (:id_kurir, :nomor_resi, :Alamat_Tujuan, :Nama_Penerima, :status_pengiriman, :waktu_pengiriman, :tanggal_pengiriman)
  `,
      {
        replacements: {
          id_kurir,
          nomor_resi,
          Alamat_Tujuan,
          Nama_Penerima,
          status_pengiriman,
          waktu_pengiriman, 
          tanggal_pengiriman,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    )
    .then(() => {
      res.status(201).send("Data sent to riwayat successfully");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error sending data to riwayat");
    });
});

app.delete("/dataPengantaran2/:id", async (req, res) => {
  const idPengantaran = req.params.id;

  try {
    const result = await sequelize.query(
      `DELETE FROM pengantaran_paket WHERE Id_pengantaran_paket = ?`,
      {
        replacements: [idPengantaran],
        type: sequelize.QueryTypes.DELETE,
      }
    );

    if (result[1] > 0) {
      res.status(200).send("Data pengantaran paket berhasil dihapus");
    } else {
      res.status(404).send("Data pengantaran paket tidak ditemukan");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal menghapus data pengantaran paket");
  }
});

app.get("/dataRiwayat/:idKurir", async (req, res) => {
  const idKurir = req.params.idKurir;
  sequelize
    .query(
      `SELECT 
      pr.id_data_riwayat,
      pr.id_kurir,
      pr.waktu_pengiriman,
      pr.tanggal_pengiriman,
      pr.nomor_resi,
      pr.Alamat_Tujuan,
      pr.Nama_Penerima,
      pr.status_pengiriman
      FROM riwayat pr
      WHERE pr.id_kurir = :idKurir`,
      {
        replacements: { idKurir: idKurir },
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}`);
});
