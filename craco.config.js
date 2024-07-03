/** @format */

const CracoAlias = require('craco-alias');

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
};
