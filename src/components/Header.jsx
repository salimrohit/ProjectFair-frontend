import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { logoutResponseContext } from '../context/ContextShare';



function Header() {

  const {authorToken, setAuthorToken} = useContext(logoutResponseContext)

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("exisitingUser")
    sessionStorage.removeItem("token")
    setAuthorToken(false)
    navigate('/')
  }


  return (
    <div>
       <Navbar style={{backgroundColor:'lightseagreen'}}>
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand className='fs-3'><FontAwesomeIcon icon={faStackOverflow} />{' '}
              Project Fair
            </Navbar.Brand>
          </Link>
          <button onClick={handleLogout} className='btn btn-warning ms-auto'>LogOut</button>
        </Container>
      </Navbar>
      
    </div>
  )
}

export default Header
