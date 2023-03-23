import React from 'react'
import { useState, useEffect } from 'react'
import style from './style.module.css'
import admin from '../../assets/profile/admin.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBiohazard, faCamera, faPhoneAlt, faRightFromBracket, faUserAlt, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { useGetUserProfileQuery } from '../../features/auth/authApi'
import { useUpdateUserByIdMutation } from '../../features/user/userApi'
import {showLoading, failedLoading} from '../../common/loadingHandler'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../app/reducer/authSlice'


const Setting = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data: user, isSuccess} = useGetUserProfileQuery()
  const [updateProfile, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate}] = useUpdateUserByIdMutation()
  const [selectedFile, setSelectedFile] = useState();
  const id  = user?.id_user;

  const [data, setData] = useState({
    username: '',
    fullname: '',
    phone: '',
    bio: '',
    photo: user?.photo
  });

  const changeHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setData((prev) => {
        let item = {};
        for (let attr in data) {
          item = { ...item, [attr]: user[attr] };
        }
        return item;
      });
    }
  }, [isSuccess]);

  

  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    for (let attr in data) {
      formData.append(attr, data[attr]);
    }
    await updateProfile({ id , data: formData });
  };

  
  useEffect(() => {
    if(isSuccessUpdate) Swal.fire({
      title: 'Update success',
      icon: 'success',
    });
    if(isErrorUpdate) failedLoading('Update Failed!')
    if(isLoadingUpdate) showLoading('Please wait...')
  }, [isSuccessUpdate, isLoadingUpdate, isErrorUpdate])

  const selectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        photo: e.target.files[0],
      };
    });
  };

  const logoutHandler = async (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You wanna logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logout',
          'success'
        )
        dispatch(logout())
        navigate('/login')
      }
    })
    
  };
  
  return (
    <div className={`p-md-4 py-4 text-light text-center ${style.box}`}>
      <div className='w-100 '>
        <div className="header mb-5 text-start">
          <h4>Profile</h4>
        </div>
        <form onSubmit={(e)=> handleUpdate(e)}>
        <span className=''>
            <img src={user?.photo || admin} width={120} height={120} alt="" />
            <label htmlFor="input" className='position-relative'>
              <span className={style.buttonImg}>
                <FontAwesomeIcon icon={faCamera} className='py-1 px-1' />
              </span>
              <input type='file' name='photo' onChange={selectFile} id='input' className='d-none' />
            </label>
          
        </span>


        <div className="description mt-5">

          <div class="mb-3 text-start">
            <label for="exampleFormControlInput1" class="form-label text-muted"><FontAwesomeIcon icon={faUserAlt} className='me-2'/>Username</label>
            <input 
            type="text" 
            name='username' 
            value={data.username} 
            class={`${style.formControl} form-control border-none`}  placeholder="name@example.com"
            onChange={(e)=>changeHandler(e)}
            />
          
          </div>
          <div class="mb-3 text-start">
            <label for="exampleFormControlInput1" class="form-label text-muted"><FontAwesomeIcon icon={faUserAstronaut} className='me-2'/>Fullname</label>
            <input 
            type="text" 
            name='fullname' 
            value={data.fullname} 
            class={`${style.formControl} form-control border-none`}
            placeholder="name@example.com"
            onChange={(e)=>changeHandler(e)}
            />
          </div>
          <div class="mb-3 text-start">
            <label for="exampleFormControlInput1" class="form-label text-muted"><FontAwesomeIcon icon={faPhoneAlt} className='me-2'/>Phone</label>
            <input 
            type="text" 
            class={`${style.formControl} form-control border-none`} name='phone' 
            value={data.phone}
            placeholder="name@example.com"
            onChange={(e)=>changeHandler(e)}
            />
          </div>
          <div class="mb-3 text-start">
            <label for="exampleFormControlInput1" class="form-label text-muted"><FontAwesomeIcon icon={faBiohazard} className='me-2'/>Bio</label>
            <input 
            type="text" 
            class={`${style.formControl} form-control border-none`} 
            name='bio' value={data.bio} 
            placeholder="name@example.com"
            onChange={(e)=>changeHandler(e)}
            />
          </div>

          <div className="d-grid">
            <button type='submit' className='btn bg-main-green text-light'>Update</button>
          </div>
        </div>
        </form>
      </div>

      <div className={`logout w-100 mt-5 d-flex justify-content-between align-items-center p-3 ${style.logout}`} onClick={(e)=> logoutHandler(e)}>
        <p className='text-start m-0'>Logout</p>
        <div><FontAwesomeIcon icon={faRightFromBracket} style={{color: '#d55865'}}/></div>
      </div>
    </div>
    
  )
}

export default Setting