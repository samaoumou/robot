import './CtrlSysteme.css'
import avant from '../../assets/avan.png'
import arriere from '../../assets/arriere.png'
import { useEffect, useState } from 'react'
import useSocketIO from "../../hooks/useSocketIO";
import droite from '../../assets/droite.png'
import gauche from '../../assets/gauche.png'
import stop from '../../assets/stop.png'

function CtrlSysteme() {
    const socketUrl = 'ws://localhost:3000/auth';
    const socketUrl1 = 'ws://localhost:3000/climat';
    const socket1 = useSocketIO(socketUrl1);
    const { connected, socket, listenMessage, sendMessage } = useSocketIO(socketUrl);
    const [arduinoConnected, setArduinoConnected] = useState(false);
    const [dhtConnected, setDHTConnected] = useState(false);
    const [toggleFan, setToggleFan] = useState(localStorage.getItem('toggleFan') === 'true'
        && localStorage.getItem('isFirstEvent') === 'true');
    const [toggle, setToggle] = useState(localStorage.getItem('toggle') === 'true'
        && localStorage.getItem('isFirstEvent') === 'true');
    const [toggle2, setToggle2] = useState(localStorage.getItem('toggle2') === 'true'
        && localStorage.getItem('isFirstEvent') === 'true');


    useEffect(() => {
        //verifier si l'arduino est connecté
        listenMessage('error_systeme', (message) => {
            console.log('message', message)
        })

        //verifier si le dht11 est connecté


        //verifier si l'arduino est connecté
        listenMessage('systeme_on', (message) => {
            setArduinoConnected(true);
            localStorage.setItem('isFirstEvent', String(true));
            // console.log('message', message)
        })

        //verifier si l'arduino est connecté
        listenMessage('systeme_off', (message) => {
            setArduinoConnected(false);
            /*let isFirstEvent = localStorage.getItem('isFirstEvent') !== 'false';
            if (isFirstEvent) {
                setArduinoConnected(false);
                isFirstEvent = false; // Set the flag to false, so we don't reload the page again
                localStorage.setItem('isFirstEvent', String(false)); // Store the flag in local storage
                location.reload(); // Reload the page
                //console.log('message', message);
            }*/
        })
    }, [listenMessage]);

    useEffect(() => {

        //Permet de vérifier l'etat de la voiture
        listenMessage('avant_arriere', (message) => {
            if (message == 1) {
                localStorage.setItem('toggle', String(true));
                setToggle(true);
            } else {
                localStorage.setItem('toggle', String(false));
                setToggle(false);
            }
        })
        //permet de vérifier l'etat si c'est à droite ou à gauche
        listenMessage('gauche_droite', (message) => {
            if (message === 1) {
                localStorage.setItem('toggle2', String(true));
                setToggle2(true);
            } else {
                localStorage.setItem('toggle2', String(false));
                setToggle2(false);
            }
        })

        //permet de vérifier l'etat de l'extracteur d'air
        listenMessage('arret', (message) => {
            if (message === 1) {
                localStorage.setItem('toggleFan', String(true));
                setToggleFan(true);
            } else {
                localStorage.setItem('toggleFan', String(false));
                setToggleFan(false);
            }
        })

    }, [toggle, toggle2, toggleFan, arduinoConnected]);

    //permet de vérifier l'etat de l'arduino
    useEffect(() => {
        if (!arduinoConnected) {
            setInterval(() => {
                sendMessage('port_status', { message: 'systeme_status' });
            }, 1000);
        }
    }
        , [sendMessage, arduinoConnected]);

    //permet d'avancer
    useEffect(() => {
        if (toggle) {
            sendMessage('avant', 1);
        } else {
            sendMessage('arriere', 0);
        }

    }, [sendMessage, toggle]);

    //permet de tourner
    useEffect(() => {
        if (toggle2) {
            sendMessage('gauche', 'o');
        } else {
            sendMessage('droite', 'f');
        }

    }, [sendMessage, toggle2]);

    //arret
    useEffect(() => {
        if (toggleFan) {
            sendMessage('arret', 'a')
        } else {
            sendMessage('avant', 1)
        }
    }, [sendMessage, toggleFan])

    const handleClick = () => {
        setToggle(!toggle)
    };

    const handleClick2 = () => {
        setToggle2(!toggle2)
    };
    return (
        <div className='flex justify-center gap-16 w-full h-96'>
            <div className='bg-white-300 rounded-lg drop-shadow-lg w-3/4'>
                <h1 className='text-center flex justify-center text-emerald-600 text-2xl font-medium m-2'>Piloter la voiture</h1>
                <div className='flex flex-colunm justify-center'>
                    <div className='flex flex-row space-x-14 justify-center px-10'>

                        <div className='bg-blue-300 justify-center w-1/2 h-80 drop-shadow-lg'>
                            <p className='text-white text-center text-xl m-0'>Ligne droite</p>
                            {
                                toggle ?
                                    <div className='flex justify-center'>
                                        <img className='w-20 h-20 mt-4' src={arriere} alt="" />
                                    </div>
                                    :
                                    <div className='flex justify-center'>
                                        <img className='w-20 h-20 mt-4' src={avant} alt="" />
                                    </div>
                            }
                            {
                                toggle ?
                                    <div className='bg-white w-24 justify-center h-24 '>
                                        <button
                                            disabled={!arduinoConnected}
                                            onClick={handleClick}
                                            className='flex justify-center disabled:opacity-50 disabled:cursor-not-allowed'
                                            title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                        >
                                            <svg fill="#12B886" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M22,7C19.867,7,8.513,7,8,7c-4.418,0-8,3.582-8,8s3.582,8,8,8c0.513,0,11.867,0,14,0c4.418,0,8-3.582,8-8S26.418,7,22,7z M22,21c-3.314,0-6-2.686-6-6s2.686-6,6-6s6,2.686,6,6S25.314,21,22,21z" /></svg>
                                        </button>
                                        <p className='text-center font-medium'>Arrêter</p>
                                    </div>
                                    :
                                    <div className='bg-white w-28 justify-center h-24 rounded-full mt-5 ml-20'>

                                        <button
                                            disabled={!arduinoConnected}
                                            onClick={handleClick}
                                            className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                            title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                        >
                                            <svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M 8 7 A 1.0001 1.0001 0 0 0 7.8886719 7.0058594 C 3.5337373 7.0663982 0 10.631126 0 15 C 0 19.371502 3.5379402 22.937792 7.8964844 22.994141 A 1.0001 1.0001 0 0 0 8 23 L 22 23 C 26.052135 23 29.281986 19.915394 29.796875 16 L 30 16 L 30 15 C 30 10.593562 26.406438 7 22 7 L 8 7 z M 8 9 C 11.325553 9 14 11.674447 14 15 C 14 18.325553 11.325553 21 8 21 C 4.6744469 21 2 18.325553 2 15 C 2 11.674447 4.6744469 9 8 9 z M 13.271484 9 L 22 9 C 25.325562 9 28 11.674438 28 15 C 28 18.325562 25.325562 21 22 21 L 13.271484 21 C 14.93967 19.532053 16 17.387963 16 15 C 16 12.612037 14.93967 10.467947 13.271484 9 z" /></svg>
                                        </button>
                                        <p className='text-center font-medium'>En avant</p>
                                    </div>
                            }
                        </div>
                        <div className='bg-blue-300 justify-center w-1/2 h-80 drop-shadow-lg'>
                            <p className='text-white text-center text-xl m-0'>Pivoter</p>
                            {
                                toggle2 ?
                                    <div className='flex justify-center'>
                                        <img className='w-20 h-20 mt-4' src={droite} alt="" />
                                    </div>
                                    :
                                    <div className='flex justify-center'>
                                        <img className='w-20 h-20 mt-4' src={gauche} alt="" />
                                    </div>
                            }
                            {
                                toggle2 ?
                                    <div className='bg-white w-24 h-24 justify-center rounded-full mt-5 ml-20'>
                                        <button
                                            disabled={!arduinoConnected}
                                            onClick={handleClick2}
                                            className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                            title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                        >
                                            <svg fill="#12B886" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"><path d="M22,7C19.867,7,8.513,7,8,7c-4.418,0-8,3.582-8,8s3.582,8,8,8c0.513,0,11.867,0,14,0c4.418,0,8-3.582,8-8S26.418,7,22,7z M22,21c-3.314,0-6-2.686-6-6s2.686-6,6-6s6,2.686,6,6S25.314,21,22,21z" /></svg>
                                        </button>
                                        <p className='text-center font-medium'>En arriere</p>
                                    </div>
                                    :
                                    <div className='bg-white w-28 justify-center h-24 rounded-full mt-5 ml-24'>
                                        <button
                                            disabled={!arduinoConnected}
                                            onClick={handleClick2}
                                            className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                            title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                        >
                                            <svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M 8 7 A 1.0001 1.0001 0 0 0 7.8886719 7.0058594 C 3.5337373 7.0663982 0 10.631126 0 15 C 0 19.371502 3.5379402 22.937792 7.8964844 22.994141 A 1.0001 1.0001 0 0 0 8 23 L 22 23 C 26.052135 23 29.281986 19.915394 29.796875 16 L 30 16 L 30 15 C 30 10.593562 26.406438 7 22 7 L 8 7 z M 8 9 C 11.325553 9 14 11.674447 14 15 C 14 18.325553 11.325553 21 8 21 C 4.6744469 21 2 18.325553 2 15 C 2 11.674447 4.6744469 9 8 9 z M 13.271484 9 L 22 9 C 25.325562 9 28 11.674438 28 15 C 28 18.325562 25.325562 21 22 21 L 13.271484 21 C 14.93967 19.532053 16 17.387963 16 15 C 16 12.612037 14.93967 10.467947 13.271484 9 z" /></svg>
                                        </button>
                                        <p className='text-center font-medium'>A gauche</p>
                                    </div>
                            }

                        </div>

                    </div>
                </div> <br />
                <div className='flex flex-row space-x-14 justify-center px-10'>
                <div className='bg-blue-300 justify-center w-1/4 h-40 drop-shadow-lg'>
                    <p className='text-white text-center text-xl m-0'>Ligne droite</p>
                    {
                        toggleFan ?
                            <div className='flex justify-center'>
                                <img className='w-20 h-20 mt-4' src={stop} alt="" />
                            </div>
                            :
                            <div className='flex justify-center'>
                                <img className='w-20 h-20 mt-4' src={stop} alt="" />
                            </div>
                    }
                    {
                        toggleFan ?
                            <div className='bg-white w-24 justify-center h-24 '>
                                <button
                                    disabled={!arduinoConnected}
                                    onClick={handleClick}
                                    className='flex justify-center disabled:opacity-50 disabled:cursor-not-allowed'
                                    title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                >
                                    <svg fill="#12B886" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M22,7C19.867,7,8.513,7,8,7c-4.418,0-8,3.582-8,8s3.582,8,8,8c0.513,0,11.867,0,14,0c4.418,0,8-3.582,8-8S26.418,7,22,7z M22,21c-3.314,0-6-2.686-6-6s2.686-6,6-6s6,2.686,6,6S25.314,21,22,21z" /></svg>
                                </button>
                                <p className='text-center font-medium'>Arrêter</p>
                            </div>
                            :
                            <div className='bg-white w-28 justify-center h-24 rounded-full mt-5 ml-20'>

                                <button
                                    disabled={!arduinoConnected}
                                    onClick={handleClick}
                                    className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                    title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                >
                                    <svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M 8 7 A 1.0001 1.0001 0 0 0 7.8886719 7.0058594 C 3.5337373 7.0663982 0 10.631126 0 15 C 0 19.371502 3.5379402 22.937792 7.8964844 22.994141 A 1.0001 1.0001 0 0 0 8 23 L 22 23 C 26.052135 23 29.281986 19.915394 29.796875 16 L 30 16 L 30 15 C 30 10.593562 26.406438 7 22 7 L 8 7 z M 8 9 C 11.325553 9 14 11.674447 14 15 C 14 18.325553 11.325553 21 8 21 C 4.6744469 21 2 18.325553 2 15 C 2 11.674447 4.6744469 9 8 9 z M 13.271484 9 L 22 9 C 25.325562 9 28 11.674438 28 15 C 28 18.325562 25.325562 21 22 21 L 13.271484 21 C 14.93967 19.532053 16 17.387963 16 15 C 16 12.612037 14.93967 10.467947 13.271484 9 z" /></svg>
                                </button>
                                <p className='text-center font-medium'>Arret</p>
                            </div>
                    }
                </div>
                </div>
                
            </div>


        </div>

    )
}

export default CtrlSysteme
