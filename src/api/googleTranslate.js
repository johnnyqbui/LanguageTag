const translate = (tagNames) => {
	const API_KEY = 'AIzaSyB4gPs6sq2FZnGeerNrzed9LRJ-TQrdA5Y';
	const googleTranslateUrl = 'https://translation.googleapis.com/language/translate/v2?';
	let translated = tagNames.map((element) => {
	  let translationURL = `${googleTranslateUrl}`+'key='+`${API_KEY}`+'+&q='+element+'&target=zh-CN'
	  fetch(translationURL)
	    .then((response) => response.json())
	    .then((data) => {
	      console.log(data.data.translations[0].translatedText)
	    })
	    .catch((err) => {
	      console.log(err)
	    })
	  return translationURL
	})
}

export default translate;