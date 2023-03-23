import style from './style.module.css'
import admin from '../../assets/profile/admin.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faBars, faPaperclip, faPhone} from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useRef } from "react"
import BubbleMessage from '../BubbleMessage'
import { v4 as uuid } from 'uuid';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import { useGetUserByIdQuery } from '../../features/user/userApi'
import ModalVertikal from '../ModalProfileUser/ModalProfile'

const ColumnMessage = ({ receiver_id, socket }) => {
  
  const scrollRef = useRef();
  const bottomRef = useRef(null);
  const input = useRef(null)
  const token = localStorage.getItem('token')
  const [messages, setMessages] = useState([])
  const [profile, setProfile] = useState({})
  const [message, setMessage] = useState()
  const [me, setMe] = useState({})
  const [isUpdate, setIsUpdate] = useState(false)
  const [fixId, setId] = useState()

  const { data: users } = useGetUserByIdQuery(receiver_id)

  const fetchMessage = async (token, receiver_id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (receiver_id) {
      try {
        const result = await axios.get(process.env.REACT_APP_BACKEND_API + '/message/' + receiver_id, config)
        setMessages(result.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteMessage = async (id) => {
    // console.log(id);
    console.log(messages);
    setMessages(messages.filter((data) => {
      return data.id !== id
    }))
    // console.log(messages);
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      const result = await axios.delete(process.env.REACT_APP_BACKEND_API + '/message/' + id, config)
      console.log(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMe = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      const result = await axios.get(process.env.REACT_APP_BACKEND_API + '/profile', config)
      setMe(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProfile = async (receiver_id) => {
    try {
      const result = await axios.get(process.env.REACT_APP_BACKEND_API + '/user/' + receiver_id)
      setProfile(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMessage = async (e) => {
    e.preventDefault()
    if (isUpdate) {
      try {
        await addMessage(message, fixId)
        setIsUpdate(false)
        setMessage('')
      } catch (error) {
        console.log(error)
      }
    } else {
      const body = message
      const sender_id = me.id_user
      const now = new Date();
      const current = now.getHours() + ':' + now.getMinutes();
      socket.emit('sendMessage', { receiver_id, sender_id: sender_id, body, time: current })
    }
  }

  useEffect(() => {
    setMessages([])
    fetchMessage(token, receiver_id)
    fetchProfile(receiver_id)
    fetchMe(token)
  }, [receiver_id])


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = async (message, id) => {
    if (id) {
      messages.map((data) => {
        if (data.id === id) {
          data.body = message
        }
      })
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const data = {
        body: message
      }
      try {
        const result = await axios.put(process.env.REACT_APP_BACKEND_API + '/message/' + id, data, config)
        console.log(result.data.data)
        setIsUpdate(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        delete message.sender_id
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        const result = await axios.post(process.env.REACT_APP_BACKEND_API + '/message/add', message, config)
        const id = result.data.data.id
        console.log('id message = ' + id)
        return id
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleEditMessage = (id) => {
    messages.map(data => {
      if (data.id === id) {
        setMessage(data.body)
        input?.current?.focus()
        setIsUpdate(true)
      }
    })
  }

  useEffect(() => {
    if (socket) {
      socket.off('incoming')
      socket.on('incoming', async (message) => {
        console.log('new Message coming')
        console.log(message)
        if ((message.sender_id === me.id_user && message.receiver_id === receiver_id) || (message.sender_id === receiver_id && message.receiver_id === me.id_user)) {
          const id = uuid()
          message.id = id
          setMessages((current) => [...current, message])
          if (message.sender_id === me.id_user) {
            await addMessage(message)
          }
        }
        setMessage('')
      })
    }
  }, [socket, addMessage, receiver_id])



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className={`px-5 ${style.column}`}>
      <div className={`${style.header} border-bottom border-secondary justify-content-between d-flex align-items-center`}>
        <span className='d-flex align-items-center'>
          <img crossOrigin='anonymouse' src={users?.photo !== undefined ? users?.photo : admin  } width={50} height={50} alt="" />
          <div className="name text-light">
            <p className='m-0 fs-5 fw-bolder ms-3'>{users?.username}</p>
          </div>
        </span>
        <span className='text-dark bg-dark'>
          <div class="btn-group dropstart text-dark ">
            <a type="button" class="" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faBars} />
            </a>
            <ul class="dropdown-menu bg-dark">
              <li><a class="dropdown-item" href="#"><FontAwesomeIcon icon={faPhone} className='me-3'/>Call</a></li>
              <li><a class="dropdown-item" href="#"><ModalVertikal idUser={receiver_id}/></a></li>
            </ul>
          </div>
        </span>
      </div>

      <div className={` ${style.content} pt-5 text-light`}>

        {messages?.map(data => (
          <div ref={scrollRef} key={uuidv4()} >
            <BubbleMessage
              id={data?.id}
              body={data?.body}
              receiver_id={data?.receiver_id}
              reciver={receiver_id}
              time={data.time}
              handleDelete={(e) => handleDeleteMessage(data.id)}
              handleEdit={(e) => { handleEditMessage(data.id); setId(data.id) }}
            />
          </div>
        ))}
      </div>

      <div className={style.SendText}>
        <div className={` ${style.boxText} d-flex `}>
          <form onSubmit={(e) => handleMessage(e)} className={`${style.formStyle} position-relative`}>
            <button disabled className={`position-absolute ${style.iconFile} `}><FontAwesomeIcon icon={faPaperclip} /> </button>
            <input type="text" class={`form-control position-relative ${style.inputText}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='type text here' autoComplete='off' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type='submit' className={`position-absolute ${style.sendButton}`}><FontAwesomeIcon icon={faPaperPlane} /> </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ColumnMessage