import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [pendientes, setPendientes] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const fetchPendientes = async () => {
        try {
            const response = await axios.get("https://playground.4geeks.com/apis/fake/todos/user/alesanchezr");
            setPendientes(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPendientes();
    }, []);

    const addPendiente = async () => {
        if (inputValue.trim() !== "") {
            const newPendiente = {
                label: inputValue,
                done: false
            };
            setPendientes(prevPendientes => [...prevPendientes, newPendiente]);
            setInputValue("");
            syncWithServer([...pendientes, newPendiente]);
        }
    };

    const deletePendiente = async (index) => {
        const updatedPendientes = [...pendientes];
        updatedPendientes.splice(index, 1);
        setPendientes(updatedPendientes);
        syncWithServer(updatedPendientes);
    };

    const syncWithServer = (todos) => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
            method: "PUT",
            body: JSON.stringify(todos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log(resp.ok);
            console.log(resp.status);
            return resp.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="container">
            <h1>Mi lista de Pendientes</h1>
            <ul>
                <li>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        value={inputValue}
                        placeholder="¿Qué es lo que tienes que hacer?"
                    />
                    <button onClick={addPendiente}>Agregar</button>
                </li>
                {pendientes.map((pendiente, i) => (
                    <li key={i}>
                        {pendiente.label}
                        <FaTrashAlt onClick={() => deletePendiente(i)} />
                    </li>
                ))}
            </ul>
            <div>{pendientes.length} tarea(s)</div>
        </div>
    );
};

export default Home;
