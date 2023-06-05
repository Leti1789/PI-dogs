import CardsContainer from '../../components/CardsContainer/CardsContainer';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBreeds } from '../../redux/actions/actions';



function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBreeds());
    }, [dispatch])


return (
    <div>
    
        <NavBar /><br />
        <CardsContainer/>
    </div>
)
}

export default Home;