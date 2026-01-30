import React, { useEffect, useMemo, useState } from 'react';
import AnimatedPage from '../layouts/AnimatedPage';
import { Phone, Mail, MapPin, Zap, Loader2, Calendar, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Contact.module.css';
import '../index.css';

const SERVICE_OPTIONS = [
    { label: 'Wedding Photography', value: 'wedding-photography' },
    { label: 'Cinematic Films', value: 'cinematic-films' },
    { label: 'Pre-Wedding & Engagement', value: 'pre-wedding-shoots' },
    { label: 'Portraits & Commercial', value: 'model-commercial' },
    { label: 'Other', value: 'other' },
];

const BUDGET_OPTIONS = [
    'Under ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,00,000',
    '₹2,00,000 – ₹3,50,000',
    '₹3,50,000+',
];

const Contact = () => {
    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState('Send Message');
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        budget: '',
        message: '',
        contactMethod: 'email',
    });

    // Pre-fill service from query parameter (?service=slug)
    useEffect(() => {
        const svc = searchParams.get('service');
        if (svc && SERVICE_OPTIONS.some((o) => o.value === svc)) {
            setFormData((prev) => ({ ...prev, service: svc }));
        }
    }, [searchParams]);

    const today = useMemo(() => new Date().toISOString().split('T')[0], []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // basic client-side guard
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            setStatus('Please fill all required fields');
            setTimeout(() => setStatus('Send Message'), 1500);
            return;
        }

        setStatus('Sending...');
        setSent(false);
        // simulate async submit
        setTimeout(() => {
            setStatus('Message Sent!');
            setSent(true);
            // Reset after showing success
            setTimeout(() => {
                setStatus('Send Message');
                setSent(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    date: '',
                    budget: '',
                    message: '',
                    contactMethod: 'email',
                });
            }, 2200);
        }, 1300);
    };

    const sending = status === 'Sending...';

    return (
        <AnimatedPage>
            {/* Hero */}
            <section className="relative h-[60vh] md:h-[68vh] w-full overflow-hidden">
                <div
                    className={`${styles.kenburnsBg} absolute inset-0 bg-cover bg-center`}
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/3299386/pexels-photo-3299386.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                    }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
                <div className={`${styles.grain} absolute inset-0 opacity-[0.06] pointer-events-none`} />

                <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center text-center md:text-left md:justify-end pb-12">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-semibold tracking-widest text-yellow-500 uppercase text-sm"
                    >
                        Get In Touch
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-4xl md:text-6xl font-serif text-white"
                    >
                        Let’s Create Together
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 }}
                        className="mt-4 text-lg text-white/85 max-w-2xl"
                    >
                        We’re excited to hear your story. For inquiries, bookings, or to say hello—reach out anytime.
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-12">
                    {/* Contact Cards + Map */}
                    <div className="lg:col-span-2">
                        <h3 className="text-3xl font-serif mb-8 text-gray-900">Contact Details</h3>

                        <div className="space-y-5">
                            <a
                                href="https://maps.app.goo.gl/9h2nJ5bCm"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-yellow-600/40 hover:shadow transition bg-white"
                            >
                                <div className="p-3 rounded-lg bg-yellow-600/15">
                                    <MapPin className="text-yellow-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Our Studio</h4>
                                    <p className="text-gray-600 mt-1">
                                        123 Artistry Lane
                                        <br />
                                        Mumbai, India 400001
                                    </p>
                                </div>
                            </a>

                            <a
                                href="mailto:contact@asphotography.com"
                                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-yellow-600/40 hover:shadow transition bg-white"
                            >
                                <div className="p-3 rounded-lg bg-yellow-600/15">
                                    <Mail className="text-yellow-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                                    <p className="text-gray-600 mt-1">
                                        contact@asphotography.com
                                        <br />
                                        bookings@asphotography.com
                                    </p>
                                </div>
                            </a>

                            <a
                                href="tel:+911234567890"
                                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-yellow-600/40 hover:shadow transition bg-white"
                            >
                                <div className="p-3 rounded-lg bg-yellow-600/15">
                                    <Phone className="text-yellow-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Call Us</h4>
                                    <p className="text-gray-600 mt-1">
                                        +91 123-456-7890
                                        <br />
                                        +91 987-654-3210
                                    </p>
                                </div>
                            </a>

                            <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white">
                                <div className="p-3 rounded-lg bg-yellow-600/15">
                                    <Clock className="text-yellow-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                                    <p className="text-gray-600 mt-1">
                                        Mon–Sat: 10:00 AM – 7:00 PM
                                        <br />
                                        Sun: By Appointment
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <iframe
                                title="Studio Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823224!2d72.74109968270503!3d19.08219783938524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1684342833333!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-10 rounded-xl shadow-lg border-l-4 border-yellow-600">
                        <h3 className="text-3xl font-serif mb-6 text-gray-900">Send a Message</h3>

                        {/* Success banner */}
                        <AnimatePresence>
                            {sent && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-3"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    Your message was sent successfully. We’ll get back to you shortly!
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name + Email */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Your Name</span>
                                    <div className="relative mt-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Jane Doe"
                                            required
                                            className="w-full bg-white border-2 border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all"
                                        />
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                            <Send className="w-4 h-4" />
                                        </span>
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Email</span>
                                    <div className="relative mt-2">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full bg-white border-2 border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all"
                                        />
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                            <Mail className="w-4 h-4" />
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* Phone + Date */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Phone (optional)</span>
                                    <div className="relative mt-2">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-white border-2 border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all"
                                        />
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                            <Phone className="w-4 h-4" />
                                        </span>
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Preferred Event Date</span>
                                    <div className="relative mt-2">
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            min={today}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all"
                                        />
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* Service + Budget */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Service of Interest</span>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full bg-white border-2 border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all text-gray-700"
                                    >
                                        <option value="">Select a service</option>
                                        {SERVICE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Estimated Budget</span>
                                    <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="mt-2 w-full bg-white border-2 border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all text-gray-700"
                                    >
                                        <option value="">Select a range (optional)</option>
                                        {BUDGET_OPTIONS.map((b) => (
                                            <option key={b} value={b}>
                                                {b}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {/* Preferred contact method */}
                            <fieldset className="grid sm:grid-cols-2 gap-3">
                                <legend className="text-sm font-medium text-gray-700 mb-2">
                                    Preferred Contact Method
                                </legend>
                                <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-yellow-600/40 transition">
                                    <input
                                        type="radio"
                                        name="contactMethod"
                                        value="email"
                                        checked={formData.contactMethod === 'email'}
                                        onChange={handleChange}
                                    />
                                    <span className="text-gray-700">Email</span>
                                </label>
                                <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-yellow-600/40 transition">
                                    <input
                                        type="radio"
                                        name="contactMethod"
                                        value="phone"
                                        checked={formData.contactMethod === 'phone'}
                                        onChange={handleChange}
                                    />
                                    <span className="text-gray-700">Phone</span>
                                </label>
                            </fieldset>

                            {/* Message */}
                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">Tell us about your vision</span>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="What event, location, mood, and timeline are you envisioning?"
                                    required
                                    className="mt-2 w-full bg-white border-2 border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all resize-none text-gray-800"
                                />
                                <div className="mt-1 text-xs text-gray-500">
                                    {formData.message.length}/1000
                                </div>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                            >
                                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                                {status}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                By submitting, you agree to our privacy policy. We’ll never share your info.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Contact;