import React from 'react';
import Webcam from "react-webcam";
import { connect } from 'react-redux'
import { faceAuth } from '../store'

const Kairos = require("kairos-api");
const client = new Kairos("a85dfd9e", "f2a5cf66a6e3c657d7f9cfbb4470ada1");


class MotionLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motionDetected: false,
            images: [],
        }
    }
    componentDidMount() {
        client
          .galleryView({ gallery_name: "gallerytest1" })
          .then(res => console.log(res));
    }

    handleMotionDetection() {
        console.log('motion detected')
        //do captures
        this.capture()
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    recogniz = (pics) => {
        let params = {
          image: pics[0],
          gallery_name: "amazon-go-gallery",
        };
        //post all three for best match.
        client.recognize(params)
        .then(res => res.body)
        .then(res => {
            console.log(res)
            if (res.images[0].transaction.confidence > 0.8) this.props.login(res.images[0].transaction.subject_id)
            else console.log('replace with ui login err')
        })
        .catch(err => console.log(err))
        ;
        //if at least one image is success or > 90% match let them login.

        //call login thunk and find user based on the returned subjectid
    }

    capture = () => {
        let pics = [this.webcam.getScreenshot()]
        setTimeout(() => {
            pics.push(this.webcam.getScreenshot())
        }, 300);
        setTimeout(() => {
            pics.push(this.webcam.getScreenshot())
            this.recogniz(pics)
        }, 600);
    }

    render() {
        return (
            <div>
                this is going to be creepy af
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                />
                <button onClick={() => this.handleMotionDetection()}>replicate motionDetection</button>
            </div>
        )
    }
}
const mapDispatch = (dispatch) => {
    return {
        login(subject_id) {
            dispatch(faceAuth(subject_id)) //look for this user and log them in.
        }
    }
}
export default connect(null, mapDispatch)(MotionLogin)
