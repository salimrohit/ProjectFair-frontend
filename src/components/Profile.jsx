import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import pfp from '../assets/user-profile-icon.png'
import { Collapse } from 'react-bootstrap'
import { BASE_URL } from '../services/baseUrl'
import { ToastContainer, toast } from 'react-toastify'
import { updateProfileApi } from '../services/allApi'


function Profile() {
    const [open, setOpen] = useState(false);
    const [existingImage, setExistingImage] = useState("")
    const [preview, setPreview] = useState("")
    const [update,setUpdate] = useState(false)

    const [userProfile, setUserProfile] = useState({
        username: "",
        emailId: "",
        password: "",
        profile: "",
        github: "",
        linkedIn: ""
    })
    console.log(userProfile);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('existingUser'))
        console.log(user);
        setUserProfile({ ...userProfile, username: user.username, emailId: user.mailId, password: user.password, github: user.github, linkedIn: user.linkedIn })

        //if there is any uploaded image 
        setExistingImage(user.profile)

    }, [update])

    useEffect(() => {
        console.log(userProfile.profile);

        userProfile.profile &&
            setPreview(URL.createObjectURL(userProfile.profile)) //to convert the image to url

    }, [userProfile.profile])
    console.log(preview);

    const handleUpdate = async(e) => {
        e.preventDefault()

        const { username, emailId, password, profile, github, linkedIn } = userProfile

        if (!github || !linkedIn) {
            toast.info('Please fill the form completely')
        }
        else {
            const reqBody = new FormData()
            //to add data to the body - use append() - can add only one item
            //append() = add
            reqBody.append("username", username)
            reqBody.append("emailId", emailId)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedIn", linkedIn)
            preview ? reqBody.append("profile", profile) : reqBody.append("profile", userProfile.profile)
            const token = sessionStorage.getItem("token")

            if (preview) { //upload
                const reqHeader = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`  //bearer - no other credential/document is required to verify the request holder 
                }

                const result = await updateProfileApi(reqBody,reqHeader)
                if(result.status==200){
                    toast.success('Profile updated successfully')
                    setUpdate(true)
                    sessionStorage.setItem("exisitingUser",JSON.stringify(result.data))
                }

            }
            else {//no upload
                const reqHeader = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                const result = await updateProfileApi(reqBody,reqHeader)
                if(result.status==200){
                    toast.success('Profile updated successfully')
                    setUpdate(true)
                    sessionStorage.setItem("exisitingUser",JSON.stringify(result.data))

                }
            }
            
        }
    }





    return (
        <div className='border p-4 shadow rounded'>
            <div className='d-flex justify-content-between'>
                <h3>Profile</h3>
                <button onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)} className='btn btn-outline-info'>{open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</button>
            </div>
            <Collapse in={open}>
                <div className="row p-3 text-center mt-4">
                    <label htmlFor="profile">
                        <input id='profile' type="file" style={{ display: 'none' }} onChange={(e) => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                        {existingImage == "" ?
                            <img src={preview ? preview : pfp} width={'200px'} height={'200px'} alt="" />
                            :
                            <img src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} width={'200px'} height={'200px'} alt="" />
                        }
                    </label>
                    <input type="text" placeholder='Git Hub' value={userProfile.github} onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} className='form-control mt-4 mb-3' />
                    <input type="text" placeholder='LinkedIn' value={userProfile.linkedIn} onChange={(e) => setUserProfile({ ...userProfile, linkedIn: e.target.value })} className='form-control mt-2 mb-3' />
                    <button onClick={(e) => handleUpdate(e)} className='btn btn-success w-100 fs-6' style={{ fontWeight: '500' }}>Update</button>

                </div>
            </Collapse>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />


        </div>
    )
}

export default Profile
