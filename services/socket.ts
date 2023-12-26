import { io, type Socket } from 'socket.io-client';
import { Exchange } from 'nami-trading-price-service';

interface ISocket {
    io:
    | (Socket &
        Partial<{
            subscribingEvents: Array<{ id: string; callback: () => void; }>;
        }>)
    | undefined;
    connectIO: (type: Exchange) => Socket;
    disconnectIO: () => void;
}

const domain = (type: Exchange) => {
    switch (type) {
        case 'BINANCE':
            return process.env.NEXT_PUBLIC_USER_SOCKET;
        default:
            return process.env.NEXT_PUBLIC_STREAM_SOCKET;
    }
};

const path = (type: Exchange) => {
    switch (type) {
        case 'BINANCE':
            return '/trading';
        default:
            return '';
    }
};

const socketIO: ISocket = {
    io: undefined,

    connectIO(type: Exchange) {
        if (!this.io) {
            this.io = io(domain(type), {
                transports: ['websocket'],
                path: `${path(type)}/ws`,
                reconnection: true,
                reconnectionDelay: 500,
                reconnectionDelayMax: 500,
                reconnectionAttempts: Infinity,
            });
        }
        // this.io.subscribingEvents = [];
        // this.io.on('connect', () => {
        //     this.io?.subscribingEvents?.forEach((item) => {
        //         item.callback();
        //     });
        // });
        return this.io;
    },

    disconnectIO() {
        this.io?.removeAllListeners();
        this.io?.disconnect();
        this.io = undefined;
    },
};

export default socketIO;
