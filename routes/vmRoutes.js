import express from 'express';
import { startVM, stopVM } from '../controllers/vmController.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

router.get('/start', startVM);
router.get('/stop', stopVM);

router.get('/test-token', (req, res, next) => {
    authenticate(req, res, (err) => {
        if (err) {
            // En cas d'erreur d'authentification, on retourne une erreur avec des détails
            console.error('Erreur lors de l\'authentification :', err);
            return res.status(401).json({
            error: 'Erreur d\'authentification',
            details: err.message
        });
      }
      // Si pas d'erreur, on continue et on renvoie une réponse de succès
      res.send('Token valide !');
    });
});

export default router;