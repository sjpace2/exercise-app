import React from 'react';

import WeightData from './WeightData'
import DateData from './DateData'

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
        this.setState({
            weight: [...this.state.weight, this.state.weightInput ],
            weightInput: ''
        }) 
         
    }

    handleDateClick = () => {
        this.setState({
            date: [...this.state.date, this.state.dateInput],
            dateInput: ''
        })
    }

    render(){
        let filteredWeight = this.state.weight.map((element, index)=>{
            return <WeightData key={index} data={element} />
            
        })

        let filteredDate = this.state.date.map((element, index)=>{
            return <DateData key={index} data={element} />
        })
        
        return(
            <div>
                <h1>Weight Tracker</h1>
                <input value={this.state.value} placeholder='weight' onChange = {e=>this.handleWeightChange(e.target.value)} type="text"/>
                <button onClick = { this.handleWeightClick } >Add Weight</button>
                <input value={this.state.value} placeholder='date' onChange = {e=>this.handleDateChange(e.target.value)} type="text"/>
                <button onClick = { this.handleDateClick } >Add Date</button>
                

                <br/>
                {filteredWeight}
                {filteredDate}
                
            </div>
        )
    }
}

export default WeightTracker