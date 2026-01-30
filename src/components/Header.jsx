import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Aperture, Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800/50 shadow-xl' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to="/" className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-700 group-hover:shadow-lg group-hover:shadow-yellow-600/30 transition-all duration-300">
                        <Aperture className="text-white w-6 h-6" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white hidden sm:inline">AS Photography</span>
                </NavLink>

                <nav className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg relative text-sm font-medium transition-all duration-300 group ${isActive ? 'text-yellow-500' : 'text-gray-300 hover:text-white'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 bg-yellow-600/10 rounded-lg -z-10"
                                            layoutId="underline"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300 ${isActive ? 'w-full' : ''}`}></span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/contact" className="hidden sm:inline-block px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/30 text-sm">
                        Book Now
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white hover:text-yellow-500 transition-colors">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-gray-800/50 overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-lg text-white hover:bg-yellow-600/20 hover:text-yellow-500 transition-all duration-300"
                                    >
                                        {link.name}
                                    </NavLink>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="pt-4 border-t border-gray-800"
                            >
                                <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 text-center">
                                    Book Now
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
