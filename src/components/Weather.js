import React from 'react';

export default function Weather(props){
        return(
            <div>
                {props.city && props.country && <p>Location: {props.city}, {props.country}</p>}
                {props.temperature && <p>Temperature: {props.temperature}</p>}
                {props.description && <p>Description: {props.description}</p>}
                {props.error && <p>{props.error}</p>}
            </div>
        )
    }



