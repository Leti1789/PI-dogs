import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBreed } from '../../redux/actions/actions';
import Loading from '../../components/Loading/Loading';
import { useEffect, useState } from 'react';
import CardDetail from '../../components/CardDetail/CardDetail'

import Navbar from '../../components/NavBar/NavBar';




const Detail = () => {

    const [loader, setLoader] = useState(false)

    const dispatch = useDispatch();

    let { id } = useParams();


    useEffect(() => {
        setLoader(true)
        dispatch(getDetailBreed(id, setLoader))
    }, [dispatch, id])



    const detailDog = useSelector((state) => state.details)
    

    // El detalle debe mostrar id, imagen, nombre, altura, peso, Temperamentos, años de vida



    return (
        
        <div>
            <Navbar /> <br />
            {loader && <Loading/>}

            {!loader && <CardDetail
                id={detailDog.id}
                image={detailDog.image}
                name={detailDog.name}
                minHeight={detailDog.minHeight}
                maxHeight={detailDog.maxHeight}
                minWeight={detailDog.minWeight}
                maxWeight={detailDog.maxWeight}
                Temperaments={detailDog.Temperaments}
                lifeSpan={detailDog.lifeSpan}
            />}
            
            </div>
        
)
}



export default Detail;