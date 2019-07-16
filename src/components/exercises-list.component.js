import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => (
  <tr>
    <td>{ props.exercise.username }</td>
    <td>{ props.exercise.description }</td>
    <td>{ props.exercise.duration }</td>
    <td>{ props.exercise.date.substring(0, 10) }</td>
    <td>
      <Link className="btn btn-warning" to={ '/edit/' + props.exercise._id }>edit</Link> | <button className="btn btn-danger" onClick={ () => { props.deleteExercise(props.exercise._id) } }>delete</button>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props)

    this.onDeleteExercise = this.onDeleteExercise.bind(this)

    this.state = {
      exercises: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises')
      .then(res => {
        this.setState({
          exercises: res.data
        })
      }).catch(error => console.log(error))
  }

  onDeleteExercise(id) {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))

      this.setState({
        exercises: this.state.exercises.filter(el => el._id !== id)
      })
  }

  exerciseList() {
    return this.state.exercises.map(exercise => {
      return <Exercise exercise={ exercise } deleteExercise={ this.onDeleteExercise } key={ exercise._id } />
    })
  }

  render() {
    return (
      <div>
        <h3 className="title">Logged exercises <span role="img" aria-label="smiling face">😊</span></h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
