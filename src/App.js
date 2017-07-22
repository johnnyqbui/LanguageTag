import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageSubmit from './components/ImageSubmit';
import ImagePreview from './components/ImagePreview';
import ClarifaiInformation from './components/ClarifaiInfo';
import Clarifai from 'clarifai';
import reactStringReplace from 'react-string-replace';
import translate from './api/googleTranslate';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: '',
      fileName: '',
      fileSize: null,
      fileType: '',
      fileBase64: '',
      clarifaiData: [],
      value: null
    }
  }

  getClarifaiData(base64) {
    const API_KEY = 'c82a97c774c94a01afd42f8f49f9bb8c';
    const app = new Clarifai.App({
      apiKey: `${API_KEY}`
    })

    app.models.predict(Clarifai.GENERAL_MODEL,
      {base64: base64}).then(
      (response) => {
        let clarifaiTagNames = response.outputs[0].data.concepts.map((element) => {
          return element.name
        });

        this.setState({
          clarifaiData: response.outputs[0].data.concepts,
          isLoading: false
        })

        translate(clarifaiTagNames);
      },
      (err) => {
        console.log(err, 'error')
      }
    )
  }

  handleSubmit(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    file ? reader.readAsDataURL(file) : false;

    reader.onload = () => {
      this.setState({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileBase64: reader.result,
        isLoading: true
      })

      // Convert the file to base64 text
      let base64Preview = reactStringReplace(
        reader.result, /^data:image\/(.*);base64,/,
        (match) => {match}
      )
      this.getClarifaiData(base64Preview[2])
    }
  }

  render() {
    return (
      <div className="App">
        <ImageSubmit
          onSubmit={this.handleSubmit.bind(this)}
          isLoading={this.state.isLoading}
        />

        <ImagePreview
          fileName={this.state.fileName}
          fileSize={this.state.fileSize}
          fileType={this.state.fileType}
          fileBase64={this.state.fileBase64}
        />
        <ClarifaiInformation
          clarifaiData={this.state.clarifaiData}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;
