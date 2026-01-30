import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Check,
    Award,
    Target,
    Lightbulb,
    Users,
    Camera,
    X,
    Sparkles,
    ArrowRight,
} from 'lucide-react';

import AnimatedPage from '../layouts/AnimatedPage';
import { teamMembers, stats, portfolioData } from '../data/data';
import styles from './About.module.css';
import '../index.css';

gsap.registerPlugin(ScrollTrigger);

/* Count-up that preserves suffix like “+” using GSAP on a JS object (no DOM target). */
const CountUp = ({ value, startAt = 0 }) => {
    const ref = useRef(null);
    const [display, setDisplay] = useState(`${startAt}`);

    React.useEffect(() => {
        if (!ref.current) return;
        const match = `${value}`.match(/^(\d+)(.*)$/);
        const target = match ? parseInt(match[1], 10) : 0;
        const suffix = match ? match[2] : '';

        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 85%',
            onEnter: () => {
                const obj = { n: startAt };
                const tween = gsap.to(obj, {
                    n: target,
                    duration: 1.2,
                    ease: 'power2.out',
                    onUpdate: () => setDisplay(`${Math.floor(obj.n)}${suffix}`),
                });
                return () => tween.kill();
            },
            once: true,
        });

        return () => trigger.kill();
    }, [value, startAt]);

    return <span ref={ref}>{display}</span>;
};

/* Tilt helpers on hover (safe because we only target currentTarget) */
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

