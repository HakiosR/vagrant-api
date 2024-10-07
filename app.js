require('dotenv').config(); // Pour charger les variables d'environnement
const express = require('express');
const { spawn } = require('child_process');
const os = require('os');
const app = express();
const port = process.env.PORT;
const apiToken = process.env.API_TOKEN; // Token d'API pour sécuriser l'accès

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== `Bearer ${apiToken}`) {
    return res.status(401).send('Accès non autorisé : token invalide ou manquant');
  }
  next();
};

// Fonction pour obtenir les adresses IP locales
const getLocalIPAddresses = () => {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter(alias => alias.family === 'IPv4' && !alias.internal)
    .map(alias => alias.address);
};

// Route pour démarrer la VM
app.get('/start-vm', authenticate, (req, res, next) => {
  const process = spawn('vagrant', ['up']);

  process.stdout.on('data', (data) => {
    console.log(`VM démarrée : ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`Erreur lors du démarrage de la VM : ${data}`);
    return res.status(500).send(`Erreur lors du démarrage de la VM : ${data}`);
  });

  process.on('close', (code) => {
    if (code === 0) {
      res.send("VM démarrée avec succès");
    } else {
      res.status(500).send(`Erreur lors du démarrage de la VM : code de sortie ${code}`);
    }
  });
});

// Route pour arrêter la VM
app.get('/stop-vm', authenticate, (req, res, next) => {
  const process = spawn('vagrant', ['halt']);

  process.stdout.on('data', (data) => {
    console.log(`VM arrêtée : ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`Erreur lors de l'arrêt de la VM : ${data}`);
    return res.status(500).send(`Erreur lors de l'arrêt de la VM : ${data}`);
  });

  process.on('close', (code) => {
    if (code === 0) {
      res.send("VM arrêtée avec succès");
    } else {
      res.status(500).send(`Erreur lors de l'arrêt de la VM : code de sortie ${code}`);
    }
  });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé !');
});

app.listen(port, () => {
  const localIPs = getLocalIPAddresses();
  console.log(`Serveur backend lancé sur http://${localIPs[0]}:${port}`);
});
