import PropTypes from 'prop-types'
import Button from './Button'

import {FaTasks} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'



const Header = ({title, showAddTask, showAdd}) => {
  const location = useLocation()
   
  return (
    <header className="header"> <FaTasks  style={{width:'30px', height:'30px'}}/>
        <h1 > {title} </h1>
       { location.pathname === '/'  && ( <Button
        color= {showAdd ? 'red' : 'green'}
        text= {showAdd ? 'Close' : 'Add'} 
        onClick={showAddTask}
        />)}

    </header>
  )
}


// css in js
// const headingStyle = {
//     color:'red',
//     padding: '7px',
//     backgroundColor:'black'
// }

export default Header