/* Team Member Modal */
const MemberModal = ({ open, onClose, member }) => {
    if (!open || !member) return null;
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-3xl rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-black text-white"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 text-white/80 hover:text-white p-2 rounded-md"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="grid md:grid-cols-[160px_1fr] gap-6 p-6 md:p-8">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-yellow-500/40 shadow-lg mx-auto md:mx-0"
                            />
                            <div>
                                <h3 className="text-2xl font-serif">{member.name}</h3>
                                <div className="text-yellow-500 font-semibold mt-1">{member.role}</div>
                                <div className="text-sm text-white/70 mt-1">{member.experience}</div>
                                <p className="text-white/80 mt-4 leading-relaxed">{member.bio}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const About = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    // Behind-the-scenes film from data
    const studioFilm = useMemo(
        () => portfolioData.find((p) => p.category === 'films' && p.type === 'video'),
        []
    );

    // Framer Motion variants (alternate to GSAP for scroll reveal)
    const gridVariants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.08 },
        },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const milestones = [
        { year: '2011', title: 'Studio Founded', desc: 'Born from a love of visual storytelling.' },
        { year: '2015', title: '100 Weddings', desc: 'A hundred stories preserved with care.' },
        { year: '2022', title: 'Industry Recognition', desc: 'Awarded for Best Wedding Photography.' },
        { year: '2024', title: '1,000+ Happy Clients', desc: 'Trusted by couples and brands alike.' },
    ];

    return (
        <AnimatedPage>
            {/* Hero */}
            <section className="relative h-[80vh] md:h-[84vh] w-full flex items-center justify-center text-center overflow-hidden bg-black">
                <div
                    className={`${styles.kenburnsBg} absolute inset-0 bg-cover bg-center`}
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06] pointer-events-none`} />

                <div className="relative z-10 text-white px-6 max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-semibold tracking-widest text-yellow-500 uppercase text-sm"
                    >
                        Our Story
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-4 text-5xl md:text-6xl font-serif"
                    >
                        The Soul of the Studio
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-4 max-w-2xl mx-auto text-white/85 text-lg"
                    >
                        Preserving moments, creating art, and building relationships.
                    </motion.p>

                    {/* Hero Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="mt-10 grid grid-cols-3 gap-6 max-w-xl mx-auto"
                    >
                        {stats.slice(0, 3).map((s, i) => (
                            <div
                                key={i}
                                className="bg-white/5 border border-white/10 rounded-lg py-4 px-3 text-center"
                            >
                                <div className="text-2xl font-bold text-yellow-500">
                                    <CountUp value={s.value} />
                                </div>
                                <div className="text-xs text-white/70 mt-1 uppercase tracking-wide">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
                >
                    <Sparkles className="w-6 h-6" />
                </motion.div>
            </section>

            {/* Intro */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl lg:text-4xl font-serif mb-8 text-gray-900"
                        >
                            Crafting Memories, <br /> One Frame at a Time.
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-6 text-gray-700 leading-relaxed text-lg"
                        >
                            <p>
                                AS Photography was born from a shared love for visual storytelling. We believe
                                every wedding, event, and portrait carries a unique energy—an aura—deserving to
                                be captured with artistry and care.
                            </p>
                            <p>
                                Our philosophy blends documentary honesty with fine-art composition. We’re not
                                just photographers—we’re historians of joy, curators of love, and artists
                                dedicated to your story.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Detail shot of wedding rings"
                            className="rounded-lg shadow-lg w-full h-full object-cover hover:shadow-2xl transition-shadow duration-300"
                        />
                        <motion.img
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Photographer editing"
                            className="rounded-lg shadow-lg w-full h-full object-cover mt-8 hover:shadow-2xl transition-shadow duration-300"
                        />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-serif text-center mb-16 text-gray-900"
                    >
                        Our Values
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Target, title: 'Excellence', desc: 'We strive for perfection in every detail' },
                            { icon: Lightbulb, title: 'Innovation', desc: 'Always exploring new techniques and styles' },
                            { icon: Award, title: 'Quality', desc: 'Premium service and world-class results' },
                            { icon: Check, title: 'Reliability', desc: 'Dependable partners in your special moments' },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="bg-white p-8 rounded-lg border border-gray-200 hover:border-yellow-600/40 shadow-sm hover:shadow-md transition-all duration-300 text-center"
                            >
                                <div className="inline-block p-4 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full mb-4 shadow-lg">
                                    <value.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-serif mb-3 text-gray-900">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Milestones Timeline */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-serif text-center mb-16 text-gray-900"
                    >
                        Milestones
                    </motion.h2>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-600 via-gray-300 to-transparent" />
                        <div className="space-y-12">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={m.year}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className={`relative grid md:grid-cols-2 gap-6 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}
                                >
                                    <div className={`${i % 2 === 0 ? 'order-1 md:text-right' : 'order-1'}`}>
                                        <div className="inline-flex items-center gap-3">
                                            <span className="text-2xl font-serif text-yellow-600">{m.year}</span>
                                            <span className="hidden md:block w-3 h-3 rounded-full bg-yellow-600 shadow ring-4 ring-yellow-600/20" />
                                        </div>
                                        <h3 className="text-2xl font-serif text-gray-900 mt-2">{m.title}</h3>
                                        <p className="text-gray-600 mt-2">{m.desc}</p>
                                    </div>
                                    <div className={`${i % 2 === 0 ? 'order-2' : 'order-2 md:order-1'}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team (Framer Motion reveal; no GSAP targets) */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Meet the Artists</h2>
                        <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
                            The passionate individuals dedicated to capturing your memories with excellence and care.
                        </p>
                    </div>

                    <motion.div
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className="team-member-card text-center bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl hover:bg-white transition-all duration-300 will-change-transform"
                                onMouseMove={onTiltMove}
                                onMouseLeave={onTiltLeave}
                            >
                                <img
                                    src={member.image || '/placeholder.svg'}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-500 shadow-lg"
                                />
                                <h3 className="font-serif text-2xl text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-yellow-600 font-semibold">{member.role}</p>
                                <p className="text-sm text-yellow-500 mb-4">{member.experience}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>

                                <button
                                    onClick={() => {
                                        setSelected(member);
                                        setOpen(true);
                                    }}
                                    className="mt-5 inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                                >
                                    Read full bio <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Behind the scenes film */}
            {studioFilm && (
                <section className="py-16 md:py-24 bg-gray-950">
                    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -18 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
                        >
                            <video
                                src={studioFilm.src}
                                poster={studioFilm.thumbnail}
                                controls
                                className="w-full h-[300px] md:h-[420px] object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 18 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                                Behind the Scenes
                            </h3>
                            <p className="text-white/75">
                                Get a glimpse into our approach—discreet coverage, creative direction, and a
                                genuine connection with our clients that makes the magic real.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-2 text-white/80">
                                    <Camera className="w-4 h-4 text-yellow-500" /> Multi-cam setups
                                </span>
                                <span className="inline-flex items-center gap-2 text-white/80">
                                    <Users className="w-4 h-4 text-yellow-500" /> Friendly, pro crew
                                </span>
                                <span className="inline-flex items-center gap-2 text-white/80">
                                    <Award className="w-4 h-4 text-yellow-500" /> Award-winning edits
                                </span>
                            </div>
                            <div className="mt-6">
                                <Link
                                    to="/services"
                                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
                                >
                                    Explore Services <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
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
                        className="text-4xl md:text-5xl font-serif mb-4 text-white"
                    >
                        Ready to work together?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="max-w-2xl mx-auto mb-8 text-white/90"
                    >
                        Let’s craft something timeless. Get in touch and tell us your vision.
                    </motion.p>
                    <Link
                        to="/contact"
                        className="inline-block bg-black text-yellow-500 font-bold py-4 px-12 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.03] shadow-lg"
                    >
                        Book a Consultation
                    </Link>
                </div>
            </section>

            {/* Team modal */}
            <MemberModal open={open} onClose={() => setOpen(false)} member={selected} />
        </AnimatedPage>
    );
};

export default About;