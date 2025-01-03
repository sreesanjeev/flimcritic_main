import logo from '../assets/logo.png'
import './components.css'
import {useNavigate} from 'react-router-dom'

function Header(){

    const navigate = useNavigate()
    return(
        <div className="header">
            <div className='wrapper'>
                <div className="logo" style={{cursor:'pointer'}}>
                    <img src={logo} onClick={()=>(navigate('/home'))} alt="" />
                </div>
                <nav >
                   <a onClick={()=>(navigate(`/`))}>Logout</a>
                </nav>
            </div>
        </div>
    )
}

export default Header