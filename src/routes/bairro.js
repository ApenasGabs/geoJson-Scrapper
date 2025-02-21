const express = require("express");
const axios = require("axios");
const router = express.Router();

// Função para buscar o polígono do bairro
async function getBairroPolygon(bairro, cidade) {
  const overpassUrl = "https://overpass-api.de/api/interpreter";

  // Query para buscar o polígono do bairro
  const query = `
    [out:json];
    area["name"="${cidade}"]->.municipio;
    (
      rel(area.municipio)["boundary"="administrative"]["admin_level"="10"]["name"="${bairro}"];
    );
    out geom;
  `;

  try {
    // Faz a requisição à Overpass API
    const response = await axios.post(
      overpassUrl,
      `data=${encodeURIComponent(query)}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    // Processa a resposta
    const elements = response.data.elements;
    if (elements.length === 0) {
      throw new Error("Nenhum polígono encontrado para o bairro especificado.");
    }

    // Extrai as coordenadas do polígono
    const polygon = elements[0].geometry.map((coord) => [coord.lat, coord.lon]);
    return polygon;
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    return null;
  }
}

// Endpoint para buscar o polígono do bairro
router.get("/bairro", async (req, res) => {
  const { bairro, cidade } = req.query;

  if (!bairro || !cidade) {
    return res
      .status(400)
      .json({ error: "Parâmetros 'bairro' e 'cidade' são obrigatórios." });
  }

  const polygon = await getBairroPolygon(bairro, cidade);
  if (polygon) {
    res.json({ polygon });
  } else {
    res.status(404).json({ error: "Polígono não encontrado." });
  }
});

module.exports = router;
