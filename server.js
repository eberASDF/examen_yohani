require("dotenv").config(); 
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_API_KEY = process.env.NASA_API_KEY || "APY_KEY"; // API Key aquí

app.use(cors()); // Para permitir solicitudes desde el frontend
app.use(express.json());
app.use(express.static("public"));

// Obtener la imagen del día (APOD)
app.get("/apod", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos de la NASA" });
    }
});

// Ruta principal que muestra el HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});