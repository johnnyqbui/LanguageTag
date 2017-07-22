import React from 'react';
import LanguagesOption from './LanguagesOption';

const imageSubmit = (props) => {
	const { isLoading } = props;
	return (
		<div className="img-submit">
			<label>
				Drop images or click to upload
		        <input
			        type="file"
			        onChange={ props.onSubmit.bind(this) }
			       	disabled={ isLoading }
		        />

	        </label>
	        <LanguagesOption />
        </div>
	)
}

export default imageSubmit