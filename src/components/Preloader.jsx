import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Aperture } from 'lucide-react';

const Preloader = ({ onLoaded }) => {
    const preloaderRef = useRef(null);
    const textRef = useRef(null);
    const shutterRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ onComplete: onLoaded });

        tl.from(textRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
            .to(shutterRef.current, {
                scale: 20,
                duration: 1.5,
                ease: 'expo.inOut',
                delay: 0.5,
            })
            .to(preloaderRef.current, {
                opacity: 0,
                duration: 0.5,
            }, '-=0.5');
    }, [onLoaded]);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 bg-background z-[100] flex justify-center items-center overflow-hidden"
        >
            <div
                ref={shutterRef}
                className="absolute text-accent"
            >
                <Aperture size={60} strokeWidth={1} />
            </div>
            <h1 ref={textRef} className="font-serif text-3xl text-accent">
                AS Photography
            </h1>
        </div>
    );
};

export default Preloader;