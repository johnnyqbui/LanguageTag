import React from 'react';

const imageSubmit = (props) => {
	return (
		<div className="img-submit">
			<input
		        type="file"
		        onChange={ props.onSubmit.bind(this) }
	        />
        </div>
	)
}

export default imageSubmit