import React from 'react';

const imageSubmit = (props) => {
	const { isLoading } = props;
	return (
		<label className="img-submit">
		Drop images or click to upload
	        <input
		        type="file"
		        onChange={ props.onSubmit.bind(this) }
		       	disabled={ isLoading }
	        />
        </label>
	)
}

export default imageSubmit