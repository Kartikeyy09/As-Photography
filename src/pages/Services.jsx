import React from 'react';
import AnimatedPage from '../layouts/AnimatedPage';
import { services } from '../data/data';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import styles from './Services.module.css';
import '../index.css';

// Tilt helpers (no ScrollTrigger; safe on currentTarget)
const onTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformOrigin: 'center',
        duration: 0.3,
        ease: 'power2.out',
    });
};
const onTiltLeave = (e) => {
    gsap.to(e.currentTarget, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.45,
        ease: 'power3.out',
    });
};

// Variants
const blockVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.08 } },
};
const imageVariants = {
    hidden: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const textUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Services = () => {
    return (
        <AnimatedPage>
            {/* Hero */}
            <section className="relative pt-48 pb-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06] pointer-events-none`} />
                <div className="container mx-auto px-6 relative">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-semibold tracking-widest text-yellow-600 uppercase text-sm text-center"
                    >
                        What We Do
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-6xl md:text-7xl font-serif text-center text-white"
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg text-center"
                    >
                        Bespoke photography and cinematography packages designed to tell your unique story
                        with elegance, artistry, and professionalism.
                    </motion.p>

                    {/* Quick jump nav */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.14 }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-3"
                        aria-label="Quick service navigation"
                    >
                        {services.map((s) => (
                            <a
                                key={s.slug}
                                href={`#${s.slug}`}
                                className="inline-flex items-center gap-2 text-sm bg-white/5 border border-white/10 text-white px-4 py-2 rounded-full hover:bg-white/10 transition"
                            >
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                {s.title}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services list */}
            <section className="py-20 md:py-28 bg-black">
                <div className="container mx-auto px-6 space-y-28">
                    {services.map((service, index) => {
                        const dir = index % 2 === 0 ? -1 : 1; // -1: image comes from left, 1: right
                        return (
                            <motion.div
                                key={service.slug}
                                id={service.slug}
                                variants={blockVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                className="service-block grid md:grid-cols-2 gap-12 md:gap-20 items-center"
                            >
                                {/* Image */}
                                <motion.div
                                    custom={dir}
                                    variants={imageVariants}
                                    className={`service-image image-hover-zoom ${dir > 0 ? 'md:order-2' : ''} rounded-2xl overflow-hidden will-change-transform`}
                                    onMouseMove={onTiltMove}
                                    onMouseLeave={onTiltLeave}
                                >
                                    <img
                                        src={service.image || '/placeholder.svg'}
                                        alt={service.title}
                                        className="w-full h-auto object-cover shadow-2xl hover:shadow-yellow-600/30 transition-all duration-500"
                                    />
                                </motion.div>

                                {/* Content */}
                                <div className="service-content">
                                    <motion.h2 variants={textUp} className="text-4xl lg:text-5xl font-serif mb-4 text-white">
                                        {service.title}
                                    </motion.h2>
                                    <motion.p
                                        variants={textUp}
                                        className="italic text-yellow-500 font-semibold mb-6 text-lg"
                                    >
                                        {service.tagline}
                                    </motion.p>
                                    <motion.p
                                        variants={textUp}
                                        className="text-gray-300 leading-relaxed mb-8 text-lg"
                                    >
                                        {service.description}
                                    </motion.p>

                                    <motion.div
                                        variants={textUp}
                                        className="mb-6 bg-gray-900 p-4 rounded-lg inline-block border border-gray-800"
                                    >
                                        <p className="text-gray-400">
                                            Starting from{' '}
                                            <span className="text-2xl font-bold text-yellow-500">{service.pricing}</span>
                                        </p>
                                    </motion.div>

                                    <motion.h4 variants={textUp} className="font-semibold text-white mb-6 text-lg">
                                        What's Included:
                                    </motion.h4>

                                    <motion.ul
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        className="space-y-3"
                                    >
                                        {service.included.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                variants={{
                                                    hidden: { opacity: 0, x: -12 },
                                                    show: {
                                                        opacity: 1,
                                                        x: 0,
                                                        transition: { duration: 0.45, delay: i * 0.05, ease: 'easeOut' },
                                                    },
                                                }}
                                                className="flex items-start gap-3"
                                            >
                                                <Check className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-300">{item}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    <motion.div variants={textUp} className="mt-8 flex flex-wrap gap-3">
                                        <Link
                                            to="/services"
                                            className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                                        >
                                            Learn more <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            to={`/contact?service=${encodeURIComponent(service.slug)}`}
                                            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
                                        >
                                            Enquire now <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-28 bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-600 text-white relative overflow-hidden">
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06]`} />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-serif mb-6"
                    >
                        Have a Custom Project in Mind?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="max-w-2xl mx-auto mb-10 text-white/90 text-lg"
                    >
                        We love creative challenges. Let's talk about your vision and how we can bring it to
                        life with our expertise.
                    </motion.p>
                    <Link
                        to="/contact"
                        className="inline-block bg-black text-yellow-500 font-bold py-4 px-12 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.03] shadow-lg"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Services;