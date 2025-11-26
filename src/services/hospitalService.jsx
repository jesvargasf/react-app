import axios from "axios";

const API_URL = "http://localhost:8080/pacientes";

export async function getPacientes() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching pacientes:", error);
        throw error;
    }
}

export async function guardarPaciente(paciente) {
    try {
        const response = await axios.post(API_URL, paciente);
        return response.data;
    } catch (error) {
        console.error("Error saving paciente:", error);
        throw error;
    }
}