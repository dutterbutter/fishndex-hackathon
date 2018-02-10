require('dotenv').config()
const express = require('express');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const cors = require('cors');
const PORT = process.env.PORT || 8080
const admin = require("firebase-admin")
const axios = require('axios');
const deploy = require('./keys.js');
const serviceAccount = deploy.firepack;

app = express()
app.use(express.static('public'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fishdex-hackathon.firebaseio.com"
});

app.post('/fish-detection', (req, res) => {
   
    const image = {
        source: { imageUri: req.body.downloadURL }
    }

    client.labelDetection(image.source.imageUri)
        .then(response => {
            const result = response[0].labelAnnotations
            res.send(result)
        })
        .catch(err => {
            console.log("this is an error", err)
            res.sendStatus(500).send("We have encountered an error");
        })
})

app.listen(PORT, _ => {
    console.log(`Express listening on ${PORT}, ctrl+c to kill.`)
})
