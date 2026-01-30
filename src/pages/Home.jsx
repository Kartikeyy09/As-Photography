import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowDown,
    ArrowRight,
    Star,
    Sparkles,
    Play,
    X,
    Check
} from 'lucide-react';

import AnimatedPage from '../layouts/AnimatedPage';
import {
    featuredWork,
    philosophy,
    marqueeServices,
    stats,
    testimonials,
    processSteps,
    services,
    blogPosts,
    portfolioData
} from '../data/data';

import styles from './Home.module.css';
import '../index.css';

gsap.registerPlugin(ScrollTrigger);

// Lightbox (image/video)
const Lightbox = ({ open, onClose, item }) => {
    if (!open || !item) return null;

    const isVideo = item.type === 'video';

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-5xl"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close lightbox"
                            className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-2"
                        >
                            <X className="w-5 h-5" /> Close
                        </button>

                        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                            {isVideo ? (
                                <video
                                    src={item.src}
                                    poster={item.thumbnail}
                                    controls
                                    autoPlay
                                    className="w-full h-[60vh] md:h-[70vh] object-cover"
                                />
                            ) : (
                                <img
                                    src={item.image || item.src}
                                    alt={item.title}
                                    className="w-full object-cover"
                                />
                            )}
                        </div>

                        <div className="mt-4 text-white/80">
                            <div className="text-lg font-semibold">{item.title}</div>
                            {item.year && <div className="text-sm text-white/60">{item.year}</div>}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Count-up for stats
const CountUp = ({ value }) => {
    const ref = useRef(null);
    const [display, setDisplay] = useState('0');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 85%',
            onEnter: () => setStarted(true),
        });
        return () => trigger.kill();
    }, []);

    useEffect(() => {
        if (!started) return;
        const match = `${value}`.match(/^(\d+)(.*)$/); // extract number + suffix
        const target = match ? parseInt(match[1], 10) : 0;
        const suffix = match ? match[2] : '';

        const obj = { n: 0 };
        const tween = gsap.to(obj, {
            n: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => setDisplay(`${Math.floor(obj.n)}${suffix}`),
        });
        return () => tween.kill();
    }, [started, value]);

    return <span ref={ref}>{display}</span>;
};

// Tilt helpers
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

