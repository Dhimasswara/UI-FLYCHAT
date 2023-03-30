import robot from '../../assets/logo/robot.gif'
import { useGetUserProfileQuery } from "../../features/auth/authApi";

const Welcome = () => {
  const {data} = useGetUserProfileQuery()

  const besar = data?.fullname.charAt(0).toUpperCase()
  const kecil = data?.fullname.slice(1)

  return (
    <div className="text-light d-flex my-auto justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="row">
            <div className="col text-center">
                <img src={robot} alt="" />
                <h1 className="mt-0">Welcome, <span className="text-blue">{besar+kecil || ''}</span></h1>
                <p className="mt-0">Tap your contact to start chat</p>
            </div>
        </div>
    </div>  
  )
}

export default Welcome