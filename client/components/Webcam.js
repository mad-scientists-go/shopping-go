import React from "react";
import Webcam from "react-webcam";
import { signupWithImage } from '../store'
import store from '../store'
const Kairos = require("kairos-api");
const client = new Kairos("a85dfd9e", "f2a5cf66a6e3c657d7f9cfbb4470ada1");


//signup
export default class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      email: 'test@aol.com',
      password: '123',
      card_num: '456'
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
  sendToKairos = () => {
    // this.setState({ images: [image] });
    let subject_id = "subtest1" //change to randomly generated key
    let params = {
      image: this.state.images[0],
      subject_id,
      gallery_name: "amazon-go-gallery",
      selector: "SETPOSE"
    };  
    client.enroll(params).then(res => {
      console.log(res)
      params.image = this.state.images[1]
      return client.enroll(params)
    })
    .then(res => {
      console.log(res)
      params.image = this.state.images[2]
      return client.enroll(params)
    })
    .then(res => console.log('last image...', res))
    .catch(err => console.log(err))


    //after sending all 3 images for that person, create subjectId on new user for signup

    //user post 
    let { email, password, card_num } = this.state
    store.dispatch(signupWithImage(email, password, subject_id, card_num))
    
  };
  recogniz = () => {
    let params = {
      image: image,
      subject_id: "shmuel",
      gallery_name: "amazon-go-gallery",
      selector: "SETPOSE"
    };
    client.recognize(params).then(res => console.log(res));
  };
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
  };

  render() {
    let btn
    if(this.props.name === 'login') btn = <button onClick={() => this.recogniz()}>Login</button>
    else if(this.props.name === 'signup') btn = <button onClick={() => this.sendToKairos()}>Signup</button>
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
                  // onClick={() => this.sendToKairos(image)}
                >
                  <img src={image} />
                </div>
              </div>
            );
          })}
          <div>
            <input onChange={(e) => this.setState({ email: e.target.value})} 
            value={this.state.email} 
            placeholder="email" 
            />
            <input onChange={(e) => this.setState({ password: e.target.value})} 
            value={this.state.password} 
            placeholder="password" 
            />
            <input onChange={(e) => this.setState({ card_num: e.target.value})} 
            value={this.state.card_num} 
            placeholder="credit card" 
            />
            {
              btn
            }
          </div>
      </div>
    );
  }
}
