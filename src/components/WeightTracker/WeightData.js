import React from 'react';

export default function WeightData (props){
    console.log(1111111111111, props.data)
    return(
        <div>
            <p>{props.data.type}</p>
        </div>
    )
}