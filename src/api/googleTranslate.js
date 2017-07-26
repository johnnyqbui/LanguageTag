const API_KEY = 'AIzaSyB4gPs6sq2FZnGeerNrzed9LRJ-TQrdA5Y';
const googleTranslateUrl = 'https://translation.googleapis.com/language/translate/v2?';

const translate = (tagNames, language) => {
	if (language === '' || language === 'en') {
		return tagNames;
	} else {
		return tagNames.map(taggedData => {
			let requestURL = `${googleTranslateUrl}key=${API_KEY}+&q=${taggedData.name}&target=${language}`;
			return fetch(requestURL)
			    .then(response => response.json())
			    .then(result => {
			    	let translatedObj = { translatedText: result.data.translations[0].translatedText};
			    	let combinedData = Object.assign(taggedData, translatedObj)
			    	return {combinedData};
			    })
			    .catch((err) => { return console.log(err) })
		})
	}
}

export default translate;