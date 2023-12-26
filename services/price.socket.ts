import Emitter from '@/socket/emitter';
import { Exchange } from 'nami-trading-price-service';
import { io } from 'socket.io-client';
import { SOCKET_EVENT } from './events';
import socketIO from './socket';

export interface IAuthResponse {
    event: string;
    userId: string;
}

export function onPriceUpdatedSocket(
    callback: (data: any) => void,
    type: Exchange
) {
    if (!socketIO.io || !socketIO.io.connected) {
        socketIO.connectIO(type);
    }

    socketIO.io.on(
        'connect', () => {

            socketIO.io.on(
                SOCKET_EVENT.FUTURES_TICKER_UPDATE,
                (data: any) => {
                    Emitter.emit(SOCKET_EVENT.FUTURES_TICKER_UPDATE + data.s, data);
                    Emitter.emit(SOCKET_EVENT.FUTURES_TICKER_UPDATE, data);
                    callback(data);
                }
            );

            socketIO.io.on(
                SOCKET_EVENT.FUTURES_MINI_TICKER_UPDATE,
                (data: any) => {
                    Emitter.emit(SOCKET_EVENT.FUTURES_MINI_TICKER_UPDATE + data.s, data);
                    callback(data);
                }
            );
        }
    );

    return socketIO.io;
}

