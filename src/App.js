import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageSubmit from './components/ImageSubmit';
import ImagePreview from './components/ImagePreview';
import ClarifaiInformation from './components/ClarifaiInfo';
import Clarifai from 'clarifai';
import reactStringReplace from 'react-string-replace';
const API_KEY = 'c82a97c774c94a01afd42f8f49f9bb8c';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: 'true',
      fileName: '',
      fileSize: null,
      fileType: '',
      fileBase64: '',
      clarifaiData: [],
      value: null
    }
  }

  clarifaiData(base64) {
    const app = new Clarifai.App({
      apiKey: `c82a97c774c94a01afd42f8f49f9bb8c`
    })

    app.models.predict(Clarifai.GENERAL_MODEL,
      {base64: base64}).then(
      (response) => {
        this.setState({ clarifaiData: response.outputs[0].data.concepts })
      },
      (err) => {
        console.log(err, 'error')
      }
    )
  }

  handleSubmit(e) {
    let file = e.target.files[0];
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileBase64: reader.result
      })

      // Convert the file to base64 text
      let base64Preview = reactStringReplace(
        reader.result, /^data:image\/(.*);base64,/,
        (match) => {match})
      this.clarifaiData(base64Preview[2])
    }
  }

  render() {
    return (
      <div className="App">
        <ImageSubmit
          className='drop-zone'
          onSubmit={this.handleSubmit.bind(this)}
        />
        <ImagePreview
          fileName={this.state.fileName}
          fileSize={this.state.fileSize}
          fileType={this.state.fileType}
          fileBase64={this.state.fileBase64}
        />
        <ClarifaiInformation clarifaiData={this.state.clarifaiData}/>
      </div>
    );
  }
}

export default App;