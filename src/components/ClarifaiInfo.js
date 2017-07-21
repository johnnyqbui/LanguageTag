import React from 'react';

const clarifaiInfo = (props) => {
	const { clarifaiData, tagNames, isLoading } = props;
	const data = clarifaiData.map((element, index) => {
		return <li key={index}>
					{element.name} - {(element.value*100).toFixed(2)+'%'}
				</li>
	})
	return (
		<div className="clarifai-info">
			{isLoading ? <ul>Loading...</ul> : <ul>{data}</ul>}
		</div>
	)
}

export default clarifaiInfo