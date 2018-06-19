import React from 'react';
import axios from 'axios';

import WeightData from './WeightData'
import DateData from './DateData'

import { ToastContainer, toast } from 'react-toastify';



class WeightTracker extends React.Component {
    constructor(){
        super()
        this.state = {
           weight: [],
           date: [],
           weightInput: '',
           dateInput: ''
        }
        

    }

    handleWeightChange = (value) => {
        this.setState({
            weightInput: value
        })
            
    }

    handleDateChange = (value) => {
        this.setState({
            dateInput: value
        })
    }

    handleWeightClick = () => {
        if(!this.state.weightInput) return
        console.log(this.state.weightInput)    
        axios.post('/api/weight', {type: this.state.weightInput}).then(response =>{
                this.setState({
                    weight: response.data,
                    weightInput: '' 
            })
        })
            
    } 
         


    handleDateClick = () => {
        if(!this.state.dateInput) return
        axios.post('/api/date', {type: this.state.dateInput}).then(response =>{

            this.setState({
                date: response.data,
                dateInput: ''

        })
        
        })
    }

    // generateExerciseJSX = (exercises) => {
    //     return exercises.map(exercise => <Single key={exercise.id} delete={this.removeAnExercise} exercises={exercise} changer = {this.replaceLift} />);
    //   } 
    
  

    render(){
        let filteredWeight = this.state.weight.map((element, index)=>{
            return <WeightData key={index} data={element} />
            
        })

        let filteredDate = this.state.date.map((element, index)=>{
            return <DateData key={index} data={element} />
        })
        
        return(
            <div className="weightTrackerChild">
                <h1>Weight Tracker</h1>
                
                <input value={this.state.weightInput} placeholder='weight' onChange = {e=>this.handleWeightChange(e.target.value)} type="text"/>
                <button onClick = { this.handleWeightClick } >Add Weight</button>
                <input value={this.state.dateInput} placeholder='date' onChange = {e=>this.handleDateChange(e.target.value)} type="text"/>
                <button onClick = { this.handleDateClick } >Add Date</button>
                
                    <br/>
                   <div className = "weightDisplay">
                     <div> {filteredWeight} </div>
                      <div>{filteredDate}   </div>
                   </div>
            </div>
        )
    }
}

export default WeightTracker