import React from 'react';

export default function Single(props){
    return(
        <h4
        onClick = { () =>{
            props.delete(props.exercises.id)
        } }

        >{props.exercises.type} </h4>
    )

}