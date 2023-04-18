import React from 'react'
import Navigation from '../../components/Navigation'
import ColumnMessage from '../../components/ColumnMessage'
import Settings from '../../components/Settings/Setting'
import Welcome from '../../components/Welcome/Welcome'
import { useGetAllUserQuery } from '../../features/user/userApi'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBroadcastTower, faSearch, faUserFriends, } from '@fortawesome/free-solid-svg-icons'
import style from './style.module.css'
import CardMessage from '../../components/CardMessage'
import { useGetUserProfileQuery } from '../../features/auth/authApi'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../app/reducer/authSlice'
import { useNavigate } from 'react-router-dom'
import JoinGroup from '../../components/ModalJoinGroup/JoinGroup'
import CardMessageGroup from '../../components/CardMessageGroup'
import ColumnGroup from '../../components/ColumnGroup/ColumnGroup'



const LayoutChat = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [find, setFind] = useState('');
  const { data: user } = useGetAllUserQuery({ find })
  const { data: userLogin, isSuccess } = useGetUserProfileQuery()
  const [receiveId, setReceiverId] = useState(undefined);
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState(undefined)
  console.log(room);



  useEffect(() => {
    const result = io(process.env.REACT_APP_BACKEND_API)
    setSocket(result)
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('entry user');
      console.log(userLogin);
      if (userLogin) {
        socket.emit('present', userLogin.id_user)
      }
      socket.on('online', data => {
        console.log('reaching user online');
        dispatch({ type: 'UPDATE_ONLINE', payload: data })
      })
    }
  }, [socket, userLogin]);

  useEffect(() => {
    if (!user) {
      dispatch(setCredentials({
        user: userLogin,
        token: localStorage.getItem('token')
      }))
    }
  }, [user, isSuccess])

  function enterHandlerSearch(e) {
    if (e.code == 'Enter') {
      navigate(`/?search=${find}`);
    }
  }

  function click() {
    const clicked = document.querySelector('#hello')
    const clickeds = document.querySelector('#hellos')
    clicked.classList.add('d-none')
    clickeds.classList.remove('d-none')
  }

  function clicks() {
    const clicked = document.querySelector('#hello')
    const clickeds = document.querySelector('#hellos')
    clicked.classList.remove('d-none')
    clickeds.classList.add('d-none')

  }


  return (
    <div className='container-fluid template-content'>
      <div className="row">
        <Navigation />
        <div className="col-12 col-md-3 bg-main-grey bg-md-primary text-light" style={{ height: '100vh', overflow: 'hidden' }}>
          <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-message" role="tabpanel" aria-labelledby="v-pills-message-tab">
              <div className={`p-md-4 py-4 text-light ${style.boxMessage} d-md-block`} id='hello'>
                <div className="header mb-5">
                  <div className="option d-flex justify-content-between align-items-center">
                    <h4 className='m-0'>Chats</h4>
                    <div className="btn-group">
                      <a type="button" className="" data-bs-toggle="dropdown" aria-expanded="false" href={'#'}>
                        <FontAwesomeIcon icon={faBars} style={{ color: 'white', fontSize: '20px' }} />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" type="button"> <FontAwesomeIcon icon={faMessage} className='me-2' />New message</button></li>
                        <li><button className="dropdown-item" type="button"><JoinGroup /></button></li>
                        <li><button className="dropdown-item" type="button"><FontAwesomeIcon icon={faBroadcastTower} className='me-2' />Broadcast</button></li>
                      </ul>
                    </div>
                  </div>
                  <div className="position-relative mt-4">
                    <form className="d-flex position-relative">
                      <input
                        className="form-control me-2 pe-5 position-absolute"
                        type="search"
                        name='search'
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => setFind(e.target.value)}
                        onKeyDown={enterHandlerSearch}
                      />
                      <p className={style.iconSearch}><FontAwesomeIcon icon={faSearch} color='black' /> </p>
                    </form>
                  </div>
                </div>

                <div className="margin-top-cs">
                  
                  <div className="d-grid">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{width: '100% !important' , textAlign: 'center !important'}}>
                    <li className="nav-item " role="presentation" style={{width: '50% !important'}}>
                      <button className="nav-link active nav-nav" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Chat</button>
                    </li>
                    <li className="nav-item " role="presentation" style={{width: '50% !important'}}>
                      <button className="nav-link nav-nav" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Group</button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        {user?user.filter(fil => fil.id_user !== userLogin?.id_user).map(data => ((
                        <CardMessage onclick={()=> {setReceiverId(data?.id_user); click()}} name={data.fullname} lastTime={data.lastTime} lastMessage={data.lastMessage} key={data?.id_user} selected={data?.id_user === receiveId} photo={data.photo} />
                      ))) : ( <p>No user</p> ) }
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                       <CardMessageGroup className='btn btn-primary' onclick={()=> setRoom('Pijar')} />
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <div className='d-block d-md-none'>
              <ColumnMessage receiver_id={receiveId} socket={socket} clicks={clicks} />
              </div>
              
            </div>
            <div class="tab-pane fade" id="v-pills-notif" role="tabpanel" aria-labelledby="v-pills-notif-tab"><span><h4 className='p-4'>Notification</h4></span></div>
            <div class="tab-pane fade" id="v-pills-setting" role="tabpanel" aria-labelledby="v-pills-setting-tab"><Settings /></div>
          </div>
        </div>
        <div className="col d-none d-md-block bg-main-dark" style={{ height: '100vh !important', overflow: 'hidden' }} >
          {/* {receiveId === undefined ? 
                <Welcome />
             : 
                <ColumnMessage receiver_id={receiveId} socket={socket}/>
             
            }   */}

            {/* {receiveId === undefined ? 
                <Welcome />
             : room === undefined ? <Welcome/> : receiveId !== undefined ? 
                <ColumnMessage receiver_id={receiveId} socket={socket}/>
             : room !== undefined
             
            }   */}

          {receiveId === undefined && room === undefined ? <Welcome/> : receiveId !== undefined ? <ColumnMessage receiver_id={receiveId} socket={socket}/> : room === 'Pijar' ?
          <ColumnGroup socket={socket} room={room} /> : ''
          }

          {/* {room === undefined ? <Welcome /> : <ColumnGroup socket={socket} room={room} />} */}
        </div>
      </div>
    </div>

  )
}

export default LayoutChat