import React, { Component } from 'react';
import { connect } from 'react-redux';
const keys = require('../../secrets');
const Kairos = require("kairos-api");
const client = new Kairos(keys.kairos.key, keys.kairos.secret);
//import SiteCam from '../camFunctions/siteCam';
import SiteCamReact from '../camFunctions/siteCam';
export default class EnterExit extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

  console.log('vidEl', this.videoElement)
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        return (
            <div>
            <SiteCamReact />
                <div>
                    <button className="toggle" disabled></button>
                    <form className="tweaks">
                        <label>
                            Pixel Diff Threshold
                    <input id="pixel-diff-threshold" type="number" min="0" max="255" disabled />
                        </label>
                        <label>
                            Score Threshold
                    <input id="score-threshold" type="number" min="0" disabled />
                        </label>

                        <input type="submit" tab-index="-1" className="submit-tweaks" disabled />
                    </form>
                </div>

                <div>
                    <div className="status"></div>
                    <div className="progress">
                        <div className="meter"></div>
                    </div>
                </div>

                <div className="feedback">
                    <figure>
                        <video className="video" ref={(video) => this.videoElement = video}></video>
                        <figcaption>Live Stream</figcaption>
                    </figure>
                    <figure>
                        <canvas className="motion"></canvas>
                        <figcaption>
                            Motion Heatmap
                    <span className="motion-score"></span>
                        </figcaption>
                    </figure>
                </div>

                <div className="history">
                </div>
                {
                    // <script src="./camFunctions/siteCam.js"></script>
                // <script src="./camFunctions/difEngine.js"></script>
                }
                <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>


            </div>
        )
    }
}
