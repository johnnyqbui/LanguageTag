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
      submittedURL: '',
      errorMessage: ''
    }
  }

  getClarifaiData = (file) => {
    let languageCode = this.state.languageCode;
    let clarifaiData = readClarifai(file);

    // Translate text from clarifai data
    clarifaiData.then((clarifaiInfo)=> {
      let translated = translate(clarifaiInfo, languageCode);
      Promise.all(translated)
      .then(data => {
        this.setState({
          isLoading: false,
          translatedData: data
        })
      })
      .catch(err => {
        console.log(err, 'Invalid image URL')
      })
    })
  }

  handleLanguageChange = (languageCode) => {
    this.setState({ languageCode })
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value })
  }

  // For Image URLs
  handleSubmit = (e) => {
    let inputText = this.state.inputText;

    // if enter key pressed or submit button is clicked
    if (e.keyCode === 13 || e.target.type === 'submit' && inputText.match(/.(jpeg|jpg|gif|png)$/i)) {
      this.getClarifaiData(inputText)
      this.setState({ submittedURL: inputText })
    } else {
      this.setState({ errorMessage: 'Please submit valid image types' })
      return false;
    }
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
          onKeyUp={this.handleSubmit}
          onSubmit={this.handleSubmit}
          onUpload={this.handleUpload}
          inputText={this.state.inputText}
          isLoading={this.state.isLoading}
          errorMessage={this.state.errorMessage}
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
