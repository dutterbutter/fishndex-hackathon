import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ButtonCamera from './ButtonCamera';
import MobileCamera from './MobileCamera';


const home = () => {
    return (
        <div>
            THE FISH N' DEX APP!
        {/* <MobileCamera /> */}
            <div className="camera-activate">
                <form action="#">
                    <div className="file-field input-field">
                        <div className="btn">
                            <span><i className="large material-icons">photo_camera</i></span>
                            <input type="file" name="image" accept="image/*" capture="user"/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="inputTest" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default home;