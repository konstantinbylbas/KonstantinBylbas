/** @format */

export interface iEnvironment {
    portfolio_api: iWebConfig
}

export interface iWebConfig {
    protocol: 'http' | 'https',
    host: string
}