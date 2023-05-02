import './CtrlSysteme.css'
import extracteur1 from '../../assets/fan.png'
import extracteur2 from '../../assets/fan.gif'
import arroseur1 from '../../assets/arr.jpeg'
import arroseur2 from '../../assets/arr-gif.gif'
import toitFerme from '../../assets/toit_ferme.jpg'
import toitOuvert from '../../assets/toit_ouvert.webp'
import DHT11 from '../../assets/dht11.jpeg'
import {useEffect, useState} from 'react'
import useSocketIO from "../../hooks/useSocketIO";

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
    const [luminosity, setLuminosity] = useState(0);

    useEffect(() => {
        //verifier si l'arduino est connecté
        listenMessage('error_systeme', (message) => {
            console.log('message', message)
        })

        //verifier si le dht11 est connecté
        socket1.listenMessage('data', (data) => {
            if (data.temperature === 0 && data.humidityA === 0) {
                setDHTConnected(false);
            } else {
                setDHTConnected(true);
            }
            setLuminosity(data.luminosity);
            /*if(data.luminosity < 30) {
                setToggle2(true);
            } else {
                setToggle2(false);
            }*/
        })

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

        //Permet de vérifier l'etat de la pompe
        listenMessage('pompe_status', (message) => {
            if(message == 1) {
                localStorage.setItem('toggle', String(true));
                setToggle(true);
            } else {
                localStorage.setItem('toggle', String(false));
                setToggle(false);
            }
        })

        //permet de vérifier l'etat du toit
        listenMessage('toit_status', (message) => {
            if(message === 1) {
                localStorage.setItem('toggle2', String(true));
                setToggle2(true);
            } else {
                localStorage.setItem('toggle2', String(false));
                setToggle2(false);
            }
        })

        //permet de vérifier l'etat de l'extracteur d'air
        listenMessage('fan_status', (message) => {
            if(message === 1) {
                localStorage.setItem('toggleFan', String(true));
                setToggleFan(true);
            } else {
                localStorage.setItem('toggleFan', String(false));
                setToggleFan(false);
            }
        })

    },[toggle, toggle2, toggleFan, arduinoConnected]);

    //permet de vérifier l'etat de l'arduino
    useEffect(() => {
        if(!arduinoConnected){
            setInterval(() => {
                sendMessage('port_status', {message: 'systeme_status'});
            }, 1000);
        }
    }
    , [sendMessage, arduinoConnected]);

    //permet d'effectuer l'arrosage
    useEffect(() => {
        if(toggle) {
            sendMessage('arrosage_on', 1);
        } else {
            sendMessage('arrosage_off', 0);
        }

    }, [sendMessage, toggle]);

    //permet d'ouvrir le toit
    useEffect(() => {
        if(toggle2) {
            sendMessage('toit_ouvert', 'o');
        } else {
            sendMessage('toit_ferme', 'f');
        }

    }, [sendMessage, toggle2]);

    const handleClick = () => {
        setToggle(!toggle)
    };

    const handleClick2 = () => {
        setToggle2(!toggle2)
    };
    return (
        <div className='flex gap-16 w-full h-96'>
            <div className='bg-white rounded-lg drop-shadow-lg w-3/4'>
                <h1 className='text-center text-emerald-600 text-2xl font-medium m-2'>Contrôler les composants</h1>
                <div className='flex flex-row space-x-14 justify-center px-10'>
                    <div className='bg-emerald-600 w-1/2 h-80 drop-shadow-lg'>
                        <p className='text-white text-center text-xl m-0'>Arrosage</p>
                        {
                            toggle ?
                                <div className='flex justify-center'>
                                    <img className='w-40 h-36 mt-4' src={arroseur2} alt="" />
                                </div>
                                :
                                <div className='flex justify-center'>
                                    <img className='w-40 h-36 mt-4' src={arroseur1} alt="" />
                                </div>
                        }
                        {
                            toggle ?
                                <div className='bg-white w-24 h-24 rounded-full mt-5 ml-20'>
                                    <button
                                        disabled={!arduinoConnected}
                                        onClick={handleClick}
                                        className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                        title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                    >
                                        <svg fill="#12B886" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M22,7C19.867,7,8.513,7,8,7c-4.418,0-8,3.582-8,8s3.582,8,8,8c0.513,0,11.867,0,14,0c4.418,0,8-3.582,8-8S26.418,7,22,7z M22,21c-3.314,0-6-2.686-6-6s2.686-6,6-6s6,2.686,6,6S25.314,21,22,21z" /></svg>
                                    </button>
                                    <p className='text-center font-medium'>Arrêter</p>
                                </div>
                                :
                                <div className='bg-white w-24 h-24 rounded-full mt-5 ml-20'>

                                    <button
                                        disabled={!arduinoConnected}
                                        onClick={handleClick}
                                        className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                        title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                    >
                                        <svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M 8 7 A 1.0001 1.0001 0 0 0 7.8886719 7.0058594 C 3.5337373 7.0663982 0 10.631126 0 15 C 0 19.371502 3.5379402 22.937792 7.8964844 22.994141 A 1.0001 1.0001 0 0 0 8 23 L 22 23 C 26.052135 23 29.281986 19.915394 29.796875 16 L 30 16 L 30 15 C 30 10.593562 26.406438 7 22 7 L 8 7 z M 8 9 C 11.325553 9 14 11.674447 14 15 C 14 18.325553 11.325553 21 8 21 C 4.6744469 21 2 18.325553 2 15 C 2 11.674447 4.6744469 9 8 9 z M 13.271484 9 L 22 9 C 25.325562 9 28 11.674438 28 15 C 28 18.325562 25.325562 21 22 21 L 13.271484 21 C 14.93967 19.532053 16 17.387963 16 15 C 16 12.612037 14.93967 10.467947 13.271484 9 z" /></svg>
                                    </button>
                                    <p className='text-center font-medium'>Démarer</p>
                                </div>
                        }
                    </div>
                    <div className='bg-emerald-600 w-1/2 h-80 drop-shadow-lg'>
                        <p className='text-white text-center text-xl m-0'>Ouverture toit</p>
                        {
                            toggle2 ?
                                <div className='flex justify-center'>
                                    <img className='w-40 h-36 mt-4' src={toitOuvert} alt="" />
                                </div>
                                :
                                <div className='flex justify-center'>
                                    <img className='w-40 h-36 mt-4' src={toitFerme} alt="" />
                                </div>
                        }
                        {
                            toggle2 ?
                                <div className='bg-white w-24 h-24 rounded-full mt-5 ml-20'>
                                    <button
                                        disabled={!arduinoConnected}
                                        onClick={handleClick2}
                                        className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                        title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                    >
                                        <svg fill="#12B886" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M22,7C19.867,7,8.513,7,8,7c-4.418,0-8,3.582-8,8s3.582,8,8,8c0.513,0,11.867,0,14,0c4.418,0,8-3.582,8-8S26.418,7,22,7z M22,21c-3.314,0-6-2.686-6-6s2.686-6,6-6s6,2.686,6,6S25.314,21,22,21z" /></svg>
                                    </button>
                                    <p className='text-center font-medium'>Fermer</p>
                                </div>
                                :
                                <div className='bg-white w-24 h-24 rounded-full mt-5 ml-20'>
                                    <button
                                        disabled={!arduinoConnected}
                                        onClick={handleClick2}
                                        className='flex justify-center ml-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                        title={arduinoConnected ? '' : 'Veuillez connecter l\'arduino'}
                                    >
                                        <svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="50px" height="50px"><path d="M 8 7 A 1.0001 1.0001 0 0 0 7.8886719 7.0058594 C 3.5337373 7.0663982 0 10.631126 0 15 C 0 19.371502 3.5379402 22.937792 7.8964844 22.994141 A 1.0001 1.0001 0 0 0 8 23 L 22 23 C 26.052135 23 29.281986 19.915394 29.796875 16 L 30 16 L 30 15 C 30 10.593562 26.406438 7 22 7 L 8 7 z M 8 9 C 11.325553 9 14 11.674447 14 15 C 14 18.325553 11.325553 21 8 21 C 4.6744469 21 2 18.325553 2 15 C 2 11.674447 4.6744469 9 8 9 z M 13.271484 9 L 22 9 C 25.325562 9 28 11.674438 28 15 C 28 18.325562 25.325562 21 22 21 L 13.271484 21 C 14.93967 19.532053 16 17.387963 16 15 C 16 12.612037 14.93967 10.467947 13.271484 9 z" /></svg>
                                    </button>
                                    <p className='text-center font-medium'>Ouvrir</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className='rounded-lg drop-shadow-lg w-1/3'>
                <div className='bg-white w-full h-3/5 rounded-lg drop-shadow-lg flex justify-center'>
                    <img src={toggleFan ? extracteur2 : extracteur1} alt="" />
                </div>
                <div className='bg-white w-full mt-6 h-2/6 rounded-lg drop-shadow-lg'>
                    <p className='text-emerald-600 text-center text-2xl font-medium m-0'>Etats des capteurs</p>
                    <div className='flex flex-col justify-center items-center pt-2 gap-2'>
                        {!arduinoConnected ?
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     width="50" height="50"
                                     viewBox="0 0 48 48">
                                    <path fill="#009688"
                                          d="M35.7,34.7c-7.7,0-13.2-8.9-13.4-9.3l-0.6-1l0.6-1C22.5,22.9,28,14,35.7,14C41.4,14,46,18.6,46,24.3 S41.4,34.7,35.7,34.7z M26.4,24.3c1.5,2,5.1,6.3,9.2,6.3c3.5,0,6.3-2.8,6.3-6.3c0-3.5-2.8-6.3-6.3-6.3C31.5,18,27.9,22.3,26.4,24.3 z"></path>
                                    <path fill="#009688"
                                          d="M12.3,34.7C6.6,34.7,2,30,2,24.3S6.6,14,12.3,14c7.9,0,13.2,8.9,13.4,9.3l0.6,1l-0.6,1 C25.5,25.7,20,34.7,12.3,34.7z M12.3,18C8.8,18,6,20.8,6,24.3c0,3.5,2.8,6.3,6.3,6.3c4.2,0,7.8-4.3,9.3-6.3 C20.2,22.3,16.6,18,12.3,18z"></path>
                                    <path fill="#009688" d="M10 23h6v2h-6V23zM32 23h6v2h-6V23z"></path>
                                    <path fill="#009688" d="M34,21h2v6h-2V21z"></path>
                                </svg>
                                <p className='text-red-600 text-center text-xl font-medium m-0'>

                                    <span className='text-red-600 text-center text-xl font-medium m-0'>Arduino non connecté</span>
                                </p>
                            </>
                            :
                            <p className='text-green-600 text-center text-xl font-medium m-0'>Arduino connecté</p>
                        }
                        {
                            arduinoConnected && !dhtConnected ?
                                <div className='flex'>
                                    <img className='w-8 h-12' src={DHT11} alt='DHT11'/>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                         width="20" height="20"
                                         viewBox="0 0 48 48">
                                        <linearGradient id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z" opacity=".05"></path><path d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z" opacity=".07"></path><path fill="#fff" d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"></path><path fill="#fff" d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"></path>
                                    </svg>
                                </div>
                            : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CtrlSysteme
