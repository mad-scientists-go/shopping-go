import React from "react";
import Webcam from "react-webcam";
import { connect } from "react-redux";
import { faceAuth } from "../store";
import EnterExit from "./EnterExit";

const Kairos = require("kairos-api");
const client = new Kairos("a85dfd9e", "f2a5cf66a6e3c657d7f9cfbb4470ada1");

class MotionLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motionDetected: false,
      images: []
    };
    this.updateFaceAuthImagesForLogin = this.updateFaceAuthImagesForLogin.bind(
      this
    );
  }
  componentDidMount() {
    // client
    //   .galleryView({ gallery_name: "go-gallery" })
    //   .then(res => console.log(res));
  }

  handleMotionDetection() {
    console.log("motion detected");
    //do captures
    this.capture();
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  updateFaceAuthImagesForLogin(pics) {
    pics = pics.map(item => item.src);
    this.recogniz(pics);
    // this.setState({
    // 	images: pics
    // })
  }

  componentDidUpdate(newProp, newState) {
    console.log("updated with 3 pics", newState.images);
  }
  recogniz = pics => {
    let params = {
      image: pics[0],
      gallery_name: "go-gallery"
    };
    //post all three for best match.
    let promiseArr = [];
    pics.map(pic =>
      promiseArr.push(
        client.recognize({
          image: pic,
          gallery_name: "go-gallery"
        })
      )
    );
    Promise.all(promiseArr).then(results => {
      if (results[0].body.Errors) {
        console.log("NO FACES FOUND");
        return
      }
      if (!results[0].body.images[0].transaction.confidence) {
        console.log("NO FACE MATCH");
        return
      } else {
        results = results.map(item => item.body.images[0].transaction);
        let mostProbableUser = { confidence: 0, subject_id: null };
        for (let image of results) {
          if (image.confidence > mostProbableUser.confidence) {
            mostProbableUser.confidence = image.confidence;
            mostProbableUser.subject_id = image.subject_id;
          }
        }

        if (mostProbableUser.confidence > 0.8 && mostProbableUser.subject_id) {
          this.props.login(mostProbableUser.subject_id);
        }
      }
      // client.recognize(params)
      // .then(res => res.body)
      // .then(res => {
      //     console.log(res)
      //     if (res.images[0].transaction.confidence > 0.8) this.props.login(res.images[0].transaction.subject_id)
      //     else console.log('replace with ui login err')
      // })
      // .catch(err => console.log(err))
    });
    //if at least one image is success or > 90% match let them login.

    //call login thunk and find user based on the returned subjectid
  };

  capture = () => {
    let pics = [this.webcam.getScreenshot()];
    setTimeout(() => {
      pics.push(this.webcam.getScreenshot());
    }, 300);
    setTimeout(() => {
      pics.push(this.webcam.getScreenshot());
      this.recogniz(pics);
    }, 600);
  };

  render() {
    return (
      <div>
        <EnterExit login={this.updateFaceAuthImagesForLogin} />
        <button onClick={() => this.handleMotionDetection()}>
          replicate motionDetection
        </button>
      </div>
    );
  }
}
const mapDispatch = dispatch => {
  return {
    login(subject_id) {
      dispatch(faceAuth(subject_id)); //look for this user and log them in.
    }
  };
};
export default connect(null, mapDispatch)(MotionLogin);
