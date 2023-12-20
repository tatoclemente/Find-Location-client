'use client'

import { useState, useEffect } from 'react'
import io from 'socket.io-client'

export const TutorialComp = (props) => {

    const [buttonCont, setButtonCont] = useState('Send event')

    const socket = io("http://localhost:5000")

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to server ID: ', socket.id)
        
        })

        // socket.on('responseEvent', (data) => {
        //     console.log(data);
        //     setButtonCont('Recived response from the server ' + data)
        // })

        return () => {
            socket.disconnect()
        }

    }, [])

    const sendSocketEvent = () => {

        socket.emit('sendMessage', 'a', 'b', (response) => {
            setButtonCont('Recived response from the server: ' + response.status)

        })
    }

    console.log(buttonCont);
  return (
    <div style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button style={{width: '100px', height: 'auto', margin: '30px'}} onClick={sendSocketEvent}>
            {buttonCont}
        </button>
    </div>
  )
}
