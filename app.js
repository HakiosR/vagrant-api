const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;
const ip = "10.60.12.33"

// Route pour démarrer la VM
app.get('/start-vm', (req, res) => {
  exec('vagrant up &', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du démarrage de la VM :\n ${error}`);
      return res.status(500).send("Erreur lors du démarrage de la VM");
    }
    console.log(`VM démarrée :\n ${stdout}`);
    res.send("VM démarrée avec succès");
  });
});

// Route pour arrêter la VM
app.get('/stop-vm', (req, res) => {
  exec('vagrant halt', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'arrêt de la VM :\n ${error}`);
      return res.status(500).send("Erreur lors de l'arrêt de la VM");
    }
    console.log(`VM arrêtée :\n ${stdout}`);
    res.send("VM arrêtée avec succès");
  });
});

app.listen(port, () => {
  console.log(`Serveur backend lancé sur http://${ip}:${port}`);
});
