import React, { Component } from 'react';
import reactStringReplace from 'react-string-replace';
import './App.css';

// Components
import ImageSubmit from './components/ImageSubmit';
import ImagePreview from './components/ImagePreview';
import LanguagesOption from './components/LanguagesOption';
import ClarifaiInformation from './components/ClarifaiInfo';

// APIs
import translate from './api/googleTranslate';
import clarifaiData from './api/clarifai';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: '',
      fileName: '',
      fileSize: null,
      fileType: '',
      languageCode: '',
      translatedData: [],
      inputText: '',
      imgPreview: '',
      errorMessage: ''
    }
  }

  getClarifaiData = (submittedFile) => {
    let languageCode = this.state.languageCode;

    // Translate text from clarifai data
    clarifaiData(submittedFile).then((clarifaiInfo)=> {
      let translated = translate(clarifaiInfo, languageCode);
      Promise.all(translated).then(data => {
        this.setState({
          isLoading: false,
          translatedData: data
        })
      })
      .catch(err => {
        this.setState({ isLoading: false })
        alert('Invalid image URL');
        console.log(err);
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
    // If enter or submit button is clicked
    if (e.keyCode === 13 || e.target.type === 'submit') {
      // Verify input value is valid img and URL
      if (inputText.match(/^(http(|s):\/\/)/ig) && inputText.match(/.(jpeg|jpg|png|tiff|bmp)$/ig)) {
        fetch(inputText, {mode: 'no-cors'}).then((res)=> {
          // If bad request then set error message
          if (res.status === 400) {
            this.setState({ errorMessage: 'Please submit valid URL and image types: jpeg, jpg, png, tiff, bmp' })
          } else {
            this.getClarifaiData(inputText)
            this.setState({
              isLoading: true,
              imgPreview: inputText
            })
          }
        }).catch((err)=> {
          this.setState({ errorMessage: 'Please submit valid URL and image types: jpeg, jpg, png, tiff, bmp' })
        })
      }
    }
  }

  // For image uploads
  handleUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    file.name.match(/.(jpeg|jpg|png|tiff|bmp)$/ig) ? reader.readAsDataURL(file) : alert('Please upload correct image type: jpeg, jpg, png, tiff, bmp');

    // To allow reupload of same image
    e.target.value = null;

    reader.onload = () => {
      this.setState({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        imgPreview: reader.result,
        isLoading: true
      })

      // Convert the file to base64 text
      let base64Preview = reactStringReplace(
        reader.result, /^data:image\/(.*);base64,/,
        (match) => {return match}
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
          fileName={this.state.fileName}
          imgPreview={this.state.imgPreview}
        />
        <ClarifaiInformation
          translatedData={this.state.translatedData}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;
