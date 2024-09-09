/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Examples.scss';
import Slider from 'react-slick';
import { useContext, useMemo, useRef, useState } from 'react';
import { ImageType } from '@app/types/image.type';
import { TranslationContext } from '@app/contexts/translationContext';

export default function Examples() {
    const { contextTranslation } = useContext(TranslationContext);

    const [currentSlide, setCurrentSlide] = useState(0);

    const texts = useMemo(
        () => contextTranslation.Portfolio.examples,
        [contextTranslation],
    );

    const sliderRef = useRef<Slider>(null);

    const examples: { img: any; description: string }[] = [
        {
            img: '',
            description: 'Example 1',
        },
        {
            img: '',
            description: 'Example 2',
        },
        {
            img: '',
            description: 'Example 3',
        },
        {
            img: '',
            description: 'Example 4',
        },
        {
            img: '',
            description: 'Example 5',
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
                        src={ImageType.ARROW_LEFT}
                        alt="portfolio slider arrow left"
                        title="Go previous"
                        className={isPrevDisabled ? 'disabled' : ''}
                        onClick={prevSlide}
                    />
                    <img
                        src={ImageType.ARROW_RIGHT}
                        alt="portfolio slider arrow right"
                        title="Go next"
                        className={isNextDisabled ? 'disabled' : ''}
                        onClick={nextSlide}
                    />
                </div>

                <Slider {...settings} ref={sliderRef}>
                    {examples.map((example, i) => (
                        <div
                            className="examples_slider_block"
                            key={`example #${i}`}>
                            <figure></figure>
                            <div className="examples_slider_block_description">
                                {example.description}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
