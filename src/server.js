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
const fishNameData = require('../fishNameData.json');
// console.log(fishNameData[1].FIELD2);

const fishTestData = require('../testFrontEndData.json');
// console.log(fishTestData);

app = express()
app.use(express.static('public'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fishdex-hackathon.firebaseio.com"
});


app.post('/checkFishName', async (req, res) => {

    let visionApiInfo = req.body.fishCopy;
    console.log(visionApiInfo);
    // let visionApiInfo = fishTestData
    let correctAnswer = "WRONG";

    for (let i = 0; i < visionApiInfo.length; i++) {
        // console.log(visionApiInfo[i].description.toUpperCase())
        for (let j = 0; j < fishNameData.length; j++) {
            if (visionApiInfo[i].description === 'fish') break;
            let searchString = fishNameData[j].FIELD2.toUpperCase();
            // console.log(searchString)
            let didItMatch = searchString.search(visionApiInfo[i].description.toUpperCase())
            // console.log(didItMatch);
            if (didItMatch !== -1) {
                correctAnswer = visionApiInfo[i].description;
                break;
            }
        }
        if (correctAnswer !== "WRONG") {
            console.log(correctAnswer);
            break;
        }
        console.log(correctAnswer);
    }
    let urlWiki = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + correctAnswer + "&limit=20"
    axios.get(urlWiki)
        .then(result => {
            let wikiData = result.data;
            console.log(wikiData);
            res.send(wikiData);
        })

})




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
