/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Contacts.scss';
import SocialMediaLinks from '@app/components/common/socialMedia-links/SocialMediaLinks';
import Input from '@app/components/controls/input/Input';
import Button from '@app/components/controls/button/Button';
import { ButtonSize } from '@app/types/button.type';
import injectorService from '@app/services/injector.service';
import { useContext, useState } from 'react';
import Textarea from '@app/components/controls/textarea/Textarea';
import { NotificationContext } from '@app/contexts/notificationContext';
import { NotificationType } from '@app/types/notification.type';
import validator from 'validator';

export default function Contacts() {
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const TelegramService = injectorService.get('TelegramService');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const nameMinLength = 5;
    const nameMaxLength = 50;
    const subjectMinLength = 5;
    const subjectMaxLength = 200;
    const messageMinLength = 5;
    const messageMaxLength = 1000;

    async function handlerSubmit(): Promise<void> {
        try {
            validateFields();

            await sendMessage();

            setContextNotification([
                ...contextNotification,
                {
                    type: NotificationType.SUCCESS,
                    message: 'Message successfully sent',
                },
            ]);
        } catch (error: any) {
            setContextNotification([
                ...contextNotification,
                {
                    type: NotificationType.ERROR,
                    message: error,
                },
            ]);
        }
    }

    function validateFields(): void {
        if (
            name.trim().length < nameMinLength ||
            name.trim().length > nameMaxLength
        ) {
            throw 'Incorrect name';
        }

        if (!validator.isEmail(email)) {
            throw 'Incorrect email';
        }

        if (
            subject.trim().length < subjectMinLength ||
            subject.trim().length > subjectMaxLength
        ) {
            throw 'Incorrect message subject';
        }

        if (
            message.trim().length < messageMinLength ||
            message.trim().length > messageMaxLength
        ) {
            throw 'Incorrect message';
        }
    }

    async function sendMessage(): Promise<void> {
        const formattedMessage = `${name} (${email})

<b>Subject</b>: ${subject}
${message}
`;

        await TelegramService.sendMessage(formattedMessage);
    }

    return (
        <section id="contacts" className="contacts">
            <SectionTitle
                title={{
                    defaultColorText: 'Get in',
                    primaryColorText: 'touch',
                }}
                backgroundText="Contact"
            />

            <div className="contacts_row row justify-content-between">
                <div className="contacts_row_info">
                    <h5>Don't be shy</h5>
                    <p>
                        Feel free to get in touch with me. I'm always open to
                        discussing new projects.
                    </p>
                    <SocialMediaLinks />
                </div>

                <form
                    className="contacts_row_form"
                    onSubmit={event => {
                        event.preventDefault();
                        handlerSubmit();
                    }}>
                    <Input
                        value={name}
                        onChange={setName}
                        placeholder="Your name"
                    />
                    <Input
                        value={email}
                        onChange={setEmail}
                        placeholder="Your email"
                    />
                    <Input
                        value={subject}
                        onChange={setSubject}
                        placeholder="Email subject"
                    />

                    <Textarea
                        value={message}
                        onChange={setMessage}
                        placeholder="Message"
                    />

                    <Button size={ButtonSize.FULL} label="Send message" />
                </form>
            </div>
        </section>
    );
}
