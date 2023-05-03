import './Mesures.css'
import {useEffect, useState} from "react";
import useSocketIO from "../../hooks/useSocketIO";

function Mesures({user}: {user: any}) {
    const socketUrl = 'ws://localhost:3000/climat';
    const socketUrl1 = 'ws://localhost:3000/auth';
    const socket1 = useSocketIO(socketUrl1);
    const { connected, socket, listenMessage, sendMessage } = useSocketIO(socketUrl);
    const [arduinoConnected, setArduinoConnected] = useState(false);
    const [dhtConnected, setDHTConnected] = useState(false);
    const [climat, setClimat] = useState({
        temperature: 0,
        humidityA: 0,
        humidityS: 0,
        luminosity: 0,  
    });

    useEffect(() => {
        listenMessage('error_systeme', (message) => {
            console.log('message', message)
        })
        listenMessage('data', (data) => {
            if (data.temperature === 0 && data.humidityA === 0) {
                setDHTConnected(false);
            } else {
                setDHTConnected(true);
            }
            setArduinoConnected(true);
            setClimat(data);
        })
        socket1.listenMessage('systeme_off', (message) => {
            setArduinoConnected(false);
            //setDHTConnected(false);
        })
        socket1.listenMessage('systeme_on', (message) => {
            setArduinoConnected(true);
            //setDHTConnected(false);
        })
    }, [listenMessage, socket1]);

    return(
        <div className='flex flex-col gap-16 items-start'>
            <div className='flex items-center gap-2 text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='font-medium text-lg'>{user.prenom} {user.nom}</p>
            </div>

        </div>
    )
  
  }
  
  export default Mesures