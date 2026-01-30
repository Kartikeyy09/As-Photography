import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => (
    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
        aria-label="Chat on WhatsApp">
        <MessageCircle size={28} />
    </a>
);

export default WhatsAppButton;