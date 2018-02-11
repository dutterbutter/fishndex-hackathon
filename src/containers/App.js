import React, { Component } from 'react';
import * as firebase from 'firebase';
import axios from 'axios'


import ButtonCamera from '../components/cameraButton';

import Deploy from '../keys.js';
import './App.css';
import GoodCamera from '../components/camera';

class App extends Component {
  constructor() {
    super()
    this.state = {
      fishData: [],
      fishName: "",
      fishDescription: []
    }
    const config = Deploy.configFire;
    firebase.initializeApp(config);

  }


  sendVisionToOurDatabase = async () => {
    let fishStateData = this.state.fishData;
    console.log(fishStateData);
    let correctFish = await axios.post('http://localhost:8080/checkFishName', { fishStateData });
    console.log(correctFish);
  }



  //we need to pass the BLOB (img) to this function
  //This will then pass this into firebase storage
  //which then will be sent to google vision API
  visionUploadHandler = async (acceptedFiles) => {
    let file = acceptedFiles;
    let storageRef = firebase.storage().ref('vision-images/' + file.name);

    let task = storageRef.put(file);
    task.on('state_changed',
      function progress(snapshot) {
      },
      function error(err) {
        console.log("Something went wrong!, ", err)
      },
      () => {
        let downloadURL = task.snapshot.downloadURL;

        axios.post('http://localhost:8080/fish-detection', { downloadURL })
          .then(result => {
            let fishData = result.data;
            let fishCopy = Array.from(fishData);
            fishCopy.push(fishData)

            this.setState({
              fishData: fishCopy
            });
            console.log(this.state.fishData)
            // return this.sendVisionToOurDatabase();

            return axios.post('http://localhost:8080/checkFishName', { fishCopy });
          }).then((response) => {
            console.log(response.data);
            let topTwentyResults = response.data[2];

            for (let i = 0; i < topTwentyResults.length; i++) {
              let searchForWordFish = topTwentyResults[i].search("fish")
              console.log(topTwentyResults[i])
              if (searchForWordFish !== -1) {
                this.setState({
                  fishDescription: topTwentyResults[i],
                  fishName: response.data[0]
                })
                if(i === 19){
                  
                }
                break;
              }
            }



            // }).then((response)=>{
            //   console.log(response);
          })

      })
    console.log("Done. Enjoy.")


  }

  render() {

    return (
      <div className="container-fluid">
        <div className="d-flex flex-row">
          {this.state.fishName}
          </div>
        <div className="d-flex justify-contents-center align-items-center border "></div>
        <GoodCamera visionUploaderHandler={this.visionUploadHandler} />
        <ButtonCamera className="mt-auto p-2" />
        <div>{this.state.fishDescription}</div>
      </div>
    );
  }
}

export default App;
