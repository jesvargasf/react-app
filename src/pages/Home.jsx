import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Nav from '../components/Nav';
import { getPacientes, guardarPaciente } from '../services/hospitalService';

function Home() {
    const [count, setCount] = useState(0);
    const [pacientes, setPacientes] = useState([]);

    const increment =() => {
        setCount(count + 1);
    };

    useEffect(() => {
        crearPacientesFetch();

        fetchData();
    }, []);

    const crearPacientesFetch = async () => {
        try {

            const response = await guardarPaciente({
                "nombre": "Juan",
                "apellido": "Perez",
                "run": "17.977.115-0",
                "direccion": "Pasaje Los Pinos 789",
                "fechaNacimiento": "1992-12-01",
                "correo": "jesus.vargas@example.com"
            });

            console.log("Paciente creado:", response);

        } catch (error) {
            console.error("Error creating pacientes in Home component:", error);
        }
    };    

    const fetchData = async () => {
        try {
            const data = await getPacientes();
            console.log("Pacientes data:", data);
            setPacientes(data);
        } catch (error) {
            console.error("Error fetching pacientes in Home component:", error);
        }
    };

    useEffect(() => {
        console.log("iniciado")
    }, [count]);

    return <>
        <Nav></Nav>

        {pacientes.length == 0 && (
            <div>cargando...</div>
        )}

        {pacientes.length > 0 && (
            <div>
                <h1>Listado de pacientes</h1>

                {pacientes.map((paciente) => (
                    <div key={paciente.id}>
                        <h2>{paciente.nombre} {paciente.apellido}</h2>
                    </div>
                ))}
            </div>
        )}

        <Main titulo="Este es el sitio home" contador={count} aumentar={increment}></Main>

        <button onClick={increment}>Aumentar {count}</button>

        <Footer></Footer>
    </>
}

export default Home;