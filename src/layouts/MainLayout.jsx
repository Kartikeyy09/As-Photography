import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import WhatsAppButton from '../components/WhatsAppButton';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const MainLayout = ({ children }) => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-background text-text font-sans">
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-28 right-5 z-40 bg-accent text-white p-3 rounded-full shadow-lg hover:bg-accent_hover transition-colors duration-300"
                    aria-label="Back to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </div>
    );
};

export default MainLayout;