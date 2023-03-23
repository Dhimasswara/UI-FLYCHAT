import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './style.module.css'
import CardMessage from '../CardMessage'

const Message = () => {
    
    return (
        <div className={`p-md-4 py-4 text-light ${style.boxMessage}`}>
            <div className="header mb-5">
                <div className="option d-flex justify-content-between align-items-center">
                    <h4 className='m-0'>Chats</h4>
                    <div className="btn-group">
                        <a type="button" className="" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faBars} style={{color: 'white', fontSize: '20px'}}/>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><button className="dropdown-item" type="button">Action</button></li>
                            <li><button className="dropdown-item" type="button">Another action</button></li>
                            <li><button className="dropdown-item" type="button">Something else here</button></li>
                        </ul>
                    </div>
                </div>
                <div className="position-relative mt-4">
                    <form className="d-flex position-relative">
                        <input className="form-control me-2 position-absolute" type="search" placeholder="Search" aria-label="Search" />
                        <p className={style.iconSearch}><FontAwesomeIcon icon={faSearch} color='black' /> </p>
                    </form>
                </div>
            </div>

            <div className="margin-top-cs">
                <CardMessage/>
            </div>
        </div>
    )
}

export default Message