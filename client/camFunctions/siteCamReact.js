import React, {Component} from 'react';
import DifCamEngine from './difEngine';
import ImageGrid from '../components/ImageGrid';

export default class SiteCamReact extends Component {
  constructor(props) {
      super(props)
      this.state = {
          bestImages: [],
            disabled: true,
            video: '',
            motion: '',
            motionScore: 0,
            history: [],
          status: 'disabled'
      }
      this.init = this.init.bind(this)
      this.initSuccess = this.initSuccess.bind(this)
  }
//tweaks is submit nums for cam diff
//hradcode pixel and score threshhold
componentDidMount(){
  init()
  console.log('vidEl', this.videoElement)
}

init() {
  // make sure we're on https when in prod
  var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!isLocal && window.location.protocol === 'http:') {
      var secureHref = window.location.href.replace(/^http/, 'https');
      window.location.href = secureHref;

  }

  // don't want console logs from adapter.js
  adapter.disableLog(true);

  this.setState({status: 'disabled'})
  const vid = this.videoElement;
  DifCamEngine.init({
      video: vid,
      motionCanvas: document.getElementsByClassName('motion.canvas')[0],
      initSuccessCallback: initSuccess,
      startCompleteCallback: startStreaming,
      captureCallback: checkCapture
  });
}

initSuccess() {
  //setTweakInputs();
  $toggle
      .addClass('start')
      .prop('disabled', false)
      .on('click', toggleStreaming);
 // $tweaks
      // .on('submit', getTweakInputs)
      // .find('input').prop('disabled', false);
}
  render () {
    return (
      <div>
         <button className="toggle" disabled={this.state.disabled} ></button>
{/*
          <div>

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
          </div> */}

          {/* <div>
              <div className="status"></div>
              <div className="progress">
                  <div className="meter"></div>
              </div>
          </div> */}

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



      </div>
    )
  }






}
