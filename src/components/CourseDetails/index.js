import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    courseDetails: null,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getCourseDetails(id)
  }

  getCourseDetails = async id => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.course_details.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleRetry = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getCourseDetails(id)
  }

  renderCourseDetails = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <>
        <div>
          <div>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
                alt="website logo"
              />
            </Link>
            <img src={imageUrl} alt={name} className="image" />
            <h1 className="heading">{name}</h1>
            <p className="paragraph">{description}</p>
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={this.handleRetry}>Retry</button>
      </div>
    </>
  )

  renderLoader = () => (
    <>
      <Header />
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}
export default withRouter(CourseDetails)
