import React from 'react';
import Webcam from "react-webcam";
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
        //do recogniz to Kairo
        this.recognize()
    }

    recogniz = () => {
        let params = {
          image,
          gallery_name: "amazon-go-gallery",
        };
        //post all three for best match.
        client.recognize(params).then(res => {
            console.log(res)
            if(true) { //if first picture passed, youre done
                //login user, move router to diff page or prepare for another login
            } else {
                //you need to use other pics..
            }
        })
        .catch(err => console.log(err))
        ;
        //if at least one image is success or > 90% match let them login.

        //call login thunk and find user based on the returned subjectid
    }

    capture = () => {
        let pic = this.webcam.getScreenshot();
        this.setState({ images: [pic] }); //wipe and start with first pic in case of recapture

        setTimeout(() => {
            let pic = this.webcam.getScreenshot();
            this.setState({ images: [...this.state.images, pic] });
        }, 600);
        setTimeout(() => {
            let pic = this.webcam.getScreenshot();
            this.setState({ images: [...this.state.images, pic] });
        }, 900);
    }

    render() { 
        return (
            <div>
                this is going to be creepy af
                <button onClick={() => this.handleMotionDetection()}>replicate motionDetection</button>
            </div>
        )
    }
}
 
export default MotionLogin