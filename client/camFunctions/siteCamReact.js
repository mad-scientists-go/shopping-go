import React, {Component} from 'react';
import DifCamEngine from './difEngine';
import ImageGrid from '../components/ImageGrid';

export default class SiteCamReact extends Component {
  constructor(props) {
      super(props)
      this.state = {
          bestImages: [],
          classes: {
            toggle: null,

          }
      }
  }
//tweaks is submit nums for cam diff
//hradcode pixel and score threshhold
  render () {
    return (
      <div>
         <button className="toggle" disabled></button>
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

          <div>
              <div className="status"></div>
              <div className="progress">
                  <div className="meter"></div>
              </div>
          </div>

          <div className="feedback">
              <figure>
                  <video className="video"></video>
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
