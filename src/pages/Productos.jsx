import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Nav from "../components/Nav";

function Productos() {
    return <>
        <Nav></Nav>

        <Main titulo="Este es el sitio de productos"></Main>
        
        <div>
            <h2>Listado de productos</h2>
            <ul>
                <li>Producto 1 <Link to="/producto/1?nombre=cocacola">Coca cola</Link> </li>
                <li>Producto 2 <Link to="/producto/2?nombre=pepsi"> Pepsi</Link> </li>
                <li>Producto 3 <Link to="/producto/23?nombre=fanta">Fanta</Link> </li>
            </ul>
        </div>

        <Footer></Footer>

    </>
}

export default Productos;