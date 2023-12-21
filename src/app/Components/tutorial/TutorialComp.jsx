'use client'

import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'


export const TutorialComp = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const { data } = await axios.get('http://localhost:3001/user')

            setUsers(data)
        }
        getUsers()
    }, [])

    // const [buttonCont, setButtonCont] = useState('Send event')
    const [enviarMensaje, setEnviarMensaje] = useState({
        nombre: '',
        mensaje: '',
        userId: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setEnviarMensaje({
            ...enviarMensaje,
            [name]: value
        })
    }

    const handleUserSelect = (id) => {
        console.log(id);
        setEnviarMensaje({
            ...enviarMensaje,
            userId: id
        })
    }

    const socket = io("http://localhost:3001")

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to server ID: ', socket.id)

        })

        socket.on('disconnect', () => {
            console.log('Desconectado del servidor ', socket.connected)
        })


        // Escuchar informacion
        socket.on('enviarMensajeServidor', (mensaje) => {
            console.log('Servidor: ', mensaje);
        })

    }, [])

    const sendSocketEvent = () => {
        if (enviarMensaje.userId) {
            
        
        socket.emit('enviarMensajeCliente', {
            usuario: enviarMensaje.nombre,
            mensaje: enviarMensaje.mensaje,
            userId: enviarMensaje.userId
        }, (resp) => {
            console.log('Respuest adel servidor', resp);
        })
     } 
    }


    console.log(users);
    
    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form action="" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <select name="" onChange={(e) => handleUserSelect(e.target.value)}>
                    { 
                        users && users.map((user) => (
                            <option key={user.id} value={user.id} name='user'>{user.name}</option>
                        ))
                    }
                </select>
                <label htmlFor="">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={enviarMensaje.nombre}
                    onChange={handleChange}
                />
                <label htmlFor="">Mensaje</label>
                <textarea 
                    value={enviarMensaje.mensaje}
                    name="mensaje"
                    onChange={handleChange}
                />
                <button style={{ width: '100px', height: 'auto', margin: '30px' }} onClick={sendSocketEvent}>
                    Send Message
                </button>
            </form>
        </div>
    )
}
