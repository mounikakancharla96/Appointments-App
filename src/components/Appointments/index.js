import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentsList: [], isFilter: false}

  changeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  changeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  submitData = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  checkStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  filterAppointments = () => {
    const {isFilter} = this.state
    this.setState({isFilter: !isFilter})
  }

  getFilteredList = () => {
    const {isFilter, appointmentsList} = this.state
    if (isFilter) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilter} = this.state

    const filterName = isFilter ? 'filter-filled' : 'filter-empty'

    const filteredList = this.getFilteredList()

    return (
      <div className="container">
        <div className="card">
          <h1 className="appointment-heading">Add Appointment</h1>
          <div className="variation">
            <form className="form-container" onSubmit={this.submitData}>
              <div className="labels">
                <label className="label-title" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  className="inputs"
                  onChange={this.changeTitleInput}
                  placeholder="Title"
                />
              </div>
              <div className="labels">
                <label className="label-title" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  className="inputs"
                  onChange={this.changeDateInput}
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <div className="adding-appointment className="appointment-name">Appointments</h>
              <button
                type="button"
                className={`starred-button ${filterName}`}
                onClick={this.filterAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-lists">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  eachAppointmentDetails={eachAppointment}
                  checkStar={this.checkStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
