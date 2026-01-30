import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsapScroll = (animation, start = 'top 80%') => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: el,
                start: start,
                onEnter: () => animation(gsap),
                once: true // Animation will only play once
            });
        }, el);

        return () => ctx.revert();
    }, [animation, start]);

    return ref;
};

export default useGsapScroll;