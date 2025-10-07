import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Nav from '../components/Nav';

function Home() {
    const [count, setCount] = useState(0);

    const increment =() => {
        setCount(count + 1);
    };

    useEffect(() => {
        console.log("iniciado")
    }, [count]);

    return <>
        <Nav></Nav>

        <Main titulo="Este es el sitio home" contador={count} aumentar={increment}></Main>

        <button onClick={increment}>Aumentar {count}</button>

        <Footer></Footer>
    </>
}

export default Home;