import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props)

    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeDuration = this.onChangeDuration.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onSubmitExercise = this.onSubmitExercise.bind(this)

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
            username: res.data[0].username
          })
        }
      })
  }

  onChangeUserName(evt) {
    this.setState({ username: evt.target.value })
  }

  onChangeDescription(evt) {
    this.setState({ description: evt.target.value })
  }

  onChangeDuration(evt) {
    this.setState({ duration: evt.target.value })
  }

  onChangeDate(date) {
    this.setState({ date: date })
  }

  onSubmitExercise(evt) {
    evt.preventDefault()

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    }

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))

    window.location = '/'
  }

  render() {
    return (
      <div>
        <h3 className="title">Create New Exercise Log</h3>

        <form onSubmit={this.onSubmitExercise}>
          <div className="form-group">
            <label>Username:</label>
            <select
              required
              ref="userInput"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}>
              {
                this.state.users.map(user => {
                  return <option key={user} value={user}>{ user }</option>
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes):</label>
            <input
              required
              min="0"
              type="number"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}
