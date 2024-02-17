const express = require('express')
const app = express()
const port = 3000

const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(authRoutes);

app.listen(port, () => {
    console.log(`API running : localhost:${port}`)
})

