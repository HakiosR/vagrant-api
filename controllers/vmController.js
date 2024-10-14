import { spawn } from 'child_process';

export const startVM = (req, res) => {
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
};

export const stopVM = (req, res) => {
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
};