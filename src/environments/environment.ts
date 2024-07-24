/** @format */

import { iEnvironment } from '@app/types/environment.type';
import config from './config';

const environmentKey = 'config';
const Environment: iEnvironment =
    { config }[environmentKey] || config;

export { Environment };
