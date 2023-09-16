import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {
 
    const [bebidas, setBebidas] = useState([])
    const [modal, setModal] = useState(false)
    const [bebidaId, setBebidaId] = useState(null)
    const [receta, setReceta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [cargaSpinner, setCargaSpinner] = useState(false)

    useEffect(() => {
        setCargando(true)
        const obtenerReceta = async () => {
            if(!bebidaId) return

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`

                const data = await axios(url)
                setReceta(data.data.drinks[0])
            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false)
            }
        }
        obtenerReceta()
    }, [bebidaId])

    const consultarBebida = async datos => {
        setCargaSpinner(true)
        try {
            // const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

            // const { data } = await axios(url)
            // setBebidas(data.drinks)

            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}`

            const { data } = await axios(url)
            const drinks = data.drinks

            const filteredDrinks = []
            for (let drink of drinks) {
                // Obtener el id de la bebida
                const idBebida = drink.idDrink

                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idBebida}`

                const { data } = await axios(url)

            // Obtener la categoría de la bebida
            const category = data.drinks[0].strCategory

            // Comparar la categoría con la que quieres
            if (category === datos.categoria) {
                // Si coincide, agregar la bebida al arreglo filtrado
                filteredDrinks.push(drink)
            }
            }
            // Guardar las bebidas filtradas en el state
            setBebidas(filteredDrinks);


            } catch (error) {
                console.log(error)
                
            } finally {
                setCargaSpinner(false)
            }
    }

    const handleModalClick = () => {
        setModal(!modal)
    }

    const handleBebidaIdClick = id => {
        setBebidaId(id)
    }

    return (
        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaIdClick,
                receta,
                cargando,
                cargaSpinner
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}
export default BebidasContext