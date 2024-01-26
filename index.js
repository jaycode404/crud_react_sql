import express from "express";
import { createPool } from "mysql2/promise";
import cors from "cors";


const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_NAME = process.env.DB_NAME || "crud_react";
const DB_PORT = process.env.DB_PORT || "3306";

const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  connectionLimit: 10,
});

const iniciarServidor = async () => {
  const app = express();

app.use(
  cors({
    origin: "https://starlit-duckanoo-adb71a.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
 
  try {
    // Obtener una conexión del pool
    const connection = await pool.getConnection();

    //GET
    app.get("/empleados", async (req, res) => {
      try {
        const [result] = await connection.query("SELECT * FROM empleados");
        res.status(200).send(result);
      } catch (err) {
        console.log("Hubo un error SQL", err);
        res.status(500).send("Error obteniendo empleados");
      } finally {
        // Liberar la conexión después de cada solicitud
        connection.release();
      }
    });

    //POST
    app.post("/crear", async (req, res) => {
      const { nombre, edad, pais, puesto } = req.body;

      try {
        const [result] = await connection.query(
          "INSERT INTO empleados (nombre, edad, pais, puesto) VALUES (?, ?, ?, ?)",
          [nombre, edad, pais, puesto]
        );
        res.status(200).send(result);
      } catch (err) {
        console.log("Hubo un error SQL", err);
        res.status(500).send("Error creando empleado");
      } finally {
        connection.release();
      }
    });

    //PUT
    app.put("/actualizar", async (req, res) => {
      const { nombre, edad, pais, puesto, id } = req.body;

      try {
        const [result] = await connection.query(
          "UPDATE empleados SET nombre=?, edad=?, pais=?, puesto=? WHERE id=?",
          [nombre, edad, pais, puesto, id]
        );
        res.status(200).send(result);
      } catch (err) {
        console.log("Hubo un error SQL", err);
        res.status(500).send("Error actualizando empleado");
      } finally {
        connection.release();
      }
    });

    //DELETE
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const [result] = await connection.query(
          "DELETE FROM empleados WHERE id=?",
          id
        );
        res.status(200).send(result);
      } catch (err) {
        console.log("Hubo un error SQL", err);
        res.status(500).send("Error eliminando empleado");
      } finally {
        connection.release();
      }
    });

    app.listen(PORT, () => {
      console.log(`Conectado al puerto ${PORT}`);
    });
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
};

iniciarServidor();
