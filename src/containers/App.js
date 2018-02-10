import React, { Component } from 'react';
import * as firebase from 'firebase';
import axios from 'axios'

import Deploy from '../keys.js';
import './App.css';
import GoodCamera from '../components/camera';

class App extends Component {
  constructor() {
    super()
    this.state = {
      fishData: []
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
            let fishCopy = [...fishData];

            this.setState({
              fishData: fishCopy
            })
          })
      })
  }

  render() {

    return (
      <div>
        fish dex 
        <GoodCamera/>
      </div>
    );
  }
}

export default App;
