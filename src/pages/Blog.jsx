import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../layouts/AnimatedPage';
import { blogPosts } from '../data/data';
import {
    Calendar,
    User,
    Clock,
    ArrowRight,
    Search,
    LayoutGrid,
    List,
    Tag,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import '../index.css';

const Blog = () => {
    // newest first
    const sortedPosts = useMemo(
        () => [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)),
        []
    );

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))],
        []
    );

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [query, setQuery] = useState('');
    const [view, setView] = useState('grid'); // 'grid' | 'list'

    // counts for chips
    const categoryCounts = useMemo(() => {
        const counts = blogPosts.reduce(
            (acc, p) => {
                acc.all += 1;
                acc[p.category] = (acc[p.category] || 0) + 1;
                return acc;
            },
            { all: 0 }
        );
        return counts;
    }, []);

    // filtered
    const filteredPosts = useMemo(() => {
        const byCat =
            selectedCategory === 'All'
                ? sortedPosts
                : sortedPosts.filter((p) => p.category === selectedCategory);

        const q = query.trim().toLowerCase();
        if (!q) return byCat;

        return byCat.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.author.toLowerCase().includes(q)
        );
    }, [sortedPosts, selectedCategory, query]);

    const featured = filteredPosts[0];

    // chips animation
    const chipVariants = {
        hidden: { opacity: 0, y: 8 },
        show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04 } }),
    };

    return (
        <AnimatedPage>
            {/* Hero with featured background */}
            <section className="relative h-[60vh] md:h-[68vh] w-full overflow-hidden">
                <div
                    className={`${styles.kenburnsBg} absolute inset-0 bg-cover bg-center`}
                    style={{
                        backgroundImage: `url('${featured?.image || 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1200'}')`,
                    }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06] pointer-events-none`} />

                <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-end pb-12 md:pb-16">
                    <div className="max-w-3xl">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-yellow-500 font-semibold tracking-widest uppercase text-sm"
                        >
                            Insights & Stories
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 text-4xl md:text-6xl font-serif text-white"
                        >
                            Our Blog
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 }}
                            className="mt-4 text-lg text-white/85 max-w-2xl"
                        >
                            Tips, techniques, and stories from our creative journey.
                        </motion.p>

                        {featured && (
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 }}
                                className="mt-8 bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm text-white"
                            >
                                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/70">
                                    <Tag className="w-4 h-4 text-yellow-400" />
                                    {featured.category}
                                </div>
                                <h3 className="mt-2 text-2xl md:text-3xl font-serif">{featured.title}</h3>
                                <p className="mt-2 text-white/80 line-clamp-2">{featured.excerpt}</p>
                                <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <User size={16} /> {featured.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={16} /> {new Date(featured.date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} /> {featured.readTime}
                                        </span>
                                    </div>
                                    <Link
                                        to="/blog"
                                        className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
                                    >
                                        Read article <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Sticky Filter + Search + View toggle */}
            <div className="sticky top-16 z-20 bg-black/70 supports-[backdrop-filter]:bg-black/50 backdrop-blur border-y border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="py-4 flex flex-col lg:flex-row items-center gap-4 lg:gap-6 justify-between">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((cat, i) => (
                                <motion.button
                                    key={cat}
                                    custom={i}
                                    variants={chipVariants}
                                    initial="hidden"
                                    animate="show"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === cat
                                            ? 'bg-yellow-600 text-white border-yellow-600 shadow-md'
                                            : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border-gray-700 hover:border-yellow-600'
                                        }`}
                                >
                                    {cat}
                                    <span
                                        className={`ml-2 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full text-xs ${selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-300'
                                            }`}
                                    >
                                        {cat === 'All' ? categoryCounts.all : categoryCounts[cat] || 0}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Search + view toggle */}
                        <div className="w-full lg:w-auto flex items-center gap-3">
                            <label className="relative block w-full lg:w-80">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <Search className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search articles..."
                                    className="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-full pl-9 pr-4 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                                />
                            </label>

                            <div className="hidden md:flex items-center rounded-full bg-gray-900 border border-gray-700 p-1">
                                <button
                                    aria-label="Grid view"
                                    onClick={() => setView('grid')}
                                    className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${view === 'grid' ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    aria-label="List view"
                                    onClick={() => setView('list')}
                                    className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${view === 'list' ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {filteredPosts.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-gray-500 py-20"
                            >
                                No posts found.
                            </motion.div>
                        ) : view === 'grid' ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredPosts.map((post) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        whileHover={{ y: -4 }}
                                        className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-600/50 transition-all duration-300 group"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={post.image || '/placeholder.svg'}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="px-3 py-1 bg-yellow-600/20 text-yellow-500 rounded-full text-xs font-semibold">
                                                    {post.category}
                                                </span>
                                                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs flex items-center gap-1">
                                                    <Clock size={14} /> {post.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-serif text-white mb-2 line-clamp-2">{post.title}</h3>
                                            <p className="text-gray-400 mb-6 line-clamp-3">{post.excerpt}</p>
                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-800">
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <User size={16} /> {post.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={16} /> {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <Link
                                                    to="/blog"
                                                    className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
                                                >
                                                    Read <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {filteredPosts.map((post) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        whileHover={{ y: -2 }}
                                        className="grid md:grid-cols-[320px_1fr] gap-6 bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-600/50 transition-all duration-300 group"
                                    >
                                        <div className="relative h-56 md:h-full">
                                            <img
                                                src={post.image || '/placeholder.svg'}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="px-3 py-1 bg-yellow-600/20 text-yellow-500 rounded-full text-xs font-semibold">
                                                    {post.category}
                                                </span>
                                                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs flex items-center gap-1">
                                                    <Clock size={14} /> {post.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-serif text-white mb-2">{post.title}</h3>
                                            <p className="text-gray-400 mb-6 line-clamp-3">{post.excerpt}</p>
                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-800">
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <User size={16} /> {post.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={16} /> {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <Link
                                                    to="/blog"
                                                    className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
                                                >
                                                    Read <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700 relative overflow-hidden">
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06]`} />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-serif text-white">Get stories in your inbox</h2>
                    <p className="text-white/90 mt-2">Monthly updates. No spam. Unsubscribe anytime.</p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="mt-6 max-w-lg mx-auto flex items-center bg-black/30 border border-white/20 rounded-full p-1"
                    >
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="flex-1 bg-transparent text-white placeholder:text-white/60 px-4 py-3 focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-black text-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Blog;