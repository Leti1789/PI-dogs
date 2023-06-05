import {useState, useEffect} from 'react';
// import {  useHistory } from 'react-router-dom'; 
import { getTemperaments, postDog } from '../../redux/actions/actions'
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/NavBar/NavBar'
import style from '../Form/Form.module.css'







const Form = () => {

    const dispatch = useDispatch();

    const temperaments = useSelector(state => state.temperaments)

    //Nombre, altura(diferenciar entre altura maxima y minima), peso (diferenciar entre peso maximo y minimo), años de vida, posibilidad de agregar varios temperamentos en simultaneo, boton para crear la nueva raza, validaciones con javascript
    



    //* Estados locales
    const [input, setInput] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        lifeSpan: "",
        image: "",
        temperament: []
    })

    const [errors, setErrors] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        lifeSpan: "",
        image: "",
        temperament: '',
    })

    const [button, setButton] = useState(true)


    const validInputs = Object.values(input).every(Boolean)
    
//! use effect
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    useEffect(() => {
        validInputs? setButton(false):setButton(true)
    }, [input, setButton, validInputs])




    //* funciones handlers
    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        
        })
        setErrors(validate({
            ...input,
            [event.target.name] : event.target.value
        }))

        console.log(input)
        
    }




    const handleSelect = (event) => {
        setInput({
            ...input,
            temperament: [...input.temperament, event.target.value]
        })
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postDog(input))
        alert("Perro creado exitosamente!")
        setInput({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        lifeSpan: "",
        image: "",
        temperament: []
        })
    }

    const handleDelete = (e) => {
        const toDelete = e.target.innerText

        setInput({
            ...input,
            temperament: input.temperament.filter((e) => e !== toDelete)
            

        })
    }



    //? funcion validadora


    const validate = (input) => {
        //? Input name
        let nameRegex = /^[a-zA-Z]{4,12}$/;
        if (!input.name) errors.name = "name is a required field"
        else if (!nameRegex.test(input.name)) errors.name = "charaters length [4,12]"
        else errors.name = '';
        
        //* Input minHeight

        if (!input.minHeight) errors.minHeight = "Min. Height is a required field"
        else if (input.minHeight <= 0) errors.minHeight = "Must be above zero"
        else if (parseInt(input.minHeight) > parseInt(input.maxHeight)) errors.minHeight = "minHeight cannot be greater than the maxHeight"
        else errors.minHeight = '';

        //? Input maxHeight

        if (!input.maxHeight) errors.maxHeight = "Max. Height is a required field"
        else if (input.maxHeight <= 0) errors.maxHeight = "Must be above zero"
        else if (parseInt(input.maxHeight) < parseInt(input.minHeight)) errors.minHeight = "maxHeight cannot be less than the minHeight"
        else errors.maxHeight = '';
        
        //* input minWeight

        if (!input.minWeight) errors.minWeight = "Min. Height is a required field"
        else if (input.minWeight <= 0) errors.minWeight = "Must be above zero"
        else if (parseInt(input.minWeight) > parseInt(input.maxWeight)) errors.minHeight = "minWeight cannot be greater than the maxWeight"
        else errors.minWeight = '';

        //? input maxWeight

        if (!input.maxWeight) errors.maxWeight = "Min. Height is a required field"
        else if (input.maxWeight <= 0) errors.minWeight = "Must be above zero"
        else if (parseInt(input.maxWeight) < parseInt(input.minWeight)) errors.minHeight = "maxWeight cannot be less than the minWeight"
        else errors.maxWeight = '';

        //* input lifeSpan

        let lifeSpanRegex = /^\d+-\d+$/;

        if (!input.lifeSpan) errors.lifeSpan = "life Span is a required field"
        else if (!lifeSpanRegex.test(input.lifeSpan)) errors.lifeSpan = 'field with this format "[min-max]"'
        else errors.lifeSpan = '';
        
        //? input image

        let imageRegex = /\bhttps?:\/\/\S+\.(png|jpg|jpeg|gif)\b/i


        if (!input.image) errors.image = "Image is a required field"
        else if (!imageRegex.test(input.image)) errors.image = "Must be an image link"
        else errors.image = ''
        

        //* input temperament

        if (input.temperament.length > 4) errors.temperament = "maximum 5 temperaments"
        else errors.temperament = '';
        
        return errors; 
    }




