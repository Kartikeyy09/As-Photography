import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../layouts/AnimatedPage';
import { teamMembers } from '../data/data';
import { Mail, Instagram, Linkedin } from 'lucide-react';


const Team = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <AnimatedPage>
            {/* Hero Section */}
            <section className="relative pt-48 pb-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212,175,55,0.1) 0%, transparent 50%)'
                }}></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-semibold tracking-widest text-yellow-500 uppercase text-sm mb-4"
                    >
                        Our Creative Team
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-7xl font-serif text-white mb-6"
                    >
                        Meet the Artists Behind Your Memories
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Dedicated professionals passionate about capturing your story with artistry and excellence
                    </motion.p>
                </div>
            </section>

            {/* Team Members Grid */}
            <section className="py-28 bg-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-2xl mb-6 h-80">
                                    <img
                                        src={member.image || "/placeholder.svg"}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="flex gap-4">
                                            <button className="p-3 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white transition-all duration-300">
                                                <Mail size={20} />
                                            </button>
                                            <button className="p-3 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white transition-all duration-300">
                                                <Instagram size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-2">{member.name}</h3>
                                <p className="text-yellow-500 font-semibold mb-1">{member.role}</p>
                                <p className="text-sm text-gray-500 mb-4">{member.experience}</p>
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: selectedMember === index ? 1 : 0, height: selectedMember === index ? 'auto' : 0 }}
                                    className="text-sm text-gray-400 overflow-hidden"
                                >
                                    {member.bio}
                                </motion.p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-28 bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl font-serif mb-8 text-white">Our Studio Culture</h2>
                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                At AS Photography, we believe that the best work happens when creativity meets collaboration. Our team is bound by a shared passion for storytelling and an unwavering commitment to excellence.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We celebrate diversity, encourage innovation, and support each other's growth. Together, we're not just capturing moments—we're creating legacy.
                            </p>
                        </motion.div>
                        <motion.img
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Studio"
                            className="rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Team;
