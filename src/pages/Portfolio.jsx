import React, { useEffect, useMemo, useState } from 'react';
import AnimatedPage from '../layouts/AnimatedPage';
import { portfolioData } from '../data/data';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { Play, Video as VideoIcon, Images as ImagesIcon, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Portfolio.module.css';
import '../index.css';

const baseFilters = [
    { name: 'All', value: 'all' },
    { name: 'Wedding', value: 'wedding' },
    { name: 'Pre-Wedding', value: 'pre-wedding' },
    { name: 'Events', value: 'events' },
    { name: 'Model', value: 'model' },
    { name: 'Films', value: 'films' },
];

const categoryBadge = (cat) => {
    switch (cat) {
        case 'wedding':
            return 'bg-pink-500/90 text-white';
        case 'pre-wedding':
            return 'bg-purple-600/90 text-white';
        case 'events':
            return 'bg-blue-600/90 text-white';
        case 'model':
            return 'bg-emerald-600/90 text-white';
        case 'films':
            return 'bg-rose-600/90 text-white';
        default:
            return 'bg-gray-700/90 text-white';
    }
};

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Filter counts for chips
    const filters = useMemo(() => {
        const counts = portfolioData.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            acc.all = (acc.all || 0) + 1;
            return acc;
        }, {});
        return baseFilters.map((f) => ({ ...f, count: counts[f.value] || 0 }));
    }, []);

    useEffect(() => {
        setFilteredData(
            activeFilter === 'all'
                ? portfolioData
                : portfolioData.filter((item) => item.category === activeFilter)
        );
        setLightboxIndex(0);
    }, [activeFilter]);

    // Build slides for lightbox (supports both images and mp4 videos)
    const lightboxSlides = useMemo(
        () =>
            filteredData.map((item) =>
                item.type === 'video'
                    ? {
                        type: 'video',
                        sources: [{ src: item.src, type: 'video/mp4' }],
                        poster: item.thumbnail,
                        autoPlay: false,
                        controls: true,
                    }
                    : { src: item.src }
            ),
        [filteredData]
    );

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const chipVariants = {
        hidden: { opacity: 0, y: 8 },
        show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04 } }),
    };

    return (
        <AnimatedPage>
            {/* Hero */}
            <section className="pt-48 pb-20 bg-gray-50 text-center relative overflow-hidden">
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06] pointer-events-none`} />
                <div className="container mx-auto px-6 relative">
                    <p className="font-semibold tracking-widest text-yellow-600 uppercase text-sm">Our Work</p>
                    <h1 className="mt-4 text-5xl md:text-6xl font-serif text-gray-900">The Portfolio</h1>
                    <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
                        A curated collection of moments and stories we’ve had the honor of capturing, showcasing our artistry and dedication.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-2">
                            <ImagesIcon className="w-4 h-4" /> Photos
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <VideoIcon className="w-4 h-4" /> Films
                        </span>
                    </div>
                </div>
            </section>

            {/* Sticky filter bar */}
            <div className="sticky top-16 z-20 bg-white/70 supports-[backdrop-filter]:bg-white/55 backdrop-blur border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                        {filters.map((filter, i) => (
                            <motion.button
                                key={filter.value}
                                custom={i}
                                variants={chipVariants}
                                initial="hidden"
                                animate="show"
                                onClick={() => setActiveFilter(filter.value)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${activeFilter === filter.value
                                        ? 'bg-yellow-600 text-white border-yellow-600 shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-yellow-600'
                                    }`}
                            >
                                {filter.name}
                                <span
                                    className={`ml-2 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full text-xs ${activeFilter === filter.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {filter.count}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pinterest-style Masonry using CSS columns */}
            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-6">
                    {filteredData.length === 0 ? (
                        <div className="text-center text-gray-500 py-20">No items found.</div>
                    ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                            <AnimatePresence>
                                {filteredData.map((item, index) => {
                                    const isVideo = item.type === 'video';
                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 16 }}
                                            transition={{ duration: 0.4 }}
                                            className={`group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden mb-6 ${styles.avoidBreak}`}
                                            // Click-to-open lightbox only for images; videos use inline player
                                            onClick={!isVideo ? () => openLightbox(index) : undefined}
                                        >
                                            {/* Media */}
                                            <div className="relative">
                                                {!isVideo ? (
                                                    <img
                                                        src={item.src}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                        style={{ display: 'block' }}
                                                    />
                                                ) : (
                                                    <div className="relative">
                                                        <video
                                                            className={`${styles.video} w-full h-auto block`}
                                                            poster={item.thumbnail}
                                                            src={item.src}
                                                            preload="metadata"
                                                            controls
                                                            playsInline
                                                        />
                                                        {/* Optional: open in lightbox control for larger view */}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openLightbox(index);
                                                            }}
                                                            className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-white/95 text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow hover:bg-white"
                                                        >
                                                            <Maximize2 className="w-3.5 h-3.5" /> View Large
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Overlay gradient (does not block video controls) */}
                                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {/* Category pill */}
                                                <div className="absolute top-3 left-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryBadge(item.category)}`}>
                                                        {item.category}
                                                    </span>
                                                </div>

                                                {/* Play badge hint for videos (purely decorative; controls are visible) */}
                                                {isVideo && (
                                                    <div className="pointer-events-none absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="bg-white/95 p-4 rounded-full shadow-lg">
                                                            <Play className="w-7 h-7 text-gray-900" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Caption */}
                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                                                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                    <h4 className="text-white font-serif text-xl">{item.title}</h4>
                                                    {item.year && <p className="text-yellow-300 text-xs mt-0.5">{item.year}</p>}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox for images and videos */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxSlides}
                index={lightboxIndex}
                plugins={[Thumbnails, Video]}
                carousel={{ finite: false }}
                thumbnails={{ vignette: false }}
                animation={{ swipe: 300 }}
                controller={{ closeOnBackdropClick: true }}
            />
        </AnimatedPage>
    );
};

export default Portfolio;