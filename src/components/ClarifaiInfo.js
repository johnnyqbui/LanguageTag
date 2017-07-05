import React from 'react';

const clarifaiInfo = (props) => {
	const data = props.clarifaiData.map((element) => {
		return <div>
					{element.name} - {(element.value*100).toFixed(2)+'%'}
				</div>
	})

	return (
		<div className="clarifai-info">
			<ul>{data}</ul>
		</div>
	)
}

export default clarifaiInfo