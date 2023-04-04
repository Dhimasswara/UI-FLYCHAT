import React from 'react'
import admin from '../../assets/profile/admin.png'
import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColonSign, faEllipsis, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useGetUserProfileQuery } from '../../features/auth/authApi'

const BubbleGroup = ({ sender, time, message }) => {

    const {data: user} = useGetUserProfileQuery()

    return (
        <>
            <div className={sender === user?.fullname ? ` ${style.right} d-flex position-relative mt-2` : ` ${style.left} d-flex position-relative mt-2`}>
                <img src={admin} alt="" width={40} height={40} className={sender === user?.fullname ? `d-none` : `align-self-end`} />
                <div className={sender === user?.fullname ? `${style.boxMessage} d-flex align-items-center justify-content-center flex-row-reverse` : `${style.boxMessage} d-flex  align-items-center justify-content-center`}>
                    <div className={sender === user?.fullname ?  style.messageRight : style.message}>
                        <div className="d-grid justify-content-between">
                        <div className="head">
                            <span className='sender-name'>{sender}</span>
                            <p className='m-0'>{message}</p>
                        </div>
                        <div className="bottom justify-content-end">
                            <p className='time-sender'>{time.slice(0,4)}</p>
                        </div>
                        </div>

                    </div>
                    {/* <span className={sender === user?.fullname ? 'dropstart ms-2 mb-3' : 'dropstart ms-2 mb-3' || sender === user?.username ? 'd-none' : 'd-block'}>
                        <a type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item m-0 text-danger" onClick={handleDelete}>Delete</a></li>
                                <li><p className="dropdown-item m-0" onClick={handleEdit} >Edit</p></li>
                            </ul>
                    </span> */}
                </div>
            </div>
        </>

    )
}

export default BubbleGroup


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