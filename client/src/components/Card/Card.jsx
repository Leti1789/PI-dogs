//* Este componente debe mostrar la info de cada elemento del array mapeado pero ademas darnos un link para ir al detalle de cada elemento

import style from './Card.module.css'
import {Link} from 'react-router-dom'


const Card = ({id, name, image, Temperaments, minWeight, maxWeight, minHeight, maxHeight, lifeSpan, createdInDb }) => {
    
    return (
            <div className={style.cardConteiner}>
            <div className={style.card}>
                
                <img className={style.imagen} src={image} alt={name} />
                <Link className={style.linkNombre} to={`/detail/${id}`}>
                <p>{name}</p>
                </Link>

                <br />
                <div className={style.containerTitulo}>
                <h3 className={style.titulo}>Temperament:</h3>
                {Temperaments?.map(t => {
                    return (<p key={t.name}>{t.name }</p>)
                })}
                </div>
                <div className={style.containerTitulo}>
                <h3 className={style.titulo}>Weight:</h3>
                <p>Min. weight: {minWeight} kilos</p>
                <p>Max. weight: {maxWeight } kilos</p>
                </div>
            </div>

            </div>
        )
        
    }
    
export default Card;