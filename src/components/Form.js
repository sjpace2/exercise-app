import React from 'react';

class Form extends React.Component {
    render(){
        return(
            <form onSubmit={this.props.getWeather}>
                <input name='city' placeholder='City...' type="text"/>
                <input name='country' placeholder='Country...'type="text"/>
                <button>Get Weather</button>
            </form>
        )
    }
}

export default Form