import React from 'react';

const imageSubmit = (props) => {
	return (
		<input
	        type="file"
	        onChange={ props.onSubmit.bind(this) }
        />
	)
}

export default imageSubmit