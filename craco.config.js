/** @format */

const CracoAlias = require('craco-alias');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
    env: {
        production: {
            PUBLIC_URL: '/KonstantinBylbas/',
        },
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
    ],
    webpack: {
        plugins: {
            add: [
                new WorkboxWebpackPlugin.GenerateSW({
                    clientsClaim: true,
                    skipWaiting: true,
                    runtimeCaching: [
                        {
                            urlPattern: /\.(?:ttf|otf|woff|woff2|svg)$/,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'fonts',
                                expiration: {
                                    maxEntries: 20,
                                    maxAgeSeconds: 60 * 60 * 24 * 365,
                                },
                            },
                        },
                    ],
                }),
            ],
        },
    },
};
