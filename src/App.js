import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

import Single from './components/Single';
import LineEdit from './components/LineEdit';

import { ToastContainer, toast } from 'react-toastify';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

import WeightTracker from './components/WeightTracker/WeightTracker';


const API = 'f22291e2a1011a753b99bd9feff89777';

class App extends Component {
  constructor() {
    super()
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
      exerciseList: [],
      input:'',
      editLift: '',
      newLift: ''
    }
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=${API}`);
    const data = await api_call.json();    
    console.log(data);
    if(city && country){
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ''

    })
  }else{
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: 'Please enter location'
    })
  }
}

  handleChange = (value) => {
    this.setState({
      input: value
    })
  }
  
  handleClick = () => {
    axios.post('/api/exercises', {type: this.state.input}).then(response => {
      this.setState({
        exerciseList: response.data,
        input: ''
      })
  })
  
  }


  getExercises = () => {
    axios.get('/api/exercises').then(response => {
      this.setState({exerciseList: response.data})
      toast.success('Go get ripped')
    }).catch(err => {
      toast.error('error! no workout today...go watch Netflix')
    })
    
  }

  removeAnExercise = (id) => {
    axios.delete(`/api/exercises/${id}`).then(response => {
      this.setState({
        exerciseList: response.data
    })
      }).catch(err=>toast.error("Error deleting exercise"))
    
    }
   
    generateExerciseJSX = (exercises) => {
      return exercises.map(exercise => <Single key={exercise.id} delete={this.removeAnExercise} exercises={exercise} />);
    } 

    handleEditChange = (value) =>{
      this.setState({
        editLift: value
      })
    }

    handleNewLift = (lift) =>{
      this.setState({
        newLift: lift
      })
    }

    replaceLift = (type) =>{
      axios.put(`/api/exercises/${type}`).then(response => {
        this.setState({ 
        exerciseList: response.data
      }) 
        }).catch(err=>toast.error("Error updating exercise"))
      
    
  }
    generateLiftChangeJSX = (lifts) =>{
      return lifts.map((lift) => <LineEdit key = { lift.id } customLift = { this.state.newLift } modify = {this.state.replaceLift} lifts = {lift} /> )
    }
  
  render() {
    
    return (

      <div className="App">
      
          <h4><Titles/></h4>
          <h4><Form getWeather={this.getWeather}/></h4>
          <h4><Weather 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}

          /></h4>
          
          <h1>Exercise Plan</h1>
          <ToastContainer />
          <div className="Add">
             <input value = {this.state.input} onChange = { e => this.handleChange(e.target.value) } type="text"/>
            
            
             <button onClick = {this.handleClick} >Add to Standard Lifts</button>
          
          </div>
          <div>
            <input value={this.state.editLift} onChange = {e => this.handleEditChange(e.target.value)} type="text"    />
            <input onChange = {e => this.handleNewLift(e.target.value)} type="text"    />
            <button onClick = { this.replaceLift } >Edit Lift</button>
          </div>
          <div>
            <button onClick = { this.getExercises } >Standard Barbell Lifts</button>
          </div>
          
          {this.generateExerciseJSX(this.state.exerciseList)}
          {this.generateLiftChangeJSX(this.state.exerciseList)}
          <div><WeightTracker /></div>

      </div>
    );
  }
}

export default App;
