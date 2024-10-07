const express = require('express');
const { exec } = require('child_process');
const os = require('os');
const app = express();
const port = 3000;

function getLocalIPAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        addresses.push(alias.address);
      }
    }
  }
  return addresses;
}

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
  const localIPs = getLocalIPAddresses();
  console.log(localIPs)
  // console.log(`Serveur backend lancé sur http://${localIPs[0]}:${port}`);
});
