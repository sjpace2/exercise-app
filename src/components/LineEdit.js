import React from 'react';



export default function LineEdit(props){
    return(
        <h4 
            onClick = { ()=>{
                props.modify(props.customLift)
            } }
        
        
        ></h4>
    )
}