const express = require('express')
const app = express()
const port = 3000

const authRoutes = require("./routes/auth");
const spotifyRoutes = require("./routes/spotify");

app.use(express.json());
app.use(authRoutes);
app.use(spotifyRoutes);

app.listen(port, () => {
    console.log(`API running : localhost:${port}`)
})

