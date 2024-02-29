# YSpotify-API — Guide d'utilisation

<h2> Bienvenue dans ce projet réalisé par :
<ul>
    <li>FRÉGONESE Tom</li>
    <li>GIBAULT Alexandre</li>
</ul>
</h2>

<br>

<p>Le but de ce projet est mettre à disposition une API sur laquelle l'utilisateur pourra se créer un compte 
YSpotify et s'y connecter. Il pourra ensuite déléguer certaines autorisations sur son compte Spotify pour que 
YSpotify puisse récupérer ses données et les afficher sur l'application.</p>

<br>

<p>L'API implémente actuellement les fonctionnalités suivantes : 

- Création d'un compte YSpotify via la route [/register](http://localhost:3000/register)
- Connexion à un compte YSpotify via la route [/login](http://localhost:3000/login)
- Délégation d'autorisations Spotify via la route [/auth-url](http://localhost:3000/auth-url)
- Création de groupes d'utilisateurs via la route [/join-group](http://localhost:3000/join-group)
- ...
</p>

<h2>Installation</h2>

<p> La première étape à réaliser est l'installation des dépendances avec la commande : </p>

```bash
npm install
```

<p>Ensuite, le serveur peut être démarré avec la commande :</p>

```bash
node Index.js
```

<br>

<p>Une fois le serveur lancé sur le port 3000, il ne reste plus qu'à modifier YOUR_CLIENT_ID and YOUR_CLIENT_SECRET 
dans client-credentials.json par ceux disponibles dans le txt de rendu. 

L'API peut en suite être requêtée de deux manières : </p>

<h4>1. Via une application de test d'API web telle que POSTMAN. </h4>

<h4>2. Via le Swagger UI accessible à la route [/api-docs](http://localhost:3000/api-docs). </h4>

<br> 

<p>Le serveur est actuellement en développement et ne propose pas encore toutes les fonctionnalités prévues.