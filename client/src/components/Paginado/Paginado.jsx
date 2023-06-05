import { useState } from 'react';
import style from './Paginado.module.css'

const Paginado = ({ pagina, setPagina, maximo }) => {
    

    const [input, setInput] = useState(1);

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPagina(parseInt(pagina)+ 1)
    }

    const prevPage = () => {
        setInput(parseInt(input) - 1);
        setPagina (parseInt(pagina) - 1)
    }




    const onKeyDown = (event) => {

        if (event.keyCode === 13) {
            setPagina(parseInt(event.target.value))
            if (parseInt(event.target.value < 1 ||
                parseInt(event.target.value > Math.ceil(maximo) ||
                isNaN(parseInt(event.target.value))))) {
                setPagina(1)
                setInput(1)
                
            } else {
                setPagina(parseInt(event.target.value))
            }
        }
        
    }


    const onChange = (event) => {
        setInput(event.target.value)
}


    return (
        <div className={style.container}>
            <button className={style.botonPaginado} disabled={pagina === 1 || pagina < 1}  onClick={prevPage}><i class="fa-sharp fa-solid fa-arrow-left"></i></button>
            <input className={style.inputPaginado} onChange={(event) => onChange(event)} onKeyDown={(event) => onKeyDown(event) } name='page'autoComplete='off' value={input}/>
            <p>De {maximo}</p>
            <button className={style.botonPaginado} disabled={pagina === Math.ceil(maximo)   || pagina > Math.ceil(maximo)} onClick={nextPage}><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
        </div>
    )


}

export default Paginado;
