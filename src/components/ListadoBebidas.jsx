import { useState, useEffect } from "react"
import { Row } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Bebida from "./Bebida"
import Spinner from "./Spinner"


const ListadoBebidas = () => {
    const [firstLoad, setFirstLoad] = useState(true)
    const { bebidas, cargaSpinner } = useBebidas()

    useEffect(() => {
      if (cargaSpinner) {
        setFirstLoad(false)
      }
    }, [cargaSpinner])

  return (
    <>
    {cargaSpinner && <Spinner />}
    <Row className="mt-5">
    {cargaSpinner ? null : (bebidas.length === 0 && !firstLoad ? <h3>No drinks found, try a different drink/category combination</h3> : bebidas.map(bebida => (
    <Bebida
        key={bebida.idDrink}
        bebida={bebida}
    />
    )))}
    </Row>
    </>
  )
}

export default ListadoBebidas
