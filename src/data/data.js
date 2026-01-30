import { Camera, Clapperboard, Heart, Users, Sparkles, Zap, Award, Target, Lightbulb, Check } from 'lucide-react';

// --- PORTFOLIO DATA (massively expanded) ---
export const portfolioData = [
    // --- Weddings (10 items) ---
    { id: 'w1', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Serene Vows', year: '2024' },
    { id: 'w2', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Beachside Bliss', year: '2024' },
    { id: 'w3', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'A Moment of Joy', year: '2024' },
    { id: 'w4', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'First Dance', year: '2024' },
    { id: 'w5', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Bridal Beauty', year: '2024' },
    { id: 'w6', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Golden Hour Romance', year: '2023' },
    { id: 'w7', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/3299386/pexels-photo-3299386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Sunset Ceremony', year: '2023' },
    { id: 'w8', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Reception Magic', year: '2023' },
    { id: 'w9', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Veil & Vows', year: '2023' },
    { id: 'w10', category: 'wedding', type: 'image', src: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Ring Exchange', year: '2023' },

    // --- Pre-Weddings (8 items) ---
    { id: 'pw1', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/3299386/pexels-photo-3299386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Sunset Embrace', year: '2024' },
    { id: 'pw2', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'City of Love', year: '2024' },
    { id: 'pw3', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/1779933/pexels-photo-1779933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Mountain Vows', year: '2024' },
    { id: 'pw4', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Urban Romance', year: '2023' },
    { id: 'pw5', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Lakeside Shoot', year: '2023' },
    { id: 'pw6', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Forest Walk', year: '2023' },
    { id: 'pw7', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Studio Love', year: '2023' },
    { id: 'pw8', category: 'pre-wedding', type: 'image', src: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Intimate Moments', year: '2023' },

    // --- Films (5 items) ---
    { id: 'f1', category: 'films', type: 'video', src: 'https://videos.pexels.com/video-files/853879/853879-hd.mp4', thumbnail: 'https://images.pexels.com/videos/853879/pexels-photo-853879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Cinematic Wedding Highlight', year: '2024' },
    { id: 'f2', category: 'films', type: 'video', src: 'https://videos.pexels.com/video-files/854251/854251-hd.mp4', thumbnail: 'https://images.pexels.com/videos/854251/pictures/pexels-photo-854251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Pre-Wedding Story Film', year: '2024' },
    { id: 'f3', category: 'films', type: 'video', src: 'https://videos.pexels.com/video-files/4434242/4434242-hd.mp4', thumbnail: 'https://images.pexels.com/videos/4434242/pexels-photo-4434242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'The Vow - A Wedding Film', year: '2023' },
    { id: 'f4', category: 'films', type: 'video', src: 'https://videos.pexels.com/video-files/7974659/7974659-hd.mp4', thumbnail: 'https://images.pexels.com/videos/7974659/pexels-photo-7974659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Reception Highlights Reel', year: '2023' },
    { id: 'f5', category: 'films', type: 'video', src: 'https://videos.pexels.com/video-files/2519381/2519381-hd.mp4', thumbnail: 'https://images.pexels.com/videos/2519381/pexels-photo-2519381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Ceremony to Celebration', year: '2023' },

    // --- Models (8 items) ---
    { id: 'm1', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Golden Hour Fashion', year: '2024' },
    { id: 'm2', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Urban Elegance', year: '2024' },
    { id: 'm3', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Studio Portrait', year: '2024' },
    { id: 'm4', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Minimalist Look', year: '2023' },
    { id: 'm5', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Editorial Beauty', year: '2023' },
    { id: 'm6', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Contemporary Style', year: '2023' },
    { id: 'm7', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Runway Confidence', year: '2023' },
    { id: 'm8', category: 'model', type: 'image', src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Seasonal Collection', year: '2023' },

    // --- Events (8 items) ---
    { id: 'e1', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Concert Lights', year: '2024' },
    { id: 'e2', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Corporate Gathering', year: '2024' },
    { id: 'e3', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Haldi Ceremony', year: '2024' },
    { id: 'e4', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Product Launch', year: '2023' },
    { id: 'e5', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Festival Coverage', year: '2023' },
    { id: 'e6', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Mehendi Night', year: '2023' },
    { id: 'e7', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Sangeet Performance', year: '2023' },
    { id: 'e8', category: 'events', type: 'image', src: 'https://images.pexels.com/photos/1779933/pexels-photo-1779933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Corporate Event', year: '2023' },
];

// --- FEATURED WORK (for the homepage) ---
export const featuredWork = [
    { id: 'fw1', title: 'Serene Vows', category: 'Wedding', image: 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', gridClass: 'lg:col-span-2 lg:row-span-2' },
    { id: 'fw2', title: 'City Lights', category: 'Pre-Wedding', image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', gridClass: 'lg:col-span-1' },
    { id: 'fw3', title: 'Golden Hour', category: 'Model', image: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', gridClass: 'lg:col-span-1' },
    { id: 'fw4', title: 'Eternal Dance', category: 'Film', image: 'https://images.pexels.com/videos/854251/pictures/pexels-photo-854251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', gridClass: 'lg:col-span-2' }
];

// --- SERVICES DATA (enhanced with more details) ---
export const services = [
    {
        slug: "wedding-photography",
        title: "Wedding Photography",
        tagline: "Capturing the essence of your most cherished day.",
        image: "https://images.pexels.com/photos/13876561/pexels-photo-13876561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Our approach to wedding photography is a blend of documentary and fine-art styles. We focus on capturing genuine emotions and candid moments while ensuring every photograph is a work of art. From the grandest ceremonies to the quietest glances, we preserve your story with elegance and sophistication.",
        pricing: "₹150,000 - ₹350,000",
        included: ["Full-day coverage (8-10 hours)", "Two professional photographers", "Online gallery with high-resolution images", "A curated selection of 500+ edited photos", "Personal usage rights", "Pre-wedding consultation", "Album of 100 premium prints"]
    },
    {
        slug: "cinematic-films",
        title: "Cinematic Films",
        tagline: "Your love story, directed with heart and artistry.",
        image: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "We create narrative-driven films that feel like a movie. Using state-of-the-art equipment, professional sound design, and cinematic color grading, we craft a timeless piece of motion art that tells your unique story from heartfelt vows to energetic celebrations.",
        pricing: "₹200,000 - ₹500,000",
        included: ["5-7 minute cinematic highlight film", "Full-length documentary edit of ceremony & speeches", "Two professional cinematographers", "Licensed music and professional audio recording", "4K digital delivery", "Color grading & sound design", "Multiple edit versions for social media"]
    },
    {
        slug: "pre-wedding-shoots",
        title: "Pre-Wedding & Engagement",
        tagline: "Celebrate your journey before the big day.",
        image: "https://images.pexels.com/photos/9482121/pexels-photo-9482121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "An engagement or pre-wedding shoot is the perfect way to get comfortable in front of the camera and create beautiful, relaxed portraits. We'll work with you to choose a location that's meaningful to you, resulting in images that are personal, romantic, and unforgettable.",
        pricing: "₹35,000 - ₹75,000",
        included: ["2-3 hour session at a location of your choice", "One professional photographer", "75+ high-resolution edited images", "Online gallery for sharing and downloading", "Styling and location consultation", "Outfit change assistance", "Digital files with full rights"]
    },
    {
        slug: "model-commercial",
        title: "Portraits & Commercial",
        tagline: "Elevating brands and individuals with striking visuals.",
        image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Whether you're an aspiring model needing a portfolio, an actor needing headshots, or a brand requiring compelling visual content, we provide professional portrait and commercial photography services with impact and professionalism.",
        pricing: "₹25,000 - ₹100,000",
        included: ["In-studio or on-location sessions", "Professional lighting and backdrops", "Collaborative concept development", "High-end retouching services", "Full commercial usage rights available", "Mood board consultation", "Multiple looks and setups"]
    }
];

// --- TEAM MEMBERS (enhanced with better bios) ---
export const teamMembers = [
    {
        name: "Alex Johnson",
        role: "Lead Photographer & Founder",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
        bio: "With a decade of experience, Alex founded AS Photography to bring a fine-art approach to wedding photography. His passion lies in capturing authentic moments and building lasting relationships with clients. Award winner for Best Wedding Photography (2022).",
        experience: "10+ years"
    },
    {
        name: "Maria Garcia",
        role: "Head of Cinematography",
        image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400",
        bio: "Maria is a visual storyteller who transforms wedding days into cinematic masterpieces. Her films are known for their emotional depth, creativity, and beautiful narrative structure. Specializes in drone cinematography and multi-cam productions.",
        experience: "8+ years"
    },
    {
        name: "David Chen",
        role: "Post-Production Lead",
        image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
        bio: "David is the wizard behind the scenes, ensuring every photo and film is polished to perfection. His expertise in color grading and editing has won industry recognition. Proficient in Adobe Creative Suite and DaVinci Resolve.",
        experience: "9+ years"
    },
    {
        name: "Sophie Dubois",
        role: "Client Relations & Planner",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
        bio: "Sophie ensures a seamless experience for every client, from the initial inquiry to the final delivery. Her attention to detail and warm communication is the backbone of our studio. Fluent in 3 languages and handles all client coordination.",
        experience: "7+ years"
    }
];

// --- PHILOSOPHY (with better descriptions) ---
export const philosophy = [
    {
        icon: Heart,
        title: "Authenticity",
        description: "We capture genuine emotions and unscripted moments, telling a story that is uniquely and beautifully yours."
    },
    {
        icon: Camera,
        title: "Artistry",
        description: "Every frame is a piece of art, composed with a keen eye for light, shadow, detail, and composition."
    },
    {
        icon: Clapperboard,
        title: "Storytelling",
        description: "We go beyond documentation, crafting a visual narrative that you'll cherish and share for a lifetime."
    },
    {
        icon: Users,
        title: "Connection",
        description: "We build a real connection with you, ensuring you feel comfortable, relaxed, and truly seen on your big day."
    }
];

// --- STATS (new section for homepage) ---
export const stats = [
    { label: "Weddings Captured", value: "500+" },
    { label: "Cinematic Films", value: "150+" },
    { label: "Satisfied Clients", value: "1000+" },
    { label: "Years of Experience", value: "34" }
];

// --- MARQUEE SERVICES (expanded) ---
export const marqueeServices = [
    'Wedding Photography', 'Cinematic Films', 'Pre-Wedding Shoots', 'Model Portfolios', 'Event Coverage', 'Traditional Ceremonies', 'Product Photography', 'Editorial Shoots'
];

// --- TESTIMONIALS (new) ---
export const testimonials = [
    {
        quote: "AS Photography captured the magic of our wedding day perfectly. Every moment felt real, every emotion genuine. We couldn't ask for better!",
        author: "Priya & Arjun",
        role: "Wedding Couple, 2024",
        image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
        quote: "The cinematic film was absolutely breathtaking. Alex and his team transformed our wedding into a movie. Worth every penny!",
        author: "Sarah & Michael",
        role: "Wedding Couple, 2024",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
        quote: "Professional, creative, and genuinely caring about our vision. The pre-wedding shoot was so much fun and the results are stunning.",
        author: "Neha & Rohan",
        role: "Wedding Couple, 2023",
        image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
        quote: "My portfolio shoot with them was transformative. They knew exactly how to bring out my best angles and style.",
        author: "Jessica Chen",
        role: "Model, 2024",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
];

// --- PRICING PLANS (new) ---
export const pricingPlans = [
    {
        name: "Essentials",
        category: "wedding",
        price: "₹150,000",
        duration: "Full Day",
        description: "Perfect for intimate ceremonies and gatherings",
        features: [
            "8-10 hours coverage",
            "1 professional photographer",
            "300+ edited photos",
            "Online gallery access",
            "Basic album (50 prints)",
            "Same-day highlight reel"
        ],
        popular: false
    },
    {
        name: "Premium",
        category: "wedding",
        price: "₹250,000",
        duration: "Full Day",
        description: "Our most popular choice for grand celebrations",
        features: [
            "Full 12-hour coverage",
            "2 professional photographers",
            "600+ edited photos",
            "4K highlight film",
            "Premium album (100 prints)",
            "Pre-wedding consultation",
            "Drone photography",
            "Unlimited revisions"
        ],
        popular: true
    },
    {
        name: "Cinematic",
        category: "film",
        price: "₹350,000",
        duration: "Full Experience",
        description: "Complete visual storytelling experience",
        features: [
            "Full 12-hour coverage",
            "2 cinematographers",
            "5-7 minute cinematic film",
            "Full documentary edit",
            "700+ edited photos",
            "Professional color grading",
            "Licensed music & sound design",
            "4K digital delivery"
        ],
        popular: false
    }
];

// --- BLOG POSTS (new) ---
export const blogPosts = [
    {
        id: 1,
        title: "The Art of Capturing Authentic Moments",
        author: "Alex Johnson",
        date: "2024-11-10",
        category: "Photography Tips",
        image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
        excerpt: "Learn how we blend in and capture genuine emotions without posing. Discover the techniques that have defined our style.",
        content: "Our philosophy revolves around being invisible observers of genuine joy...",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Wedding Films: From Concept to Delivery",
        author: "Maria Garcia",
        date: "2024-11-05",
        category: "Cinematography",
        image: "https://images.pexels.com/photos/3298943/pexels-photo-3298943.jpeg?auto=compress&cs=tinysrgb&w=800",
        excerpt: "Behind-the-scenes look at our film production process, from pre-wedding consultations to final color grading.",
        content: "Creating cinematic wedding films requires precision, creativity, and technical expertise...",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "Lighting Techniques for Golden Hour Photography",
        author: "David Chen",
        date: "2024-10-28",
        category: "Photography Tips",
        image: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800",
        excerpt: "Master the use of natural light during golden hour to create stunning, romantic images.",
        content: "Golden hour is a photographer's dream, offering warm, diffused light that flatters any subject...",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Choosing Your Photographers: What to Look For",
        author: "Sophie Dubois",
        date: "2024-10-20",
        category: "Advice",
        image: "https://images.pexels.com/photos/2821314/pexels-photo-2821314.jpeg?auto=compress&cs=tinysrgb&w=800",
        excerpt: "A comprehensive guide to finding the right photographers for your special day.",
        content: "Selecting photographers is one of the most important decisions for your wedding...",
        readTime: "7 min read"
    }
];

// --- PROCESS STEPS (new) ---
export const processSteps = [
    {
        number: "01",
        title: "Consultation",
        description: "We meet with you to understand your vision, style preferences, and any special requirements. This is where we build our connection."
    },
    {
        number: "02",
        title: "Planning",
        description: "Detailed timeline coordination, location scouting, and creative planning ensure we capture all important moments seamlessly."
    },
    {
        number: "03",
        title: "Capture",
        description: "On the day, our team works discretely to document genuine moments while maintaining the flow and energy of your celebration."
    },
    {
        number: "04",
        title: "Curation",
        description: "We meticulously select the best images and moments from hundreds of shots to tell your complete story."
    },
    {
        number: "05",
        title: "Editing",
        description: "Expert post-processing brings our creative vision to life, with color grading and retouching to perfection."
    },
    {
        number: "06",
        title: "Delivery",
        description: "You receive high-resolution files, beautifully designed album, and access to your secure online gallery within 6-8 weeks."
    }
];
