import {Link} from 'react-router-dom'
import './index.css'

const Courses = props => {
  const {coursesItem} = props
  const {id, name, logoUrl} = coursesItem

  return (
    <div>
      <Link to={`/courses/${id}`}>
        <li className="items">
          <img src={logoUrl} alt={name} className="logo-url" />
          <p className="course-name">{name}</p>
        </li>
      </Link>
    </div>
  )
}
export default Courses
