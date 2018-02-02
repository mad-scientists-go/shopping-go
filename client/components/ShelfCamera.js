import React from 'react'
import Webcam from "react-webcam"
import { connect } from "react-redux"
import { updateLineItem } from '../store'
import axios from 'axios'
import inStoreUsers from '../store/inStoreUsers';
const Kairos = require("kairos-api")
const client = new Kairos("a85dfd9e", "f2a5cf66a6e3c657d7f9cfbb4470ada1");

class ShelfCamera extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            images: [],
            qty: 0,
            productId: 1,
            orderId: 0
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
    let pics = this.state.images.map(item => item.src)
    this.recogniz(pics)
}

componentWillReceiveProps (nextProps) {
  if (nextProps.shelfCount !== this.props.shelfCount) {
    let newQty = this.props.shelfCount - nextProps.shelfCount
    this.setState({qty: newQty})
    this.capture()
  }
}


recogniz = pics => {
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
    let removeErrArr = results.filter(arr => arr.body.images)
    let filterArr = removeErrArr.filter(
      arr => arr.body.images[0].transaction.confidence
    )
    filterArr = filterArr.map(item => item.body.images[0].transaction);
    let mostProbableUser = { confidence: 0, subject_id: null };
    for (let image of filterArr) {
      if (image.confidence > mostProbableUser.confidence) {
        mostProbableUser.confidence = image.confidence;
        mostProbableUser.subject_id = image.subject_id;
      }
    }
    if (mostProbableUser.confidence > 0.7 && mostProbableUser.subject_id) {
      let { qty, productId, orderId } = this.state

    let currentUser = this.props.inStoreUsers.filter(user => user.subject_id ===  mostProbableUser.subject_id)
      this.props.sendLineItemInfo(currentUser.order.id, productId, qty)

    } else if (removeErrArr.length > 0) {
      var utterance = new SpeechSynthesisUtterance(
        "No match found. Please see cashier"
      );
      window.speechSynthesis.speak(utterance);
    } else {
      var utterance = new SpeechSynthesisUtterance(
        "No faces were detected. Do you have a face?"
      );
      window.speechSynthesis.speak(utterance);
    }
  });
};


    render(){
        console.log('shelf camera here')
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

const mapStateToProps = (state) => {
  return {
    shelfCount: state.shelfCount,
    inStoreUsers: state.inStoreUsers
  }
}
const mapDispatchToProps = (dispatch) => ({
    sendLineItemInfo(orderId, productId, qty) {
      dispatch(updateLineItem(orderId, productId, qty));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ShelfCamera)
