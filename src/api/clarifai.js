import Clarifai from 'clarifai';
import translate from './googleTranslate';

const clarifaiData = (base64) => {
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
	    console.log(clarifaiTagNames)
	    translate(clarifaiTagNames);
	  },
	  (err) => {
	    console.log(err, 'error')
	  }
	)
}

export default clarifaiData;