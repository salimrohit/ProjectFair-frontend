import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'



function Footer() {
    return (
        <div>
            <div className="row p-5" style={{ backgroundColor: 'lightseagreen' }}>
                <div className="col-md-4">
                    <h2><FontAwesomeIcon icon={faStackOverflow} /> Project Fair</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste adipisci cum expedita eius libero sint itaque nulla reprehenderit impedit iure, tenetur neque distinctio totam, debitis consequatur. Itaque est voluptas quod!</p>

                </div>
                <div className="col-md-2">
                    <h2 className='ms-3'>Links</h2>
                    <ul style={{ listStyle: 'none' }}>
                        <Link to={'/'}><li>Home</li></Link>
                        <Link><li>Login</li></Link>
                        <Link><li>Register</li></Link>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h2 className='ms-3'>Guides</h2>
                    <ul style={{ listStyle: 'none' }}>
                        <li>React</li>
                        <li>React Bootstrap</li>
                        <li>Bootswatch</li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h2>Contact Us</h2>
                    <div className="d-flex mt-4">
                        <input className='form-control' type="text" placeholder='Enter Mail ID' />
                        <button className='btn btn-warning ms-3' >Subscribe</button>
                    </div>
                    <div className='mt-3 d-flex justify-content-between'>
                        <FontAwesomeIcon icon={faInstagram} size='2x' />
                        <FontAwesomeIcon icon={faFacebook} size='2x' />
                        <FontAwesomeIcon icon={faTwitter} size='2x' />
                        <FontAwesomeIcon icon={faLinkedin} size='2x' />

                    </div>


                </div>
            </div>



        </div>
    )
}

export default Footer
