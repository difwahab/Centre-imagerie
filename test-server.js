import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Express fonctionne !");
});

app.listen(3000, () => console.log("✅ Serveur démarré sur http://localhost:3000"));