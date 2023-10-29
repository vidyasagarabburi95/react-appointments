// Write your code here
import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  forTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  forDate = event => {
    this.setState({dateInput: event.target.value})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavourite: !eachAppointment.isFavourite}
        }
        return eachAppointment
      }),
    }))
  }

  showStarredItems = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  renderStarredAppointments = () => {
    const {appointmentsList} = this.state
    const starredAppointments = appointmentsList.filter(
      appointment => appointment.isFavourite,
    )
    return starredAppointments.map(appointment => (
      <AppointmentItem
        key={appointment.id}
        appointmentDetails={appointment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  renderAppointments = () => {
    const {appointmentsList} = this.state
    return appointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: dateInput,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentsList, isFilterActive} = this.state
    console.log(appointmentsList)
    const buttonActive = isFilterActive ? 'active' : 'star'
    return (
      <div className="bg-con">
        <div className="second-bg-con">
          <div className="form">
            <div>
              <form onSubmit={this.addAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <div>
                  <label htmlFor="title">TITLE</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    onChange={this.forTitle}
                    value={titleInput}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="time">DATE</label>
                  <br />
                  <input
                    type="date"
                    id="time"
                    placeholder="dd/mm/yyyy"
                    onChange={this.forDate}
                    value={dateInput}
                  />
                </div>
                <br />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointment-starred-section">
            <h1 className="appointments">Appointments</h1>
            <button
              type="button"
              onClick={this.showStarredItems}
              className={buttonActive}
            >
              starred
            </button>
          </div>
          <ul className="appointment-section">
            {isFilterActive
              ? this.renderStarredAppointments()
              : this.renderAppointments()}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
