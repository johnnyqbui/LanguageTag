import React from 'react';

const Image = (props) => {
	const {
		inputText,
		fileName,
		fileSize,
		fileType,
		fileBase64 } = props;
	const imgSrc = inputText ? inputText : fileBase64;
	return (
		<div className="preview-container">
			<p>{fileName}</p>
			<img src={imgSrc} />
		</div>
	)
}

export default Image

