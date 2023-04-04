import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import style from './Modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import { Link } from 'react-router-dom';

function JoinGroup(props) {
    const [modalShow, setModalShow] = useState(false);
    const {data}=useGetUserProfileQuery()
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    
    useEffect(() => {
    setName(data?.username)
    }, [data])
    
    return (
        <>
            <a className={`${style.modal} my-2 text-dark`} onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faUserAlt} className='me-2' />Join Group
            </a>

            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                </Modal.Header>
                <Modal.Body className=''>
                    <div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input 
                                type="text" 
                                readonly 
                                class="form-control-plaintext" 
                                id="staticEmail" 
                                value={name}
                                />
                                
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputRoom" class="col-sm-2 col-form-label">Room</label>
                            <div class="col-sm-10">
                                <input 
                                type="text" 
                                class="form-control" 
                                id="inputRoom"
                                value={room}
                                onChange={(e)=> setRoom(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="button d-grid">
                            <Link 
                            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                            to={`chatroom?name=${name}&room=${room}`} 
                            className='btn btn-success text-dark'>Join Room</Link>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className=''>{/* <Button onClick={props.onHide}>Close</Button> */}</Modal.Footer>
            </Modal>
        </>
    );
}

export default JoinGroup;