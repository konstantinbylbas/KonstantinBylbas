/** @format */

import sendRequest from '@api/baseAPI';
import { iWebConfig } from '@_types/environment.type';
import { iTelegramService } from '@_types/injector.type';
import { Environment } from '@environments/environment';

export class TelegramService implements iTelegramService {
    private config: iWebConfig;
    private source: string;
    private url: string;

    constructor() {
        this.config = Environment.portfolio_api;
        this.source = 'portfolio';
        this.url = `${this.config.protocol}://${this.config.host}`;
    }

    public async sendMessage(message: string): Promise<void> {
        const method = 'TelegramSendMessage';
        const formData = new FormData();

        message = encodeURI(message);

        formData.append('data', JSON.stringify({ message }));

        try {
            const { success } = await sendRequest(
                this.url,
                `source=${this.source}&method=${method}`,
                formData,
            );

            if (!success) {
                throw 'Internal server error';
            }
        } catch (error) {
            console.log('sendMessage error: ', error);
            throw new Error('sendMessage error');
        }
    }
}
