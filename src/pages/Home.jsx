import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import projectimg1 from '../assets/projectimg.png'
import '../components/ProjectCard'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { HomeProjectApi } from '../services/allApi'

function Home() {
    const [isLogin,setIsLogin] = useState(false)

    const [project, setProject] = useState([])

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
        }
    },[])

    const getHomeProject = async() => {
        const result = await HomeProjectApi()
        setProject(result.data)

        
    }
    console.log(project);

    useEffect(()=>{
        getHomeProject()
    },[])







    return (
        <>
            <div style={{ width: '100%', height: '100vh', backgroundColor: 'lightseagreen' }}>
                <div className="container-fluid rounded">
                    <Row className='align-items-center p-5'>
                        <Col sm={12} md={6}>
                            <h1><FontAwesomeIcon icon={faStackOverflow} /> Project Fair</h1>
                            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptatem quod consequuntur quos!</p>
                            {isLogin? <Link to={'/dashboard'}><button className='btn btn-warning mt-3 text-dark'> Manage Project </button></Link>
                            :
                            <Link to={'/login'}><button className='btn btn-warning mt-3 text-dark'>Get Started</button></Link>}
                        </Col>

                        <Col sm={12} md={6}>
                            <img src={projectimg1} alt="" />
                        </Col>
                    </Row>
                </div>

            </div>

            <div className='mt-4'>
                <h1 className='text-center'>Explore our Project</h1>

                <marquee scrollmount={40}>
                    <div className='d-flex mt-5 mb-5'>
                        {
                            project?.length>0?
                            <div className='row'>
                                {project.map((item)=>(<div className='col-md-4'><ProjectCard proj={item} /></div>))}


                            </div>:null
                        }
                    
                        
                    </div>
                </marquee>

                <div className='text-center mb-4'>
                    <Link to={'/project'}>See more projects</Link>
                    </div>



            </div>
        </>
    )
}

export default Home
