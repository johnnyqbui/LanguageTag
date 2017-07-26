import React, { Component } from 'react';
import Clarifai from 'clarifai';
import reactStringReplace from 'react-string-replace';
import './App.css';
import ImageSubmit from './components/ImageSubmit';
import ImagePreview from './components/ImagePreview';
import LanguagesOption from './components/LanguagesOption';
import ClarifaiInformation from './components/ClarifaiInfo';
import translate from './api/googleTranslate';
import readClarifai from './api/clarifai';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: '',
      fileName: '',
      fileSize: null,
      fileType: '',
      fileBase64: '',
      languageCode: '',
      translatedData: [],
      inputText: '',
      submittedURL: ''
    }
  }

  getClarifaiData = (file) => {
    let languageCode = this.state.languageCode;
    let clarifaiData = readClarifai(file);

    // Translate text from clarifai data
    clarifaiData.then((clarifaiInfo)=> {
      let translated = translate(clarifaiInfo, languageCode);
      Promise.all(translated).then(data => {
        this.setState({
          isLoading: false,
          translatedData: data
        })
      })
    })
  }

  handleLanguageChange = (languageCode) => {
    this.setState({ languageCode })
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value })
  }

  // If 'enter' key is pressed
  handleKeyUp = (e) => {
    e.keyCode === 13 ? this.handleSubmit() : ''
  }

  // For Image URLs
  handleSubmit = () => {
    this.setState({ submittedURL: this.state.inputText })

    this.getClarifaiData(this.state.inputText);
  }

  // For image uploads
  handleUpload = (e) => {
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
      <div className='App'>
        <ImageSubmit
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          onUpload={this.handleUpload}
          onKeyUp={this.handleKeyUp}
          inputText={this.state.inputText}
          isLoading={this.state.isLoading}
        />
        <LanguagesOption
          onChange={this.handleLanguageChange}
        />
        <ImagePreview
          inputText={this.state.submittedURL}
          fileName={this.state.fileName}
          fileSize={this.state.fileSize}
          fileType={this.state.fileType}
          fileBase64={this.state.fileBase64}
        />
        <ClarifaiInformation
          translatedData={this.state.translatedData}
          language={this.state.languageCode}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;
