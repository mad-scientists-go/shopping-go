import React from "react";
import Webcam from "react-webcam";
const Kairos = require("kairos-api");
const client = new Kairos("a85dfd9e", "f2a5cf66a6e3c657d7f9cfbb4470ada1");

export default class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.sendToKairos = this.sendToKairos.bind(this);
    this.recogniz = this.recogniz.bind(this);
  }
  componentDidMount() {
    client
      .galleryView({ gallery_name: "gallerytest1" })
      .then(res => console.log(res));
  }
  setRef = webcam => {
    this.webcam = webcam;
  };
  sendToKairos = image => {
    this.setState({ images: [image] });
    let params = {
      image: image,
      subject_id: "subtest1",
      gallery_name: "gallerytest1",
      selector: "SETPOSE"
    };
    client.enroll(params).then(res => console.log(res));
  };
  recogniz = image => {
    let params = {
      image: image,
      subject_id: "shmuel",
      gallery_name: "gallerytest1",
      selector: "SETPOSE"
    };
    client.recognize(params).then(res => console.log(res));
  };
  capture = () => {
    let pic = this.webcam.getScreenshot();
    this.setState({ images: [...this.state.images, pic] });

    setTimeout(() => {
      let pic = this.webcam.getScreenshot();
      this.setState({ images: [...this.state.images, pic] });
    }, 600);
    setTimeout(() => {
      let pic = this.webcam.getScreenshot();
      this.setState({ images: [...this.state.images, pic] });
    }, 900);
  };

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
        {this.state.images &&
          this.state.images.map(image => {
            return (
              <div>
                <div
                  key={Math.random()}
                  onClick={() => this.sendToKairos(image)}
                >
                  <img src={image} />
                </div>
                <button onClick={() => this.recogniz(image)} />
              </div>
            );
          })}
      </div>
    );
  }
}
