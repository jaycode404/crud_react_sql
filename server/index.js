// server.js (lado del servidor - Node.js)
const express = require("express");
require("dotenv").config();
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const urlDataBase = `mysql://${process.env.VITE_USER}:${process.env.VITE_PASS}@${process.env.VITE_HOST}:${process.env.VITE_PORT}/${process.env.VITE_NAME}`;

const db = mysql.createConnection(urlDataBase);

//GET
app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log("hubo un error sql", err);
      res.status(500).send("Error updating employee");
    } else {
      res.status(200).send(result);
    }
  });
});

//POST
app.post("/crear", (req, res) => {
  const { nombre, edad, pais, puesto } = req.body;

  db.query(
    "INSERT INTO empleados (nombre, edad, pais, puesto) VALUES (?, ?, ?, ?)",
    [nombre, edad, pais, puesto],
    (err, result) => {
      if (err) {
        console.log("hubo un error sql", err);
        res.status(500).send("Error updating employee");
      } else {
        res.status(200).send(result);
      }
    }
  );
});

//PUT
app.put("/actualizar", (req, res) => {
  const { nombre, edad, pais, puesto, id } = req.body;

  db.query(
    "UPDATE empleados SET nombre=?, edad=?, pais=?, puesto=? WHERE id=?",
    [nombre, edad, pais, puesto, id],
    (err, result) => {
      if (err) {
        console.log("hubo un error sql", err);
        res.status(500).send("Error updating employee");
      } else {
        res.status(200).send(result);
      }
    }
  );
});
//DELETE
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log("ID a eliminar:", id);

  db.query("DELETE FROM empleados WHERE id=?", id, (err, result) => {
    if (err) {
      console.log("Hubo un error SQL", err);
      res.status(500).send("Error eliminando empleado");
    } else {
      console.log("Empleado eliminado correctamente");
      res.status(200).send(result);
    }
  });
});

app.listen(3000 || `${process.env.PORT}`, () => {
  console.log(`conectado al puerto ${process.env.VITE_PORT}`);
});
