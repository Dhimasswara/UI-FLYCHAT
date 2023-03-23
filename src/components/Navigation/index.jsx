import React from 'react'
import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMessage, faUser } from '@fortawesome/free-regular-svg-icons'
import brand from '../../assets/logo/Brand.png'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
  return (
    <>
      <div className={`bg-main-dark d-md-flex flex-column align-items-center justify-content-between d-none ${style.Leftside}`}>
        <div className="logo top-0">
          <img src={brand} alt="" width={120} height={100} />
        </div>
        <div className="">
          <div class="nav flex-column nav-pills gap-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button class="nav-link  active" id="v-pills-message-tab" data-bs-toggle="pill" data-bs-target="#v-pills-message" type="button" role="tab" aria-controls="v-pills-message" aria-selected="false"><FontAwesomeIcon icon={faMessage} className='fs-4' /></button>
            <button class="nav-link" id="v-pills-notif-tab" data-bs-toggle="pill" data-bs-target="#v-pills-notif" type="button" role="tab" aria-controls="v-pills-notif" aria-selected="false"><FontAwesomeIcon icon={faBell} className='fs-4' /></button>
            <button class="nav-link" id="v-pills-setting-tab" data-bs-toggle="pill" data-bs-target="#v-pills-setting" type="button" role="tab" aria-controls="v-pills-setting" aria-selected="false"><FontAwesomeIcon className='fs-4 mb-5' icon={faGear} /></button>
          </div>
        </div>
      </div>


      <div className={`bg-main-dark d-flex d-md-none justify-content-center ${style.RightSide}`}>
          <div class="nav nav-pills gap-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile"    aria-selected="true"><FontAwesomeIcon icon={faUser} className='fs-4' /></button>
            <button class="nav-link  active" id="v-pills-message-tab" data-bs-toggle="pill" data-bs-target="#v-pills-message" type="button" role="tab" aria-controls="v-pills-message" aria-selected="false"><FontAwesomeIcon icon={faMessage} className='fs-4' /></button>
            <button class="nav-link" id="v-pills-notif-tab" data-bs-toggle="pill" data-bs-target="#v-pills-notif" type="button" role="tab" aria-controls="v-pills-notif" aria-selected="false"><FontAwesomeIcon icon={faBell} className='fs-4' /></button>
          </div>
        </div>

    </>
  )
}

export default Navigation