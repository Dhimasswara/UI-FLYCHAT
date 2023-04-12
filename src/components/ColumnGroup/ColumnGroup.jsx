import style from './style.module.css'
import admin from '../../assets/profile/admin.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import {  faPaperclip} from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useRef } from "react"
import { useGetUserProfileQuery } from '../../features/auth/authApi'
import BubbleGroup from '../BubbleGroup'
import { v4 as uuidv4 } from "uuid";


const ColumnGroup = ({room, socket }) => {

  const scrollRef = useRef();
  const [username, setUsername] = useState();
  const [group, setGroup] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const {data: user} = useGetUserProfileQuery()
  console.log(user?.fullname);


  useEffect(() => {
    socket.emit("join-room", { room: room, username: user?.fullname });
    setUsername(user?.fullname);
    setGroup(room);
  }, []);

  useEffect(() => {
    if(socket){
      socket.off("newMessage")
      socket.on("newMessage", (data) => {
          setMessages((current) => [...current, data]);
        })
        socket.on("notifAdmin", (data) => {
          setMessages((current) => [...current, data]);
        })
    }
  }, [socket]);


  const handleSendMessage = (e )=>{
    e.preventDefault()

    let dataMessage ={
      sender: username,
      body: message,
      room: group
    }
    console.log(dataMessage);
    socket.emit('messageRoom', dataMessage)
    setMessage('')
  }

  console.log(messages);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  return (
    <div className={` px-3 ${style.column} bg-main-dark`} id='hellos'>
      <div className={`${style.header} border-bottom border-secondary justify-content-between d-flex align-items-center`}>
        <span className='d-flex align-items-center'>
          {/* <img crossOrigin='anonymouse' src={admin} width={50} height={50} alt="" /> */}
          <div className="name text-light">
            <p className='m-0 fs-5 fw-bolder ms-3'>{room}</p>
          </div>
        </span>
      </div>

      <div className={` ${style.content} pt-2 text-light`}>

        
          {messages?.map(data => (
            <div ref={scrollRef} key={uuidv4()} >
              <BubbleGroup
              sender={data?.sender}
              time={data?.date}
              message={data?.body}
              />
            </div>
          ))}
    

      </div>

      <div className={style.SendText}>
        <div className={` ${style.boxText} d-flex `}>
          <form onSubmit={(e) => handleSendMessage(e)} className={`${style.formStyle} position-relative`}>
            <a className={`position-absolute ${style.iconFile} `}><FontAwesomeIcon icon={faPaperclip} /> </a>
            <input type="text" class={`form-control position-relative ${style.inputText}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='type text here' autoComplete='off' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type='submit' className={`position-absolute ${style.sendButton}`}><FontAwesomeIcon icon={faPaperPlane} /> </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ColumnGroup