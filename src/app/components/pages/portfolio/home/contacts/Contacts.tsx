/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Contacts.scss';
import SocialMediaLinks from '@app/components/common/socialMedia-links/SocialMediaLinks';
import Input from '@app/components/controls/input/Input';
import Button from '@app/components/controls/button/Button';
import { ButtonSize } from '@app/types/button.type';

export default function Contacts() {
    function sendMessage(): void {}

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
                    onSubmit={event => event.preventDefault()}>
                    <Input value="" placeholder="Your name" />
                    <Input value="" placeholder="Your email" />
                    <Input value="" placeholder="Email subject" />

                    <Button size={ButtonSize.FULL} label="Send message" />
                </form>
            </div>
        </section>
    );
}
