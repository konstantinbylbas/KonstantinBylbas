/** @format */

const CracoAlias = require('craco-alias');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

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
    style: {
        postcss: {
            plugins: [autoprefixer(), cssnano({ preset: 'default' })],
        },
    },
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
