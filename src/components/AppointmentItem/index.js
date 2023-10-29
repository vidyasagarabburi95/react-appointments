import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, title, date, isFavourite} = appointmentDetails

  const dateFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const likedImage = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starredTheAppointment = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  return (
    <li className="list-item">
      <div className="list-container">
        <div className="title-star">
          <p>{title}</p>
          <button
            type="button"
            onClick={starredTheAppointment}
            className="star-button"
            data-testid="star"
          >
            <img src={likedImage} alt="star" className="small-image" />
          </button>
        </div>
        <p className="date">
          <span>Date:</span> {dateFormat}
        </p>
      </div>
    </li>
  )
}

export default AppointmentItem
