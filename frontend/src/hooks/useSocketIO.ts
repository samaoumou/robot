import {useCallback, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

//Hook pour gérer la connexion au serveur socket.io
export default function useSocketIO(url: string) {
    const [socket, setSocket] = useState<Socket>();
    const [connected, setConnected] = useState(false);
    const [reconnecting, setReconnecting] = useState(false);


    useEffect(() => {
        if (!socket) {
        const newSocket = io(url, {
            transports: ['websocket'],
            autoConnect: false,
            reconnection: false,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });
        setSocket(newSocket);
        newSocket.on('connect', () => {
            setConnected(true);
        });
        newSocket.on('reconnect', () => {
            setConnected(true);
        });
        newSocket.on('reconnect_attempt', () => {
            setConnected(false);
        });
        newSocket.on('reconnecting', () => {
            setConnected(false);
        });
        newSocket.on('reconnect_error', () => {
            setConnected(false);
        });
        newSocket.on('reconnect_failed', () => {
            setConnected(false);
        });
        newSocket.on('error', () => {
            setConnected(false);
        });
        newSocket.on('connect_error', () => {
            setConnected(false);
        });
        newSocket.on('connect_timeout', () => {
            setConnected(false);
        });
        newSocket.on('disconnect', () => {
            setConnected(false);
        });
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.connect();
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, [socket]);

    const sendMessage = useCallback((event: string, message: any) => {
        if (socket) {
            socket.emit(event, message);
        }

    }, [socket]);

    const listenMessage = useCallback((event: string, callback: (message: any) => void) => {
        if (socket) {
            socket.on(event, callback);
        }

    }, [socket]);

    return {socket, connected, sendMessage, listenMessage}
}