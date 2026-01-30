import React from 'react';
import { motion } from 'framer-motion';

const defaultVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: 'easeInOut' } },
};

const AnimatedPage = ({
    children,
    variants = defaultVariants,
    initial = 'initial',
    animate = 'animate',
    exit = 'exit',
    className = '',
}) => {
    return (
        <motion.div variants={variants} initial={initial} animate={animate} exit={exit} className={className}>
            {children}
        </motion.div>
    );
};

export default AnimatedPage;