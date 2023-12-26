interface Env {
    APP_URL: string
    API_URL: string
    API_URL_OFFCHAIN: string
    PORT: string | number
    CDN: string
    NODE_ENV: string
    BSC: string
    CHAINS: string
    MAINNET: string | boolean
    PRICE_API_URL: string
    NAMI_API_URL: string
    USER_SOCKET: string
    USER_SOCKET_OFFCHAIN: string
    PUBLIC_SOCKET: string
    RECAPTCHA_SITE_KEY: string
    RECAPTCHA_SECRET_KEY: string
    SECRET_KEY_AUTH: string
    APP_DEV_URL: string
}

const env: Env = {
    APP_URL: process?.env?.NEXT_PUBLIC_APP_URL ?? '',
    API_URL: process?.env?.NEXT_PUBLIC_API_URL ?? '',
    API_URL_OFFCHAIN: process?.env?.NEXT_PUBLIC_API_URL_OFFCHAIN ?? '',
    PORT: process?.env?.NEXT_PUBLIC_PORT ?? 3000,
    CDN: process.env.NEXT_PUBLIC_CDN ?? '',
    NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV ?? 'development',
    BSC: process.env.NEXT_PUBLIC_BSCSCAN ?? '',
    CHAINS: process.env.NEXT_PUBLIC_CHAINS ?? '',
    MAINNET: process.env.NEXT_PUBLIC_MAINNET ?? false,
    PRICE_API_URL: process.env.NEXT_PUBLIC_PRICE_API_URL ?? '',
    NAMI_API_URL: process.env.NEXT_PUBLIC_NAMI_API_URL ?? '',
    USER_SOCKET: process.env.NEXT_PUBLIC_USER_SOCKET ?? '',
    USER_SOCKET_OFFCHAIN: process.env.NEXT_PUBLIC_USER_SOCKET_OFFCHAIN ?? '',
    PUBLIC_SOCKET: process.env.NEXT_PUBLIC_STREAM_SOCKET ?? '',
    RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '',
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY ?? '',
    SECRET_KEY_AUTH: process.env.SECRET_KEY_AUTH_OFFCHAIN ?? '',
    APP_DEV_URL: process.env.NEXT_PUBLIC_APP_DEV_URL ?? '',
}

export default env
