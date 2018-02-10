import React, { Component } from 'react';
import * as firebase from 'firebase';
import axios from 'axios'


import ButtonCamera from '../components/ButtonCamera';

import Deploy from '../keys.js';
import './App.css';
import GoodCamera from '../components/camera';

class App extends Component {
  constructor() {
    super()
    this.state = {
      fishData: [],
    }
    const config = Deploy.configFire;
    firebase.initializeApp(config);

  }

  //we need to pass the BLOB (img) to this function
  //This will then pass this into firebase storage
  //which then will be sent to google vision API
  visionUploadHandler = (acceptedFiles) => {
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
            })
            console.log(this.state.fishData)
          })
          
      })
    console.log("Done. Enjoy.")
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="d-flex flex-row">
          fish dex
          </div>
          <div className="d-flex justify-contents-center align-items-center border "> center this thing</div>
        <GoodCamera visionUploaderHandler={this.visionUploadHandler} />
          <ButtonCamera className="mt-auto p-2"/>
        </div>
    );
  }
}

export default App;
