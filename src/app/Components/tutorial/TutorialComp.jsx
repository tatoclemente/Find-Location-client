'use client'

import { useState, useEffect } from 'react'
import io from 'socket.io-client'

export const TutorialComp = (props) => {

    // const [buttonCont, setButtonCont] = useState('Send event')
    const [enviarMensaje, setEnviarMensaje] = useState({
        nombre: '',
        mensaje: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setEnviarMensaje({
            ...enviarMensaje,
            [name]: value
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

        socket.emit('enviarMensajeCliente', {
            usuario: enviarMensaje.nombre,
            mensaje: enviarMensaje.mensaje
        }, (resp) => {
            console.log('Respuest adel servidor', resp);
        })
    }

    
    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form action="" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
