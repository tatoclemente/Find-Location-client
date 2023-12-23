"use client";

import styles from "./Tutorial.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "./components/ChatPage";

export const TutorialComp = () => {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");

  var socket;
  socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
// You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  return (
    <div>
      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className={styles.main_input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className={styles.main_input}
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
        <button className={styles.main_button} onClick={() => handleJoin()}>
          {!showSpinner ? (
            "Join"
          ) : (
            <div className={styles.loading_spinner}></div>
          )}
        </button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage socket={socket} roomId={roomId} username={userName} />
      </div>
    </div>
  );
}




























// 'use client'

// import { useState, useEffect } from 'react'
// import io from 'socket.io-client'
// import axios from 'axios'


// export const TutorialComp = (props) => {

//     const [users, setUsers] = useState([])
//     const [socket, setSocket] = useState(undefined)
//     const [message, setMessage] = useState("")
//     const [roomName, setRoomName] = useState("")
//     const [messages, setMessages] = useState([])

//     useEffect(() => {
//         const getUsers = async () => {
//             const { data } = await axios.get('http://localhost:3001/user')

//             setUsers(data)
//         }
//         getUsers()
//     }, [])

//     // const [buttonCont, setButtonCont] = useState('Send event')
//     const [enviarMensaje, setEnviarMensaje] = useState({
//         nombre: '',
//         mensaje: '',
//         userId: ''
//     })

//     const handleChange = (event) => {
//         const { name, value } = event.target
//         setEnviarMensaje({
//             ...enviarMensaje,
//             [name]: value
//         })
//     }

//     const handleUserSelect = (id) => {
//         setEnviarMensaje({
//             ...enviarMensaje,
//             userId: id
//         })
//     }

    
    
//     const sendSocketEvent = (e) => {
//         e.preventDefault()
//         socket.emit('message', message, roomName)
//         // if (enviarMensaje.userId) {
            
            
//         //     socket.emit('message', {
//         //         user: enviarMensaje.nombre,
//         //         message: enviarMensaje.mensaje,
//         //         // userId: enviarMensaje.userId
//         //     }, (resp) => {
//         //         console.log('Respuest del servidor', resp);
//         //     })
//         // } 
//     }
    
//         useEffect(() => {
//             // socket.on('connect', () => {
//             //     console.log('connected to server ID: ', socket.id)
    
//             // })
    
//             // socket.on('disconnect', () => {
//             //     console.log('Desconectado del servidor ', socket.connected)
//             // })
    
//             const socket = io("http://localhost:3001")
//             // Escuchar informacion
//             socket.on('message', message => {
//                 setMessages((messages)=>[...messages, message])
//                 console.log('Servidor: ', message);
//             })
            
//             setSocket(socket)
//         }, [])
        


//     // console.log(messages);
    
//     return (
//         <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <form action="" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
//                 <select name="" onChange={(e) => handleUserSelect(e.target.value)}>
//                     { 
//                         users && users.map((user) => (
//                             <option key={user.id} value={user.id} name='user'>{user.name}</option>
//                         ))
//                     }
//                 </select>
//                 <label htmlFor="">Nombre</label>
//                 <input
//                     type="text"
//                     name="nombre"
//                     onChange={(e) => setRoomName(e.target.value)}
//                 />
//                 <label htmlFor="">Mensaje</label>
//                 <textarea 
//                     name="mensaje"
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button style={{ width: '100px', height: 'auto', margin: '30px' }} onClick={sendSocketEvent}>
//                     Send Message
//                 </button>

//             <ul>
//                 {
//                     messages.map((message, i) => (
//                         <li key={i}>{message}</li>
//                     ))
//                 }
//             </ul>
//             </form>
//         </div>
//     )
// }
