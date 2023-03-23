import React from 'react'
import style from './style.module.css'
import logo from '../../assets/logo/Brand.png'

const LayoutAuth = ({children, title}) => {
  return (
    <div className={`bg-main-dark ${style.main} d-grid`}>
        <div className="row justify-content-center align-items-center">
            <div className="col-10 col-md-6 col-lg-4 col-xl-3 text-light p-5 bg-main-grey rounded">
                <div className="header d-flex align-items-center justify-content-start mb-2">
                     <img src={logo} width={80} height={80} alt="" style={{marginLeft: '-25px'}}/>
                     <h4>FlyChat</h4>
                </div>
                <h4 className='mb-4 text-center'>{title}</h4>
               {children}
            </div>
        </div>
    </div>
  )
}

export default LayoutAuth