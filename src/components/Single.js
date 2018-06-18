import React from 'react';

export default function Single(props){
    let { id } = props.exercises
    return(
       <div>
        <h4
       
        onClick = { () =>{
            props.delete(props.exercises.id)
        } }

        >{props.exercises.type} </h4>

        <input onInputCapture = {(e) => props.changer(id, {type: e.target.value}) } type="text"/>
        
        </div>
        
    )

}