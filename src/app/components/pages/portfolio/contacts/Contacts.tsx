/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Contacts.scss';
import SocialMediaLinks from '@app/components/common/socialMedia-links/SocialMediaLinks';
import Input from '@app/components/controls/input/Input';
import Button from '@app/components/controls/button/Button';
import { ButtonSize } from '@app/types/button.type';
import injectorService from '@app/services/injector.service';
import { useContext, useMemo, useState } from 'react';
import Textarea from '@app/components/controls/textarea/Textarea';
import { NotificationContext } from '@app/contexts/notificationContext';
import { NotificationType } from '@app/types/notification.type';
import validator from 'validator';
import { TranslationContext } from '@app/contexts/translationContext';

export default function Contacts() {
    const { contextTranslation } = useContext(TranslationContext);
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const TelegramService = injectorService.get('TelegramService');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const texts = useMemo(
        () => contextTranslation.Portfolio.contacts,
        [contextTranslation],
    );

    const nameMinLength = 5;
    const nameMaxLength = 50;
    const subjectMinLength = 5;
    const subjectMaxLength = 200;
    const messageMinLength = 5;
    const messageMaxLength = 1000;

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handlerSubmit(): Promise<void> {
        try {
            validateFields();

            await sendMessage();

            clearFields();

            setContextNotification([
                ...contextNotification,
                {
                    type: NotificationType.SUCCESS,
                    message: 'Message successfully sent',
                },
            ]);
        } catch (error: any) {
            console.log(error);
            
            setContextNotification([
                ...contextNotification,
                {
                    type: NotificationType.ERROR,
                    message: error.message,
                },
            ]);
        }
    }

    function validateFields(): void {
        const { name, email, subject, message } = formData;

        if (
            name.trim().length < nameMinLength ||
            name.trim().length > nameMaxLength
        ) {
            throw new Error(texts.form.fields.name.error);
        }

        if (!validator.isEmail(email)) {
            throw new Error(texts.form.fields.email.error);
        }

        if (
            subject.trim().length < subjectMinLength ||
            subject.trim().length > subjectMaxLength
        ) {
            throw new Error(texts.form.fields.subject.error);
        }

        if (
            message.trim().length < messageMinLength ||
            message.trim().length > messageMaxLength
        ) {
            throw new Error(texts.form.fields.message.error);
        }
    }

    async function sendMessage(): Promise<void> {
        const { name, email, subject, message } = formData;
        const formattedMessage = `${name} (${email})

<b>Subject</b>: ${subject}
${message}
`;

        await TelegramService.sendMessage(formattedMessage);
    }

    function clearFields(): void {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    }

    return (
        <section id="contacts" className="contacts">
            <SectionTitle
                title={{
                    defaultColorText: texts.title.foregraund[0],
                    primaryColorText: texts.title.foregraund[1],
                }}
                backgroundText={texts.title.background}
            />

            <div
                className="contacts_row row justify-content-between"
                data-aos="fade-left">
                <div className="contacts_row_info">
                    <h5>{texts.form.title}</h5>
                    <p>{texts.form.description}</p>
                    <SocialMediaLinks />
                </div>

                <form
                    className="contacts_row_form"
                    onSubmit={event => {
                        event.preventDefault();
                        handlerSubmit();
                    }}>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={texts.form.fields.name.placeholder}
                    />
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={texts.form.fields.email.placeholder}
                    />
                    <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={texts.form.fields.subject.placeholder}
                    />
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={texts.form.fields.message.placeholder}
                    />

                    <Button size={ButtonSize.FULL} label={texts.form.button} />
                </form>
            </div>
        </section>
    );
}
