import Clarifai from 'clarifai';

const clarifaiData = (file) => {
	const API_KEY = 'c82a97c774c94a01afd42f8f49f9bb8c';
    const app = new Clarifai.App({
      apiKey: `${API_KEY}`
    })
    // Check if file is url or uploaded
    const fileType = file.substr(0,4) === 'http' ? file : {base64: file}
    return app.models.predict(Clarifai.GENERAL_MODEL,
      fileType).then(
      (response) => {
      	return response.outputs[0].data.concepts.map(info => {
          return {name: info.name, value: info.value}
        });
      },
      (err) => {
        console.log(err, 'error')
      }
    )
}

export default clarifaiData;