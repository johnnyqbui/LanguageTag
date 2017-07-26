import React from 'react';
import languages from '../language/languages.json';

const languagesOption = (props) => {
    let languageSelection = Object.keys(languages).map((element, index) => {
      return (
        <option key={index}>{element}</option>
      )
    })

    return (
    	<div>
        English to <select onChange={evt => props.onChange(languages[evt.target.value])}>
          {languageSelection}
        </select>
    	</div>
    )
}

export default languagesOption