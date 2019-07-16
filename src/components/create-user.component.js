import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props)

    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onSubmitUser = this.onSubmitUser.bind(this)

    this.state = {
      username: ''
    }
  }

  onChangeUserName(evt) {
    this.setState({ username: evt.target.value })
  }

  onSubmitUser(evt) {
    evt.preventDefault()

    const user = {
      username: this.state.username
    }
    console.log(user)

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data))

    this.setState({ username: '' })
  }

  render() {
    return (
      <div>
        <h3 className="title">Create New Exercise Log</h3>

        <form onSubmit={this.onSubmitUser}>
          <div className="form-group">
            <label>Username:</label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Create user" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}
