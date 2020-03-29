import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: "",
            
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value // target is the textbox, value is the value in the textbox
        })
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username
            
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
             .then(res => console.log(res.data))
             .catch(err => console.log(err))

        this.setState({
            username: ""
        })
    }
    render() {
        return(
            <div>
                <h3>Create new exercise log</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <input ref = "userInput"
                                required
                                className = "form-control"
                                defaultValue = {this.state.username}
                                onChange = {this.onChangeUsername}/>
                                
                    </div>

                    <div className = "form-group"> 
                        <input type = "submit" value = "Create user"
                                className = "btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}