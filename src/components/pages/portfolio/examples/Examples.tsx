/** @format */

import './Examples.scss';
import Slider from 'react-slick';
import { useContext, useMemo, useRef, useState } from 'react';
import { IconType, ImageType } from '@_types/image.type';
import { TranslationContext } from '@contexts/translationContext';
import { SectionTitle } from '@components/common';

export default function Examples() {
    const { contextTranslation } = useContext(TranslationContext);

    const [currentSlide, setCurrentSlide] = useState(0);

    const texts = useMemo(
        () => contextTranslation.Portfolio.examples,
        [contextTranslation],
    );

    const sliderRef = useRef<Slider>(null);

    const examples: { img: any; description: string; url: string }[] = [
        {
            img: ImageType.BRAND_BEAUTY,
            description: 'Brand Beauty by YY',
            url: 'https://brand-beauty.com/',
        },
        {
            img: '',
            description: '',
            url: '#',
        },
        {
            img: '',
            description: '',
            url: '#',
        },
        {
            img: '',
            description: '',
            url: '#',
        },
        {
            img: '',
            description: '',
            url: '#',
        },
    ];

    const isPrevDisabled = useMemo(() => currentSlide === 0, [currentSlide]);
    const isNextDisabled = useMemo(() => {
        const currentSettings: any = sliderRef.current?.props.responsive?.find(
            param => param.breakpoint < window.innerWidth,
        );

        if (!currentSettings || !currentSettings.settings) {
            return false;
        }

        if (
            currentSettings &&
            currentSettings.settings &&
            currentSlide + 1 + currentSettings.settings.slidesToShow >=
                examples.length
        ) {
            return true;
        }
        return false;
    }, [currentSlide]);

    const settings = {
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        afterChange: (current: any) => setCurrentSlide(current),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <section id="examples">
            <SectionTitle
                title={{
                    defaultColorText: texts.title.foregraund[0],
                    primaryColorText: texts.title.foregraund[1],
                }}
                backgroundText={texts.title.background}
            />

            <div className="examples_slider" data-aos="fade-left">
                <div className="examples_slider_controls">
                    <img
                        src={IconType.ARROW_LEFT}
                        alt="portfolio slider arrow left"
                        title="Go previous"
                        className={isPrevDisabled ? 'disabled' : ''}
                        onClick={prevSlide}
                    />
                    <img
                        src={IconType.ARROW_RIGHT}
                        alt="portfolio slider arrow right"
                        title="Go next"
                        className={isNextDisabled ? 'disabled' : ''}
                        onClick={nextSlide}
                    />
                </div>

                <Slider {...settings} ref={sliderRef}>
                    {examples.map((example, i) => (
                        <a
                            href={example.url}
                            target="_blank"
                            className="examples_slider_block"
                            key={`example #${i}`}>
                            <figure>
                                {example.img ? (
                                    <img
                                        src={example.img}
                                        alt={example.description}
                                    />
                                ) : (
                                    ''
                                )}
                            </figure>
                            <div className="examples_slider_block_description">
                                {example.description}
                            </div>
                        </a>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
