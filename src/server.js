const express = require('express');
const Vision  = require('@google-cloud/vision');
const vision  = new Vision(); //Creates a client
const cors    = require('cors');
const PORT    = process.env.PORT || 8080 
const admin   = require("firebase-admin")
const deploy = require('./src/keys.js');
const storage = firebase.storage();
const serviceAccount = require("../fishdex-hackathon-firebase-adminsdk-dcits-1cd90a6f14.json")

      app     = express()
      app.use(cors());
      app.use(express.json())
      app.use(express.urlencoded({ extended : true }))
         
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://fishdex-hackathon.firebaseio.com"
      });

app.post('/fish-detection'), (req, res) => {
    const image = {
        source: { imageUri: req.body.downloadURL }
    }

    vision.labelDetection(image)
        .then(response => {
            let fishData = response.data
            res.send(fishData)
        })
        .catch(err => {
            console.log(err)
            res.se
        })
}

app.listen(PORT, _ => {
    console.log(`Express listening on ${PORT}, ctrl+c to kill.`)
})
         