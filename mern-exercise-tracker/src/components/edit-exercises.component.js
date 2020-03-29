import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            description: '',
            duration: 0, // since number
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/exercise/" + this.props.match.params.id)
             .then(response => {
                 this.setState({
                     username: response.data.username,
                     description: response.data.description,
                     duration: response.data.duration,
                     date: new Date(response.data.date)
                 })
             })
             .catch(err => console.error(err))
        axios.get("http://localhost:5000/users/")
             .then(response => {
                 if (response.data.length > 0) {
                     this.setState({
                         users: response.data.map(user => user.username)
                         
                     })
                 }
             })
        }
    

    onChangeUsername(e){
        this.setState({
            username: e.target.value // target is the textbox, value is the value in the textbox
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value // target is the textbox, value is the value in the textbox
        })
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value // target is the textbox, value is the value in the textbox
        })
    }

    onChangeDate(date){
        this.setState({
            date: date // date param shows a calendar
        })
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
             .then(res => console.log(res.data))
             .catch(err => console.log(err))


        // window.location = "/"
    }


    render() {
        return(
            <div>
                <h3>Edit exercise log</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <select ref = "userInput"
                                required
                                className = "form-control"
                                defaultValue = {this.state.username}
                                onChange = {this.onChangeUsername}>
                                    {
                                        this.state.users.map(function(user){
                                            return <option
                                            key = {user}
                                            value = {user} > {user}
                                            </option>
                                        })
                                    }
                                </select>
                    </div>

                    <div className = "form-group">
                        <label>Description</label>
                        <input type = "text"
                                required
                                className = "form-control"
                                defaultValue = {this.state.description}
                                onChange = {(e) => this.onChangeDescription(e)} />
                    </div>

                    <div className = "form-group">
                        <label>Duration (minutes)</label>
                        <input type = "text"
                                required
                                className = "form-control"
                                defaultValue = {this.state.duration}
                                onChange = {(e) => this.onChangeDuration(e)}/>
                    </div>

                    <div className = "form-group">
                        <label>Date</label>
                        <div>
                            <DatePicker /* Pops up a calendar*/
                                selected = {this.state.date}
                                // onSelect = {this.state.onChangeDate}
                                onChange = {(e) => this.onChangeDate(e)}
                                time = {false}
                                />
                        </div>
                    </div>

                    <div className = "form-group"> 
                        <input type = "submit" value = "Edit Exercise Log"
                                className = "btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}