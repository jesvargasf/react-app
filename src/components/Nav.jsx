import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/react.svg'

function Nav() {
    return <nav>
        <img src={logo} />

        <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><a>Quienes Somos</a></li>
            <li><Link to='/productos'>Productos</Link></li>
            <li><a>Contacto</a></li>
        </ul>
    </nav>
}

export default Nav;