const Home = () => {
    const featuredRef = useRef(null);
    const statsRef = useRef(null);
    const philosophyRef = useRef(null);
    const heroRef = useRef(null);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxItem, setLightboxItem] = useState(null);

    // pick a film for the lightbox "Watch a Film" CTA
    const featuredFilm = useMemo(
        () =>
            portfolioData.find((p) => p.category === 'films' && p.type === 'video') ||
            null,
        []
    );

    // GSAP effects
    useEffect(() => {
        // Featured item hover timelines (scale image + overlay)
        const items = gsap.utils.toArray('.featured-item');
        const listeners = [];

        items.forEach((item) => {
            const image = item.querySelector('img');
            const content = item.querySelector('.featured-content');
            const title = item.querySelector('h3');
            const category = item.querySelector('p');

            const tl = gsap.timeline({ paused: true });
            tl.to(image, { scale: 1.15, duration: 0.8, ease: 'power2.inOut' })
                .to(
                    content,
                    { backgroundColor: 'rgba(0,0,0,0.85)', duration: 0.6, ease: 'power2.inOut' },
                    0
                )
                .fromTo(
                    title,
                    { y: 14, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                    0.1
                )
                .fromTo(
                    category,
                    { y: 14, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                    0.18
                );

            const enter = () => tl.play();
            const leave = () => tl.reverse();

            item.addEventListener('mouseenter', enter);
            item.addEventListener('mouseleave', leave);
            listeners.push({ item, enter, leave });
        });

        // Section title in-view
        gsap.utils.toArray('.section-title').forEach((title) => {
            gsap.from(title, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                },
            });
        });

        // Stats items
        gsap.utils.toArray('.stat-item').forEach((el, index) => {
            gsap.from(el, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 80%',
                },
            });
        });

        // Testimonials slight slide-in
        gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
            gsap.from(card, {
                x: index % 2 === 0 ? -30 : 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
            });
        });

        // Hero parallax overlay (very subtle)
        if (heroRef.current) {
            gsap.to(heroRef.current, {
                backgroundPosition: '50% 55%',
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }

        return () => {
            // Cleanup listeners
            listeners.forEach(({ item, enter, leave }) => {
                item.removeEventListener('mouseenter', enter);
                item.removeEventListener('mouseleave', leave);
            });
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    // Lightbox handlers
    const openFilm = () => {
        if (featuredFilm) {
            setLightboxItem(featuredFilm);
            setLightboxOpen(true);
        }
    };

    return (
        <AnimatedPage>
            {/* Hero */}
            <section
                ref={heroRef}
                className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden bg-black"
            >
                <div
                    className={`absolute inset-0 bg-cover bg-center ${styles.kenburnsBg}`}
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/75" />
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06] pointer-events-none`} />

                <div className="relative z-10 text-white px-6 max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight"
                    >
                        Timeless Stories,
                        <span className="block">
                            <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                                Artfully Told.
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/85"
                    >
                        We capture fleeting moments and transform them into eternal art—celebrating love,
                        joy, and the beauty of life’s most precious memories.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/portfolio"
                            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-yellow-600/40"
                        >
                            View Our Portfolio
                        </Link>
                        <button
                            onClick={openFilm}
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300"
                        >
                            <Play className="w-5 h-5" />
                            Watch a Film
                        </button>
                    </motion.div>

                    {/* Social proof mini badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45 }}
                        className="mt-8 flex items-center justify-center gap-6 text-white/80"
                    >
                        <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            500+ Weddings
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            150+ Films
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            34 Years Experience
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <ArrowDown className="text-white w-7 h-7" />
                </motion.div>
            </section>

            {/* Marquee */}
            <section className="py-7 bg-gradient-to-r from-gray-950 via-black to-gray-950 text-white border-y border-yellow-600/20 overflow-hidden">
                <div className={`${styles.marquee} ${styles.edgeFade}`}>
                    <div className={`${styles.marqueeInner}`}>
                        {[...marqueeServices, ...marqueeServices].map((service, index) => (
                            <div key={index} className="flex items-center mx-8">
                                <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
                                <span className="text-base md:text-lg font-serif text-gray-200">
                                    {service}
                                </span>
                                <span className="text-yellow-600 mx-6">•</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Creations */}
            <section ref={featuredRef} className="py-20 md:py-32 bg-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title text-5xl md:text-6xl font-serif mb-4 text-white">
                            Featured Creations
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            A selection of our most celebrated works, each telling a unique story
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 h-[80vh] min-h-[600px]">
                        {featuredWork.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                onMouseMove={onTiltMove}
                                onMouseLeave={onTiltLeave}
                                className={`featured-item relative rounded-xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 ${item.gridClass} will-change-transform`}
                                onClick={() => {
                                    setLightboxItem({ type: 'image', ...item, src: item.image });
                                    setLightboxOpen(true);
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="featured-content absolute inset-0 bg-black/30 p-6 flex flex-col justify-end transition-all duration-500">
                                    <h3 className="text-white font-serif text-3xl opacity-0">
                                        {item.title}
                                    </h3>
                                    <p className="text-yellow-400 font-semibold opacity-0">{item.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center text-yellow-500 font-semibold group text-lg hover:text-yellow-400 transition-all duration-300"
                        >
                            Explore All Projects
                            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Film Spotlight */}
            {featuredFilm && (
                <section className="py-16 md:py-24 bg-gray-950">
                    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
                        >
                            <button
                                onClick={() => {
                                    setLightboxItem(featuredFilm);
                                    setLightboxOpen(true);
                                }}
                                className="group w-full relative"
                            >
                                <img
                                    src={featuredFilm.thumbnail}
                                    alt={featuredFilm.title}
                                    className="w-full h-[300px] md:h-[420px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-full border border-white/15 shadow-lg group-hover:scale-105 transition">
                                        <Play className="w-5 h-5" />
                                        Watch: {featuredFilm.title}
                                    </div>
                                </div>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                                Cinematic Wedding Films
                            </h3>
                            <p className="text-white/70 mb-6">
                                Narrative-driven, color-graded, and sound-designed films that feel like a movie.
                                From heartfelt vows to the wild dance floor—your story, beautifully directed.
                            </p>
                            <ul className="space-y-2 text-white/80">
                                {[
                                    '5–7 minute cinematic highlight film',
                                    'Full documentary edit of ceremony & speeches',
                                    'Professional audio + licensed music',
                                    'Delivered in 4K'
                                ].map((line, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm">{line}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    to="/services"
                                    className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-400"
                                >
                                    See Film Packages <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                                >
                                    Enquire Now <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Stats */}
            <section ref={statsRef} className="py-20 md:py-28 bg-gray-950">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-item p-8 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 hover:border-yellow-600/50 transition-all duration-300"
                                whileHover={{ y: -4 }}
                            >
                                <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
                                    <CountUp value={stat.value} />
                                </div>
                                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wide">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services teaser */}
            <section className="py-20 md:py-28 bg-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="section-title text-5xl md:text-6xl font-serif mb-4 text-white">
                            What We Do
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            A blend of fine-art aesthetics and documentary realism—crafted for impact.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((svc, i) => (
                            <motion.div
                                key={svc.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="group rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-yellow-600/40 transition-all"
                            >
                                <div className="h-40 overflow-hidden">
                                    <img
                                        src={svc.image}
                                        alt={svc.title}
                                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif text-white">{svc.title}</h3>
                                    <p className="text-sm text-white/70 mt-2 line-clamp-3">{svc.tagline}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-yellow-500 text-sm font-semibold">
                                            {svc.pricing}
                                        </span>
                                        <Link
                                            to="/services"
                                            className="text-sm inline-flex items-center gap-1 text-white/80 hover:text-white"
                                        >
                                            Learn more <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-20 md:py-28 bg-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title text-5xl md:text-6xl font-serif mb-4 text-white">
                            Our Philosophy
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            The principles that guide every frame we capture
                        </p>
                    </motion.div>

                    <div ref={philosophyRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {philosophy.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ y: -5 }}
                                className="text-center p-8 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-600/50 transition-all duration-300"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: 3 }}
                                    className="inline-block p-4 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full mb-4 shadow-lg"
                                >
                                    <item.icon className="w-6 h-6 text-white" />
                                </motion.div>
                                <h3 className="text-2xl font-serif mb-3 text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 md:py-28 bg-gray-950">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title text-5xl md: text-6xl font-serif mb-4 text-white">
                            What Clients Say
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Hear from couples and clients who trust us with their most special moments
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="testimonial-card bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-yellow-600/50"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 italic text-sm leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-yellow-600/30"
                                    />
                                    <div>
                                        <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 md:py-28 bg-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title text-5xl md:text-6xl font-serif mb-4 text-white">
                            Our Process
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            From consultation to delivery, we ensure a seamless experience
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="relative p-8 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-600/50 transition-all duration-300"
                            >
                                <div className="text-5xl font-bold text-yellow-600/30 mb-4">{step.number}</div>
                                <h3 className="text-2xl font-serif text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                {index < processSteps.length - 1 && (
                                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                                        <ArrowRight className="w-8 h-8 text-yellow-600/50" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* From the Journal */}
            {blogPosts?.length > 0 && (
                <section className="py-20 md:py-28 bg-gray-950">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <h2 className="section-title text-5xl md:text-6xl font-serif mb-4 text-white">
                                From the Journal
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Behind-the-scenes, tips, and thoughts from our team
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {blogPosts.slice(0, 3).map((post, i) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-yellow-600/40 transition-all"
                                >
                                    <div className="h-44 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-xs uppercase tracking-wide text-white/60">
                                            {post.category} • {post.readTime}
                                        </div>
                                        <h3 className="text-white font-serif text-xl mt-2 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-white/70 text-sm mt-2 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-4 text-sm text-white/60">
                                            By {post.author} — {new Date(post.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-400"
                            >
                                Read the Journal <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-20 md:py-28 bg-gradient-to-r from-yellow-600 to-yellow-700 relative overflow-hidden">
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06]`} />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-serif mb-6 text-white"
                    >
                        Ready to Tell Your Story?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl mx-auto mb-10 text-white/90 text-lg"
                    >
                        Let’s create something extraordinary together. Get in touch today to book your session.
                    </motion.p>
                    <Link
                        to="/contact"
                        className="inline-block bg-black text-yellow-500 font-bold py-4 px-12 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.03] shadow-lg"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>

            {/* Lightbox */}
            <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} item={lightboxItem} />
        </AnimatedPage>
    );
};

export default Home;