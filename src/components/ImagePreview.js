import React from 'react';

const Image = (props) => {
	const { fileName, fileSize, fileType, fileBase64 } = props;
	return (
		<div className="preview-container">
			<p>{fileName}</p>
			<img src={fileBase64} />
		</div>
	)
}

export default Image

