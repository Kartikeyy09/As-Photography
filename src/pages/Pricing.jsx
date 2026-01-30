import { motion } from 'framer-motion';
import AnimatedPage from '../layouts/AnimatedPage';
import { pricingPlans } from '../data/data';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import "../index.css";

const Pricing = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <AnimatedPage>
            {/* Hero Section */}
            <section className="relative pt-48 pb-24 bg-gradient-to-b from-gray-900 via-black to-gray-900">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%)'
                }}></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-yellow-500 font-semibold tracking-widest uppercase text-sm mb-4"
                    >
                        Transparent Pricing
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-7xl font-serif text-white mb-6"
                    >
                        Packages for Every Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Choose the perfect package or let us customize one just for you
                    </motion.p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-28 bg-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                    >
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                                className={`rounded-2xl p-8 transition-all duration-300 border ${plan.popular ? 'border-yellow-500 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl shadow-yellow-600/20' : 'border-gray-800 bg-gray-900'}`}
                            >
                                {plan.popular && (
                                    <div className="mb-6 inline-block px-4 py-2 bg-yellow-600/20 border border-yellow-500 rounded-full">
                                        <span className="text-yellow-500 font-semibold text-sm">Most Popular</span>
                                    </div>
                                )}
                                <h3 className="text-3xl font-serif text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 mb-6">{plan.description}</p>
                                <div className="mb-8">
                                    <div className="text-5xl font-bold text-white mb-2">{plan.price}</div>
                                    <p className="text-gray-500">{plan.duration}</p>
                                </div>
                                <button className={`w-full py-3 px-6 rounded-lg font-semibold mb-8 transition-all duration-300 ${plan.popular ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'}`}>
                                    Choose Plan
                                </button>
                                <div className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-start gap-3"
                                        >
                                            <Check className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-300">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Custom Packages */}
            <section className="py-28 bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl font-serif text-white mb-6"
                    >
                        Custom Packages Available
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
                    >
                        Have a unique vision? Let's create something tailored specifically to your needs and budget.
                    </motion.p>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 hover:gap-3">
                        Get Custom Quote
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Pricing;
