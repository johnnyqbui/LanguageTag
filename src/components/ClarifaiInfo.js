import React from 'react';

const clarifaiInfo = (props) => {
	const { translatedData, isLoading } = props;
	const data = translatedData.map((data, index) => {
		if (data.hasOwnProperty('combinedData')) {
			let info = data.combinedData;
			return <li key={index}>
				{info.translatedText} - {info.name} - {(info.value*100).toFixed(2)+'%'}
			</li>
		} else {
			return <li key={index}>
				{data.name} - {(data.value*100).toFixed(2)+'%'}
			</li>
		}
	})
	return (
		<div className="clarifai-info">
			{isLoading ? <ul>Loading...</ul> : <ul>{data}</ul>}
		</div>
	)
}

export default clarifaiInfo