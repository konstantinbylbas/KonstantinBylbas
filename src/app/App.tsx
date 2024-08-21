/** @format */

import './App.scss';
import Footer from './components/common/footer/Footer';
import Notifications from './components/common/notifications/Notifications';
import NaughtsAndCrosses from './services/game/naughtsAndCrosses.service';
import injectorService from './services/injector.service';
import Router from './services/navigation.service';
import { TelegramService } from './services/telegram.service';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef } from 'react';
import { MagicParticle } from './services/cursor.service';

injectorService.register('NaughtsAndCrosses', NaughtsAndCrosses);
injectorService.register('TelegramService', TelegramService);

export default function App() {
    const canvas = useRef<HTMLCanvasElement>();
    const particles: MagicParticle[] = [];
    let lastX: number = 0;
    let lastY: number = 0;
    let isCursorMoving = false;

    useEffect(() => {
        Aos.init();

        document.addEventListener('mousemove', event => {
            if (particles.length === 0) {
                createParticles(event.clientX, event.clientY);
            }
            lastX = event.clientX;
            lastY = event.clientY;
            isCursorMoving = true;

            setTimeout(() => {
                isCursorMoving = false;
                particles.forEach(p => p.stopFollowingCursor());
            }, 100);
        });

        canvas.current = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;

        const context = canvas.current.getContext('2d')!;
        updateParticles(context);
    }, []);

    function createParticles(x: number, y: number) {
        particles.length = 0;
        for (let i = 0; i < 20; i++) {
            particles.push(new MagicParticle(x, y));
        }
    }

    function updateParticles(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, canvas.current!.width, canvas.current!.height);

        particles.forEach((particle, index) => {
            particle.update(lastX, lastY);
            particle.draw(context);

            if (particle.opacity <= 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(() => updateParticles(context));
    }

    return (
        <div className="app">
            <canvas id="canvas"></canvas>
                <main>
                    <Router />
                </main>
                <Notifications />
                <Footer />
        </div>
    );
}