const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || token !== `Bearer ${process.env.API_TOKEN}`) {
        return res.status(401).send('Accès non autorisé : token invalide ou manquant')
    }
    next();
};

export default authenticate;