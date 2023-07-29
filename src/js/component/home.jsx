
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
            const response = await axios.get("https://playground.4geeks.com/apis/fake/todos/user/<username>");
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
            try {
                await axios.post("https://playground.4geeks.com/apis/fake/todos/user/<username>", [newPendiente]);
                fetchPendientes();
                setInputValue("");
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const deletePendientes = async () => {
        try {
            await axios.delete("https://playground.4geeks.com/apis/fake/todos/user/<username>");
            fetchPendientes();
        } catch (error) {
            console.error('Error deleting todos:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addPendiente();
        }
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
                        onKeyPress={handleKeyPress}
                        placeholder="¿Qué es lo que tienes que hacer?"
                    />
                </li>
                {pendientes.map((pendiente, i) => (
                    <li key={i}>
                        {pendiente.label}
                        <FaTrashAlt onClick={deletePendientes} />
                    </li>
                ))}
            </ul>
            <div>{pendientes.length} tarea(s)</div>
        </div>
    );
};

export default Home;
