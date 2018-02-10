require('dotenv').config()
const express = require('express');
const vision  = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();const cors    = require('cors');
const PORT    = process.env.PORT || 8080 
const admin   = require("firebase-admin")
const deploy = require('./keys.js');
const serviceAccount = require("./fishdex-hackathon-firebase-adminsdk-dcits-1cd90a6f14.json")

app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fishdex-hackathon.firebaseio.com"
});

app.post('/fish-detection'), (req, res) => {
    console.log("g")
    const image = {
        source: { imageUri: req.body.downloadURL }
    }

    client.labelDetection(image)
        .then(response => {
            console.log('h')
            let fishData = response[0].data
            res.send(fishData)
        })
        .catch(err => {
            console.log("this is an error", err)
            res.sendStatus(500).send("We have encountered an error");
        })
}

app.listen(PORT, _ => {
    console.log(`Express listening on ${PORT}, ctrl+c to kill.`)
})
