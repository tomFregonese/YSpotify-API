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
<p> La première étape à réaliser est l'installation des dépendances avec la commande : </p>

```bash
npm install
```

<p>Ensuite, le serveur peut être démarré avec la commande :</p>

```bash
node Index.js
```

<p>Une fois le serveur lancé sur le port 3000, vous pourrez le requêter de deux manières :</p>

<h4>1. Via une application de test d'API web telle que POSTMAN. </h4>

<h4>2. Via le Swagger UI accessible à la route [/api-docs](http://localhost:3000/api-docs). </h4>


