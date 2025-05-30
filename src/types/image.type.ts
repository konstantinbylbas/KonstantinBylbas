/** @format */

import HOME from '@assets/images/nav/home.svg';
import PERSON from '@assets/images/nav/person.svg';
import BRIEFCASE from '@assets/images/nav/briefcase.svg';
import MAIL from '@assets/images/nav/mail.svg';
import GENERATOR_STRING from '@assets/images/nav/generator-string.svg';
import NAUGHTS_AND_CROSSES from '@assets/images/nav/naughts-and-crosses.svg';
import PLATFORM from '@assets/images/nav/platform.svg';
import BURGER from '@assets/images/burger.svg';
import ARROW_LEFT from '@assets/images/left.svg';
import ARROW_RIGHT from '@assets/images/right.svg';
import LANGUAGE from '@assets/images/language.svg';

const IconType: { [key: string]: string } = {
    HOME,
    PERSON,
    BRIEFCASE,
    MAIL,
    GENERATOR_STRING,
    NAUGHTS_AND_CROSSES,
    PLATFORM,
    BURGER,
    ARROW_LEFT,
    ARROW_RIGHT,
    LANGUAGE,
};

const ImageType: { [key: string]: string } = {
    LOGO: require('@assets/images/logo.webp'),
    AUTHOR: require('@assets/images/author.webp'),
    BRAND_BEAUTY: require('@assets/images/portfolio/brandBeauty.webp'),
};

export { IconType, ImageType };
