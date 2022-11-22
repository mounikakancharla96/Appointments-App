import './index.css'

const AppointmentItem = props => {
  const {eachAppointmentDetails, checkStar} = props

  const {id, title, date, isStarred} = eachAppointmentDetails

  const checkStarredStatus = () => {
    checkStar(id)
  }

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list">
      <div className="title-image">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={checkStarredStatus}
          testid="star"
        >
          <img src={starImageUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
