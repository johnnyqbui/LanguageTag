import React from 'react';

const languagesOption = (props) => {
	const languages = {
      'Afrikaans' : 'af',
      'Albanian' : 'sq',
      'Amharic' : 'am'
    };
    Object.keys(languages).map((element) => {
      console.log(element)
    })

    return (
    	<div>
    		<select>
          <option></option>
        </select>
    	</div>
    )
}

export default languagesOption