import style from './CardDetail.module.css'



 // El detalle debe mostrar id, imagen, nombre, altura, peso, Temperamentos, años de vida

const CardDetail = ({ id, name, image, Temperaments, minWeight, maxWeight, minHeight, maxHeight, lifeSpan, createdInDb }) => {



return (
    <div className={style.CardDetailConteiner}>
        <div className={style.CardDetail}>
            <img className={style.imagen} src={image} alt={name}  />
        <p className={style.raza}>{name}</p>
            <br />
            <div className={style.tituloContainer}>
        <h4 className={style.titulo}>ID:</h4>
        <p>{id}</p>
            </div>
            <div className={style.tituloContainer}>
        <h4 className={style.titulo}>Temperament:</h4>
        {Temperaments?.map(t => {
                    return (<p key={t.name}>{t.name }</p>)
        })}
            </div>
            <div className={style.tituloContainer}>
        <h4 className={style.titulo}>Height:</h4>
        <p>Min. Height: {minHeight}</p>
        <p>Max. Height: {maxHeight}</p>
            </div>

            <div className={style.tituloContainer}>
        <h4 className={style.titulo}>Weight:</h4>
        <p>Min. Weight: {minWeight} Kilos</p>
        <p>Max. Weight: {maxWeight} Kilos</p>

            </div>

            <div>
        <h4 className={style.titulo}>LifeSpan</h4>
        <p>{lifeSpan}</p>
            </div>
        </div>
    </div>
)
}


export default CardDetail;