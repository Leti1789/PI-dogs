//? Este componente debe tomar un array y por cada elemento renderizar un componente card

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import style from "./CardsContainer.module.css"
import { useState } from "react";
import Paginado from "../Paginado/Paginado";
import { filterTemp, filterOrigin, alphaOrderAZ, alphaOrderZA, weightOrderMin, weightOrderMax, getAllBreeds } from '../../redux/actions/actions'






const CardsContainer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBreeds());
    }, [dispatch])


    //* Estados globales

    const dogs = useSelector(state => state.dogs)

    const temperaments = useSelector(state => state.temperaments);

    //! estado local

    const [order, setOrder] = useState("")





        //? Paginado
    const [pagina, setPagina] = useState(1);
    

    let cantidadPorPagina = 8

    const maximo = Math.ceil(dogs.length / cantidadPorPagina);

    const currentPage = dogs.slice((pagina-1) * cantidadPorPagina, (pagina-1) * cantidadPorPagina + cantidadPorPagina)

    //? Funciones handlers

    //! Filtro por temperamento

    const handleChangeFilterTemp = (event) => {
        dispatch(filterTemp(event.target.value))
    }
    


    //? Filtro por origen
        const handleChangeOrigin = (event) => {
            dispatch(filterOrigin(event.target.value))
    }


    
    //* Ordenamiento alfabetico

    const handleChangeOrder = (event) => {
        const { value } = event.target;
        if (value === 'A-Z') {
            dispatch(alphaOrderAZ(value))
            setOrder(`ordenado${event.target.value}`)
        }
        else if (value === 'Z-A') {
            dispatch(alphaOrderZA(value))
            setOrder(`ordenado${event.target.value}`)
        }
    }

    //!Ordenamiento por peso max/min
    const handleChangeOrderWeight = (event) => {
        const { value } = event.target;
        if (value === 'min_weight') {
            dispatch(weightOrderMin(value))
            setOrder(`ordenado${event.target.value}`)
        }
        else if (value === 'max_weight') {
            dispatch(weightOrderMax(value))
            setOrder(`ordenado${event.target.value}`)
        }
    }
    

    return (

        <>
        
            <div className={style.containerCards}>
                
                <div className={style.containerFilter}>
    

                    <div className={style.orderAlfa}>
                        <select onChange={(event) =>handleChangeOrder(event)} name="Por orden alfabetico">
                            <option disabled selected defaultValue>
                            Alphabetical order
                            </option>
                            <option value='A-Z'>A-Z</option>
                            <option value='Z-A'>Z-A</option>

                        </select>
                    </div> 

                    <div className={style.orderWeight}>
                        <select name="por peso" onChange={(event)=> handleChangeOrderWeight(event)}>
                            <option disabled selected defaultValue>
                            Filter by weight
                            </option>
                            <option value="max_weight">Max</option>
                            <option value="min_weight">Min</option>

                        </select>
                        </div>

                        <div className={style.temperament}>
                        <select name="temperaments" onChange={handleChangeFilterTemp}>
                        <option disabled selected defaultValue>
                            Temperaments
                            </option>
                            <option value="ALL">
                                All Temperaments
                            </option>
                                {
                                    temperaments?.map(temp => (
                                        <option value={temp.name} key={temp.id}> {temp.name} </option>
                                                    ))}
                            </select>
                    </div>
                    
                    <div className={style.origen}>
                        <select name='origen' onChange={handleChangeOrigin}>
                        <option disabled selected defaultValue>
                            Origen
                            </option>
                                        <option value="all">All</option>
                                        <option value="db">Only DB</option>
                                        <option value="api">Only API</option>
                                        </select>
                                        </div>
                </div>
                
                <div className={style.containerDogs}>
                    {currentPage.length !== 0?
                        currentPage.map(dog =>(
                            <div className={style.dogContainer} key={dog.id}>
                            <Card
                            id={dog.id}
                            key= {dog.id}
                            name={dog.name}
                            image={dog.image}
                            Temperaments={dog.Temperaments}
                            minWeight={dog.minWeight}
                            maxWeight={dog.maxWeight}
                            />
                    </div>
        )): <Loading/>}
            </div>

                <div className={style.containerPaginado}>
                    <Paginado
                pagina={pagina}
                setPagina={setPagina}
                maximo={maximo}/>
            </div>
            
                
                </div>
            </>  
)
}

export default CardsContainer;