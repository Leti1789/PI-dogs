import { Link } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    return (
    <div className={style.landingContainer}>
    <div className={style.titulo}>
        <h1>Welcome dog lovers!</h1><br />
    </div>
    <div className={style.boton}>
    <Link to='/home'>
            <button><span>get in</span></button>
        </Link>   
    </div>
            
    </div>
)
}

export default Landing;