import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import { addProjectResponseContext } from '../context/ContextShare';




function AddProject() {

  const {setAddProjectResponse} = useContext(addProjectResponseContext)

  //state to create store token
  const [token, setToken] = useState("")
  //state to hold the details of the project 
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })
  console.log(projectDetails);

  //state used to store the url of the file
  const [preview, setPreview] = useState("")

  //state to change the value of 'key' attribute in the input tag in line number 86 (to be able to upload the same image after click on the 'cancel' button)
  const [key, setKey] = useState(false)

  useEffect(() => {
    projectDetails.projectImage ?
      setPreview(URL.createObjectURL(projectDetails.projectImage)) //to convert the file into URL
      :
      setPreview("")

  }, [projectDetails.projectImage])

  //function to reset

  const Reset = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")
    setKey(!key)
  }

  //to get token from session storage
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))

    }

  }, [])
  console.log(token);

  //function to add project   
  const handleAdd = async (e) => {
    e.preventDefault()  

    const { title, language, github, website, overview, projectImage } = projectDetails
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info('Please fill the form completely')
    }
    else {
      //request body - formdata class object
      //if your request contains uploaded content, then the body has to be sent in the form of formdata
      //1) create an object for formData class
      const reqBody = new FormData()
      //to add data to the body - use append() - can add only one item
      //append() = add
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage)

      //request header
      if (token) {
        const reqHeader = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`  //bearer - no other credential/document is required to verify the request holder 
        }
        //api call
        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        if (result.status == 200) {
          handleClose()
          setAddProjectResponse(result.data)
          toast.success('project uploaded succeffully')
        }
        else {
          toast.error(result.response.data)
          handleClose()
        }
      }
 
    }
  }






  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    Reset()
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <div >
        <button onClick={handleShow} className='btn btn-success'>Add Project</button>
      </div>

      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="img">
                <input type="file" key={key} id='img' style={{ display: 'none' }} /* value={projectDetails.projectImage} (no need for this attribute as the type is not 'text') */ onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} /> {/* its 'e.target.value' whenever the type attribute is 'text' and 'e.target.files' when the type attribute is 'file', index is 0 as the file is stored in the 0th index of 'e.target.files' */}
                <img src={preview ? preview : "https://i.pinimg.com/originals/82/50/eb/8250ebbe710fdc11dc3332e02ad7cf42.jpg"} alt="" className='w-100' />
              </label>
            </div>
            <div className="col-md-6">
              <div className="mt-3 mb-3">
                <input type="text" placeholder='Project Title' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} className='form-control' />
              </div>

              <div className="mt-3 mb-3">
                <input type="text" placeholder='Language' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} className='form-control' />
              </div>

              <div className="mt-3 mb-3">
                <input type="text" placeholder='Github link' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} className='form-control' />
              </div>

              <div className="mt-3 mb-3">
                <input type="text" placeholder='Website link' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} className='form-control' />
              </div>

              <div className="mt-3 mb-3">
                <textarea cols='30' rows='3' type="text" placeholder='Overview' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} className='form-control' />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={Reset}>
            Cancel
          </Button>
          <Button variant='success' onClick={handleAdd}>
            Add
          </Button>

        </Modal.Footer>
      </Modal>

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>
  )
}

export default AddProject
