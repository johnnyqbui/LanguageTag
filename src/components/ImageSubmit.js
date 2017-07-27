import React from 'react';

const imageSubmit = (props) => {
	const {
		inputText,
		isLoading,
		onChange,
		onSubmit,
		onUpload,
		onKeyUp,
		errorMessage } = props;
	return (
		<div className='img-submit'>
			<label>
				Drop images or click to upload
		        <input
			        type="file"
			        onChange={ onUpload }
			        onClick={ evt => {evt.target.value=null} }
			       	disabled={ isLoading }
		        />

	        </label>
	        <p>{errorMessage}</p>
	        <input
	        	type="text"
	        	value={ inputText }
	        	onChange={ onChange }
	        	onKeyUp={ onKeyUp }
	        	placeholder="Paste in the image URL"
	        />
	        <input
	        	type="submit"
	        	value="Submit"
	        	onClick={ onSubmit }
	        />
        </div>
	)
}

export default imageSubmit