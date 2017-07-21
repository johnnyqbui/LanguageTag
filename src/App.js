import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageSubmit from './components/ImageSubmit';
import ImagePreview from './components/ImagePreview';
import ClarifaiInformation from './components/ClarifaiInfo';
import Clarifai from 'clarifai';
import reactStringReplace from 'react-string-replace';
import C_API_KEY from './api/clarifai';
import G_API_KEY from './api/googleTranslate';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: '',
      fileName: '',
      fileSize: null,
      fileType: '',
      filePreview: '',
      fileBase64: '',
      clarifaiData: [],
      tagNames: [],
      value: null
    }
  }

  componentDidMount() {
    console.log(this.state.tagNames)
    const app = new Clarifai.App({
      apiKey: `${C_API_KEY}`
    })
    app.models.predict(Clarifai.GENERAL_MODEL,
      {base64: this.state.fileBase64}).then(
      (response) => {
        let clarifaiTagNames = response.outputs[0].data.concepts.map((element) => {
          return element.name
        });
        this.setState({
          clarifaiData: response.outputs[0].data.concepts,
          tagNames: clarifaiTagNames,
          isLoading: false
        })
      },
      (err) => {
        console.log(err, 'error')
      }
    )

    const googleTranslateUrl = 'https://translation.googleapis.com/language/translate/v2?';
    let translated = this.state.tagNames.map((element) => {
      let translationURL = `${googleTranslateUrl}`+'key='+`${G_API_KEY}`+'+&q='+element+'&target=es'
      fetch(translationURL)
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
      return translationURL
    })
  }

  // clarifaiData(base64) {
  //   const app = new Clarifai.App({
  //     apiKey: `${C_API_KEY}`
  //   })
  //   app.models.predict(Clarifai.GENERAL_MODEL,
  //     {base64: base64}).then(
  //     (response) => {
  //       let clarifaiTagNames = response.outputs[0].data.concepts.map((element) => {
  //         return element.name
  //       });
  //       this.setState({
  //         clarifaiData: response.outputs[0].data.concepts,
  //         tagNames: clarifaiTagNames,
  //         isLoading: false
  //       })
  //     },
  //     (err) => {
  //       console.log(err, 'error')
  //     }
  //   )
  // }

  handleSubmit(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    file ? reader.readAsDataURL(file) : false;
    let base64 = reactStringReplace(
      reader.result, /^data:image\/(.*);base64,/,
      (match) => {match}
    )

    reader.onload = () => {
            console.log('run reader')

      this.setState({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        filePreview: reader.result,
        fileBase64: base64,
        isLoading: true
      })


      // Convert the file to base64 text


      // this.clarifaiData(base64Preview[2])
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
          filePreview={this.state.filePreview}
        />
        <ClarifaiInformation
          clarifaiData={this.state.clarifaiData}
          tagNames={this.state.tagNames}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;
