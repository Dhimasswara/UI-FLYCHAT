import React from 'react'
import admin from '../../assets/profile/admin.png'
import style from './style.module.css'

const CardMessage = ({onclick, lastMessage, lastTime, key, name, selected, photo}) => {
  
  return (
        <div className="card d-flex align-items-start justify-content-center text-start bg-main-dark mb-2" style={{ maxWidth: '100%'}}>
          <ul onClick={onclick} class={`list-group list-group-flush ${style.parentUl} `} >
            <li className={selected? `list-group-item d-flex bg-success text-light` : `list-group-item d-flex bg-main-dark text-light`}>
              <img crossOrigin='anonymous' src={photo === undefined ? admin : photo === null ? admin : photo.length < 0 ? admin : photo} width={50} height={50} alt="" />
              <div className={`content ms-3 ${style.parentText}`}>
                <div className={`d-flex justify-content-between`}>
                  <p className='p-0 m-0 fw-bold'>{name}</p>
                  <span className='text-end' style={{ fontSize: '12px' }}>{lastTime}</span>
                </div>
                <p className={`p-0 m-0 ${style.textWrapMax}`}>{lastMessage.slice(0,25)}</p>
              </div>
            </li>
          </ul>
        </div>
  )
}

export default CardMessage