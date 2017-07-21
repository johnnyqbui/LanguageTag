import React from 'react';

const Image = (props) => {
	const { fileName, fileSize, fileType, filePreview } = props;
	return (
		<div className="preview-container">
			<p>{fileName}</p>
			<img src={filePreview} />
		</div>
	)
}

export default Image

