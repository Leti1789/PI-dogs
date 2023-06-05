import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getTemperaments, getAllBreeds, getDogByBreed} from '../../redux/actions/actions'
import {useEffect, useState} from 'react'

import style from './NavBar.module.css'

const Navbar = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTemperaments())
        dispatch(getAllBreeds())
    }, [dispatch])



    const [name, setName] = useState("")

    const handleInputChange = (event) => {
        setName(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getDogByBreed(name))
    }



return (
    <>

    <div className={style.nav}>

            <div className={style.logo}>
                <Link to="/home" className={style.linkLogo}>
                <h1>Dogs</h1>
                </Link>
            </div>
            
            <div className={style.searchBar_box}>
            <input onChange={(event) => handleInputChange(event)} type='search' placeholder="Search a breed!"></input>
            <button type="submit" onClick ={(event) => handleSubmit(event)}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>

        <div className={style.navLinks}>
            <li className={style.navItems}>
            <Link className={style.link} to="/home">
                Home
            </Link>
            </li>
            <li className={style.navItems}>
            <Link className={style.link} to="/create">Create</Link>
            </li>
            </div>
 </div>
 </>)

}

export default Navbar;
