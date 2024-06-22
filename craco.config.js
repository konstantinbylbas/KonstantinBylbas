/** @format */

const CracoAlias = require('craco-alias');

const path = require("path");

const resolvePath = (dirPath) => path.resolve(__dirname, dirPath);

module.exports = {
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
