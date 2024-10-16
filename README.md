# VAGRANT-API

## Description
**VAGRANT-API** est une API Node.js permettant de gérer des machines virtuelles (VMs) en utilisant **Vagrant**. L'API permet de démarrer et d'arrêter des VMs de manière simplifiée via des appels HTTP. L'application utilise Express.js et est conteneurisée avec Docker pour faciliter le déploiement.

## Structure du Projet

Voici la structure du projet **VAGRANT-API** :

```
/VAGRANT-API 
│ 
├── config/ 
│ └── default.json
│ 
├── controllers/ 
│ └── vmController.js
│ ├── middleware/ 
│ └── auth.js
│ 
├── routes/ 
│ └── vmRoutes.js
│ 
├── logs/ 
│ └── api.log
│ 
├── tests/ 
│ └── vm.test.js
│ 
├── .env 
├── .gitignore 
├── .dockerignore 
├── Dockerfile 
├── Vagrantfile 
├── package.json 
├── package-lock.json 
├── README.md 
└── app.mjs
```

## Table des Matières
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Routes API](#routes-api)
- [Environnement de Développement](#environnement-de-développement)
- [Contributions](#contributions)
- [Licence](#licence)

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/HakiosR/vagrant-api.git
```
2. Accédez au répertoire du projet :
```bash
cd vagrant-api
```
3. Installez les dépendances :
```bash
npm install
```

## Configuration

1. Créez un fichier .env à la racine du projet avec les informations suivantes :
```makefile
PORT=3000
API_TOKEN=votre_token_api
```
2. Personnalisez les valeurs selon vos besoins

## Usage

### Lancer l'API localement

Pour démarrer l'API en local :
```bash
npm start
```
### Utiliser Docker

1. Construisez l'image Docker :
```bash
docker build -t image_vagrant-api .
```
2. Démarrez le conteneur :
```bash
docker run -d -p 3000:3000 --name ct_vagrant-api image_vagrant-api
```

## Routes API

L'API expose les routes suivantes :
| Méthode    | Endpoint        |        Description            |
|------------|-----------------|-------------------------------|
| GET        | `/api/vm/start` | Démarre une machine virtuelle |
| GET        | `/api/vm/stop`  | Arrête une machine virtuelle  |

### Exemple d'utilisation

- Démarre une VM :
```bash
curl -X GET http://localhost:3000/apo/vm/start -H "Authorization: Bearer votre_token_api"
```
- Arrêtez une VM :
```bash
curl -X GET http://localhost:3000/api/vm/stop -H "Authorization: Bearer votre_token_api"
```

## Environnement de développement

### Pré-requis
- NodeJS (version 20 ou supérieure)
- Vagrant (dernière version stable)
- Docker (si vous souhaitez utiliser la conteneurisation)

### Développement
1. Assurez-vous que toutes les dépendances sont installées avec `npm install`.
2. Lancez le serveur en utilisant `npm start`.
3. Les modifications sont automatiquement reflétées si vous utilisez nodemon (à installer en tant que dépendance de développement si nécessaire).

## Contributions
Les contributions sont les bienvenues ! Merci de suivre les étapes suivantes :

1. Forker le projet
2. Créer une nouvelle branche (git checkout -b feature-nouvelle-fonctionnalite)
3. Committer vos changements (git commit -m 'Ajout d'une nouvelle fonctionnalité')
4. Pousser vers la branche (git push origin feature-nouvelle-fonctionnalite)
5. Ouvrir une Pull Request

## License

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.