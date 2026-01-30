import { Link } from 'react-router-dom';
import { Aperture, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const footerLinks = [
        { title: 'Services', links: [{ name: 'Wedding Photography', href: '#' }, { name: 'Cinematography', href: '#' }, { name: 'Pre-Wedding Shoots', href: '#' }, { name: 'Portraits', href: '#' }] },
        { title: 'Company', links: [{ name: 'About Us', href: '/about' }, { name: 'Our Team', href: '/team' }, { name: 'Portfolio', href: '/portfolio' }, { name: 'Blog', href: '/blog' }] },
        { title: 'Resources', links: [{ name: 'Pricing', href: '/pricing' }, { name: 'Contact', href: '/contact' }, { name: 'FAQ', href: '#' }, { name: 'Privacy Policy', href: '#' }] }
    ];

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' }
    ];

    return (
        <footer className="bg-black border-t border-gray-800">
            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-700">
                                <Aperture className="text-white w-6 h-6" />
                            </div>
                            <span className="text-lg font-bold text-white">AS Photography</span>
                        </Link>
                        <p className="text-gray-400 mb-6 text-sm">Capturing moments, creating memories, and telling stories with artistry and excellence.</p>
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }, index) => (
                                <motion.a
                                    key={index}
                                    href={href}
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    className="p-3 bg-gray-900 hover:bg-yellow-600 text-gray-400 hover:text-white rounded-lg transition-all duration-300"
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {footerLinks.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index + 1) * 0.1 }}
                        >
                            <h3 className="text-white font-semibold mb-6">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-white font-semibold mb-6">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <a href="mailto:hello@asphotography.com" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm">
                                    hello@asphotography.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <a href="tel:+1234567890" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">123 Photography Lane, New York, NY 10001</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} AS Photography. All rights reserved. Created with passion.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-300">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