//! renderizado del furmulario

    return (

        <>
            <Navbar /><br />
            <div className={style.container}>

            <div className={style.imagenForm}>

            </div>

            <div className= {style.ContainerForm}>
                    <form onSubmit={(event) => handleSubmit(event)}>
                    <h2>Add a new race!🐶</h2><br/>
                <div className={style.inputDiv}>
                    <label htmlFor='name'>Race</label><br/><br/>
                <input
                    onChange={handleInputChange}
                    name="name"
                    type="text"
                    placeholder="Name..."
                    value={input.name}
                    className={errors.name && style.errors}
                        />
                        <br/>
                        <span>{errors.name ? errors.name : "" }</span>

                </div><br/>
                    
                <div className={style.inputDiv}>
                    <label htmlFor='minHeight'>Min. height</label><br/><br/>
                    <input
                    onChange={handleInputChange}
                    name="minHeight"
                    type="text"
                    placeholder="Min. Height..."
                    value={input.minHeight}
                        />
                        <br/>
                        <span>{errors.minHeight ? errors.minHeight : "" }</span>
                    </div><br/>

                <div className={style.inputDiv}>
                    <label htmlFor='maxHeight'>Max. height </label><br/><br/>
                    <input
                onChange={handleInputChange}
                name="maxHeight"
                type="text"
                placeholder="Max. Height..."
                value={input.maxHeight}
                        />
                        <br/>
                        <span>{errors.maxHeight ? errors.maxHeight : "" }</span>
                </div><br />
                
                <div className={style.inputDiv}>
                    <label htmlFor='minWeight'>Min. weight</label><br/><br/>
                    <input
                onChange={handleInputChange}
                name="minWeight"
                type="text"
                placeholder="Min. Weight..."
                value={input.minWeight}
                        />
                        <br/>
                        <span>{errors.minWeight ? errors.minWeight : "" }</span>
                </div><br />
                
                <div className={style.inputDiv}>
                <label htmlFor='maxWeight'>Max. weight</label><br/><br/>
                    <input
                onChange={handleInputChange}
                name="maxWeight"
                type="text"
                placeholder="Max. Weight..."
                value={input.maxWeight}
                        />
                        <br/>
                        <span>{errors.maxWeight ? errors.maxWeight : "" }</span>
                </div><br />

                <div className={style.inputDiv}>
                <label htmlFor='lifeSpan'>Life expectancy</label><br/><br/>
                        <input
                onChange={handleInputChange}
                name="lifeSpan"
                type="text"
                placeholder="Life span..."
                value={input.lifeSpan}
                        />
                        <br/>
                        <span>{errors.lifeSpan ? errors.lifeSpan : "" }</span>
                </div><br />

                <div className={style.inputDiv}>
                    <label htmlFor='image'>Image</label> <br/><br/>
                    <input
                onChange={handleInputChange}
                name="image"
                type="text"
                placeholder="Image URL..."
                value={input.image}
                        />
                        <br/>
                        <span>{errors.image ? errors.image : "" }</span>
                </div><br />

                <div>
                    <h3>Temperaments</h3><br/>
                <select
                onChange={handleSelect}
                name="temperament"
                id="temperament"
                disabled = {input.temperament.length === 5? true:false}        
                >
        <option disabled selected value="temperament">-Elige uno o mas-</option>
        {temperaments.map((e) => (
            <option value={e.name} key={e.id}>
            {e.name}
            </option>
        ))}
                </select>

                        
                <span>{ errors.temperament ? errors.temperament : "" }</span> 

                    </div><br />
                    <div>
                        <h3>Selected temperaments:</h3>
                    </div>
                    <br/>

                    <div className={style.containerTemp}>
                        {input.temperament.map(temp => 
                            <div  className={ style.tempElement} onClick={handleDelete}>
                                <span>{`${temp}`}</span>
                            </div>
                            )}
                    </div>
                    <br/>
                
                
                        <button type="submit"
                        disabled={button || input.temperament.length===0}
                        >Create new breed!</button>
                    </form>
                </div>
                </div>
            </>
)
}

export default Form;
