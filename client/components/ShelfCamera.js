import React from 'react';
import Webcam from "react-webcam";
import store from "../store";
const Kairos = require("kairos-api");
const client = new Kairos("a85dfd9e", "f2a5cf66a6e3c657d7f9cfbb4470ada1");

export default class ShelfCamera extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            images:[]
        }
    }

    setRef = webcam => {
    this.webcam = webcam
    };

    // get kairos functionality here
    // need to send capture method in store!
    capture = () => {
    let pic = this.webcam.getScreenshot();
    this.setState({ images: [pic] });
    setTimeout(() => {
      pic = this.webcam.getScreenshot();
      this.setState({ images: [...this.state.images, pic] });
    }, 300);
    setTimeout(() => {
      pic = this.webcam.getScreenshot();
      this.setState({ images: [...this.state.images, pic] });
    }, 600)
}

    render(){
        return (
            <div>
                <Webcam
                audio={false}
                height={350}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={350}
                />
            </div>
        )
    }

}

const mapStateToProps =()=>{

}
const mapDispatchToProps = ()=>{

}