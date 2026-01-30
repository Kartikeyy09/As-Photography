import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.css'; // Import the CSS module

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 768) return; // Disable on mobile

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            gsap.to(cursorDotRef.current, { x: clientX, y: clientY, duration: 0.2 });
            gsap.to(cursorOutlineRef.current, { x: clientX, y: clientY, duration: 0.4 });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="hidden md:block">
            {/* Use the imported styles object */}
            <div ref={cursorDotRef} className={styles.cursorDot}></div>
            <div ref={cursorOutlineRef} className={styles.cursorOutline}></div>
        </div>
    );
};

export default CustomCursor;