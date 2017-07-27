import React from 'react';

const Image = (props) => {
	const { fileName, imgPreview } = props;
	const imgSrc = imgPreview ? <img src={imgPreview} alt={fileName}/> : '';
	return (
		<div className="preview-container">
			{imgSrc}
		</div>
	)
}

export default Image

