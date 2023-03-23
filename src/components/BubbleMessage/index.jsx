import React from 'react'
import admin from '../../assets/profile/admin.png'
import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColonSign, faEllipsis, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const BubbleMessage = ({ body, reciver, receiver_id, time, handleDelete, handleEdit }) => {
    return (
        <>
            <div className={receiver_id === reciver ? ` ${style.right} d-flex position-relative mt-2` : ` ${style.left} d-flex position-relative mt-2`}>
                <img src={admin} alt="" width={40} height={40} className={receiver_id === reciver ? `d-none` : `align-self-end`} />
                <div className={receiver_id === reciver ? `${style.boxMessage} d-flex align-items-center justify-content-center flex-row-reverse` : `${style.boxMessage} d-flex  align-items-center justify-content-center`}>
                    <p className={receiver_id !== reciver ? style.message : style.messageRight}>{body}</p>
                    <span className={receiver_id === reciver ? 'dropstart ms-2 mb-3' : 'dropstart ms-2 mb-3' || receiver_id !== reciver ? 'd-none' : 'd-block'}>
                        <a type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item m-0 text-danger" onClick={handleDelete}>Delete</a></li>
                                <li><p className="dropdown-item m-0" onClick={handleEdit} >Edit</p></li>
                            </ul>
                    </span>
                </div>
                

                <p className={receiver_id === reciver ? `position-absolute ${style.dateRight}` : `position-absolute ${style.date}`}>{time}</p>
            </div>

        </>

    )
}

export default BubbleMessage


{/* <span className="btn-group dropstart">
                        <a type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Menu item</a></li>
                            <li><a className="dropdown-item" href="#">Menu item</a></li>
                            <li><a className="dropdown-item" href="#">Menu item</a></li>
                        </ul>
                    </span> */}