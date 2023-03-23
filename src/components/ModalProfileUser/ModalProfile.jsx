import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import style from './Modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useGetUserByIdQuery } from '../../features/user/userApi';
import admin from '../../assets/profile/admin.png'

function ModalVertikal(props) {
  const [modalShow, setModalShow] = useState(false);
  const {data} = useGetUserByIdQuery(props?.idUser)
  console.log(data);

  return (
    <>
      <a className={`${style.modal} my-2 `} onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faUserAlt} className='me-2'/> Profile
      </a>

      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={modalShow} onHide={() => setModalShow(false)}  >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-main-grey' >
          <div>
            <div className='text-center bg-dark p-5'>
              <img src={data?.photo || admin} alt="" width={150} height={150} />
              <span className='text-center text-light'>
                  <h1 className='text-light pt-4'>{data?.username !== undefined ? 'User' : data?.username}</h1>
                  <p className='m-0'>{data?.phone}</p>
                  <div className='bg-main-green w-100 h-25 mt-4 rounded p-3'>
                      <p className='text-start'>Bio :</p>
                      <h4 >{data?.bio === undefined ? data?.bio : 'Hello Everybody'}</h4>
                  </div>
              </span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>{/* <Button onClick={props.onHide}>Close</Button> */}</Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalVertikal;