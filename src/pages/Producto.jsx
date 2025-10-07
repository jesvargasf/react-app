import { useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function Producto() {

    const { id } = useParams();

    const urlParams = new URLSearchParams(useLocation().search);

    
    return <>
        <Nav></Nav>

        <h2>Este es el detalle del producto</h2>
        <p>Detalle del producto con id: {id}</p>
        <p>Detalle del producto con nombre: {urlParams.get("nombre")}</p>

        <Footer></Footer>
    </>
}

export default Producto;