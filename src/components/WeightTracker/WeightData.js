import React from 'react';

export default function WeightData (props){
    console.log(1111111111111, props.data)
    return(
        <div className = "weightDisplay">
            <h4>{props.data.type}</h4>
        </div>
    )
}