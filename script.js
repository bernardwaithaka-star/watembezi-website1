document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Script initialized - Modal system ready');

    // ===== DESTINATION MODAL SYSTEM =====
    const destinationModal = document.getElementById('destinationModal');

    function openDestinationModal(destination) {
        console.log('→ Opening destination modal:', destination);
        const data = destinationData[destination];
        
        if (!data) {
            console.error('✗ Destination data not found:', destination);
            return;
        }

        // Populate all modal sections
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalSubtitle').textContent = data.subtitle;
        document.getElementById('modalLocation').textContent = data.location;

        const activitiesHtml = data.activities
            .map(activity => `<div class="activity-item"><h4>${activity.icon} ${activity.name}</h4><p>${activity.desc}</p></div>`)
            .join('');
        document.getElementById('modalActivities').innerHTML = activitiesHtml;

        const wildlifeHtml = data.wildlife
            .map(animal => `<div class="wildlife-item"><h4>${animal.name}</h4><p>${animal.desc}</p></div>`)
            .join('');
        document.getElementById('modalWildlife').innerHTML = wildlifeHtml;

        document.getElementById('modalBestTime').textContent = data.bestTime;

        const tipsHtml = data.tips
            .map(tip => `<div class="tip-item"><h4>${tip.title}</h4><p>${tip.desc}</p></div>`)
            .join('');
        document.getElementById('modalTips').innerHTML = tipsHtml;

        // Display modal
        if (destinationModal) {
            destinationModal.classList.add('active');
            destinationModal.style.display = 'flex';
            destinationModal.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
            console.log('✓ Modal displayed successfully');
        }
    }

    function closeDestinationModal() {
        if (destinationModal) {
            destinationModal.classList.remove('active');
            destinationModal.style.display = 'none';
            destinationModal.style.pointerEvents = 'none';
            document.body.style.overflow = 'auto';
            console.log('✓ Modal closed');
        }
    }

    // Attach handlers to all destination cards
    const destinationCards = document.querySelectorAll('.destination-card-item');
    destinationCards.forEach(card => {
        const destination = card.getAttribute('data-destination');
        
        // Card click handler
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (e.target.classList.contains('card-action-btn')) return;
            openDestinationModal(destination);
        });

        // Button click handler
        const btn = card.querySelector('.card-action-btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                openDestinationModal(destination);
            });
        }
    });

    // Modal close handlers
    if (destinationModal) {
        const closeBtn = destinationModal.querySelector('.modal-close');
        const overlay = destinationModal.querySelector('.modal-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeDestinationModal();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.stopPropagation();
                closeDestinationModal();
            });
        }
    }

    // ===== SERVICE MODAL SYSTEM =====
    const serviceModal = document.getElementById('serviceModal');

    function openServiceModal(service) {
        console.log('→ Opening service modal:', service);
        const data = serviceData[service];
        
        if (!data) {
            console.error('✗ Service data not found:', service);
            return;
        }

        document.getElementById('serviceTitle').textContent = data.title;
        document.getElementById('serviceSubtitle').textContent = data.subtitle;
        document.getElementById('serviceOverviewTitle').textContent = 'Overview';
        document.getElementById('serviceOverview').textContent = data.overview;

        const featuresHtml = data.features
            .map(f => `<div class="service-feature"><h4>${f.title}</h4><p>${f.desc}</p></div>`)
            .join('');
        document.getElementById('serviceFeatures').innerHTML = featuresHtml;

        if (serviceModal) {
            serviceModal.classList.add('active');
            serviceModal.style.display = 'flex';
            serviceModal.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
            console.log('✓ Service modal displayed');
        }
    }

    function closeServiceModal() {
        if (serviceModal) {
            serviceModal.classList.remove('active');
            serviceModal.style.display = 'none';
            serviceModal.style.pointerEvents = 'none';
            document.body.style.overflow = 'auto';
            console.log('✓ Service modal closed');
        }
    }

    // Service card handlers
    const serviceCards = document.querySelectorAll('.service-card-item');
    serviceCards.forEach(card => {
        const service = card.getAttribute('data-service');
        const btn = card.querySelector('.card-action-btn');
        
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openServiceModal(service);
            });
        }
    });

    // Service modal close
    if (serviceModal) {
        const closeBtn = serviceModal.querySelector('.modal-close');
        const overlay = serviceModal.querySelector('.modal-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeServiceModal);
        }
        if (overlay) {
            overlay.addEventListener('click', closeServiceModal);
        }
    }

    // ===== CONTACT METHOD MODAL SYSTEM =====
    const contactModal = document.getElementById('contactMethodModal');

    function openContactMethod(method) {
        console.log('→ Opening contact method:', method);
        const data = contactMethodData[method];
        
        if (!data) {
            console.error('✗ Contact method data not found:', method);
            return;
        }

        document.getElementById('contactMethodTitle').textContent = data.title;
        document.getElementById('contactMethodContent').innerHTML = data.content;

        if (contactModal) {
            contactModal.classList.add('active');
            contactModal.style.display = 'flex';
            contactModal.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
            console.log('✓ Contact modal displayed');
        }
    }

    function closeContactMethod() {
        if (contactModal) {
            contactModal.classList.remove('active');
            contactModal.style.display = 'none';
            contactModal.style.pointerEvents = 'none';
            document.body.style.overflow = 'auto';
            console.log('✓ Contact modal closed');
        }
    }

    // Contact modal close
    if (contactModal) {
        const closeBtn = contactModal.querySelector('.modal-close');
        const overlay = contactModal.querySelector('.modal-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeContactMethod);
        }
        if (overlay) {
            overlay.addEventListener('click', closeContactMethod);
        }
    }

    // ===== CONTACT FORM HANDLER =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            
            if (name && email) {
                alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
                contactForm.reset();
                console.log('✓ Form submitted:', {name, email});
            }
        });
    }

    // ===== ESCAPE KEY HANDLER =====
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDestinationModal();
            closeServiceModal();
            closeContactMethod();
        }
    });

    // ===== GLOBAL FUNCTION ASSIGNMENTS =====
    window.openDestinationModal = openDestinationModal;
    window.closeDestinationModal = closeDestinationModal;
    window.openServiceModal = openServiceModal;
    window.closeServiceModal = closeServiceModal;
    window.openContactMethod = openContactMethod;
    window.closeContactMethod = closeContactMethod;

    console.log('✓ All modal systems initialized and ready');
});

// Destination data with comprehensive details
const destinationData = {
    'maasai-mara': {
        title: 'Maasai Mara National Reserve',
        subtitle: 'The Crown Jewel of Kenya\'s Safari Circuit',
        location: 'Located in southwestern Kenya bordering Tanzania\'s Serengeti.',
        activities: [
            { icon: '🚙', name: 'Game Drives', desc: 'Morning and evening drives to spot the Big Five' }
        ],
        wildlife: [
            { name: 'African Lion', desc: 'One of the largest lion populations in Africa' }
        ],
        bestTime: 'July to October (Great Migration)',
        tips: [
            { title: 'Binoculars Essential', desc: 'Bring quality binoculars for distant wildlife spotting' }
        ]
    },
    'amboseli': {
        title: 'Amboseli National Park',
        subtitle: 'Land of the Elephants and Mount Kilimanjaro Views',
        location: 'Located 240 km south of Nairobi near the Tanzania border.',
        activities: [
            { icon: '🐘', name: 'Elephant Encounters', desc: 'Up close viewing of over 500 large bull elephants' },
            { icon: '⛰️', name: 'Kilimanjaro Views', desc: 'Stunning views of Africa\'s highest mountain' },
            { icon: '📷', name: 'Photography Safari', desc: 'Photographer\'s dream location' }
        ],
        wildlife: [
            { name: 'African Elephant', desc: 'Large herds with exceptional bulls' },
            { name: 'Lion', desc: 'Regular sightings of prides' },
            { name: 'Birds', desc: 'Over 400 bird species' }
        ],
        bestTime: 'December to March',
        tips: [
            { title: 'Kilimanjaro Timing', desc: 'Morning hours offer best mountain visibility' },
            { title: 'Bring Water', desc: 'It\'s hot and dry' },
            { title: 'Photography Lens', desc: 'Bring telephoto lens for distant shots' }
        ]
    },
    'tsavo-east': {
        title: 'Tsavo East National Park',
        subtitle: 'Kenya\'s Largest Park - Raw African Wilderness',
        location: 'Located 330 km southeast of Nairobi. Covers 13,747 square kilometers.',
        activities: [
            { icon: '🚙', name: 'Ruaha Valley Drive', desc: 'Explore scenic Galana River valley' },
            { icon: '🦁', name: 'Predator Tracking', desc: 'Lions, leopards, and cheetahs' },
            { icon: '🌍', name: 'Wilderness Exploration', desc: 'Vast unspoiled wilderness' }
        ],
        wildlife: [
            { name: 'African Elephant', desc: 'Large herds often covered in red dust' },
            { name: 'Lion', desc: 'High concentration of lions' },
            { name: 'Leopard', desc: 'Excellent leopard sighting opportunities' }
        ],
        bestTime: 'June to October',
        tips: [
            { title: 'Remote Experience', desc: 'One of Kenya\'s least crowded parks' },
            { title: 'Weather Ready', desc: 'Bring rain gear' },
            { title: 'Red Dust', desc: 'Protect cameras and equipment' }
        ]
    },
    'lake-nakuru': {
        title: 'Lake Nakuru National Park',
        subtitle: 'The Pink Flamingo Paradise',
        location: 'Located 160 km north of Nairobi. Easily accessible by road.',
        activities: [
            { icon: '🦩', name: 'Flamingo Viewing', desc: 'Witness millions of pink flamingos' },
            { icon: '📸', name: 'Photography', desc: 'Unique bird photography opportunities' },
            { icon: '🦆', name: 'Bird Watching', desc: 'Over 400 bird species' }
        ],
        wildlife: [
            { name: 'Flamingo', desc: 'Millions during wet season' },
            { name: 'Lion', desc: 'Small but healthy population' },
            { name: 'Waterfowl', desc: 'Pelicans and various herons' }
        ],
        bestTime: 'November to March',
        tips: [
            { title: 'Flamingo Season', desc: 'Visit Nov-Mar for largest populations' },
            { title: 'Binoculars Needed', desc: 'Essential for bird watching' },
            { title: 'Quick Trip', desc: 'Perfect for 1-2 day trips from Nairobi' }
        ]
    },
    'hells-gate': {
        title: 'Hell\'s Gate National Park',
        subtitle: 'Adventure Park with Geothermal Wonders',
        location: 'Located 120 km northwest of Nairobi near Lake Naivasha.',
        activities: [
            { icon: '🥾', name: 'Walking Safari', desc: 'Hike among wildlife on foot' },
            { icon: '🌋', name: 'Geothermal Spa', desc: 'Natural hot springs' },
            { icon: '🧗', name: 'Rock Climbing', desc: 'Challenging climbing routes' }
        ],
        wildlife: [
            { name: 'Lion', desc: 'Habituated lions for walking safari' },
            { name: 'Giraffe', desc: 'Reticulated giraffes' },
            { name: 'Birds of Prey', desc: 'Eagles and hawks' }
        ],
        bestTime: 'October to March',
        tips: [
            { title: 'Early Start', desc: 'Begin walks early morning' },
            { title: 'Physical Fitness', desc: 'Moderate fitness level required' },
            { title: 'Proper Footwear', desc: 'Sturdy hiking boots essential' }
        ]
    },
    'samburu': {
        title: 'Samburu National Reserve',
        subtitle: 'Northern Frontier - Unique Semi-Arid Landscape',
        location: 'Located 350 km north of Nairobi in the remote north.',
        activities: [
            { icon: '🦒', name: 'Unique Wildlife', desc: 'Samburu giraffe, gerenuk species' },
            { icon: '🚙', name: 'Safari Drives', desc: 'Explore rugged terrain' },
            { icon: '👥', name: 'Samburu Culture', desc: 'Visit local communities' }
        ],
        wildlife: [
            { name: 'Samburu Giraffe', desc: 'Unique species found only here' },
            { name: 'Gerenuk', desc: 'Tall, slender antelope' },
            { name: 'Elephant', desc: 'Desert elephants' }
        ],
        bestTime: 'October to March',
        tips: [
            { title: 'Remote Adventure', desc: 'One of Kenya\'s most remote parks' },
            { title: 'Unique Species', desc: 'Endemic species unique to region' },
            { title: 'Limited Facilities', desc: 'Book accommodation well in advance' }
        ]
    }
};

// Service data
const serviceData = {
    'itinerary': {
        title: 'Itinerary Planning',
        subtitle: 'Customized Safari Experiences',
        overview: 'Our expert consultants create personalized itineraries matched to your interests, budget, and timeframe.',
        features: [
            { title: 'Personalized Design', desc: 'Custom itineraries tailored to your interests' },
            { title: 'Season Optimization', desc: 'Best times for wildlife viewing' },
            { title: 'Activity Customization', desc: 'Game drives, walks, photography, and more' },
            { title: 'Flexible Scheduling', desc: 'Adjust pace and activities as desired' }
        ]
    },
    'accommodation': {
        title: 'Accommodation Booking',
        subtitle: 'Luxury Lodges & Safari Camps',
        overview: 'We partner with Kenya\'s finest lodges across all price points for comfort and safety.',
        features: [
            { title: 'Luxury Partnerships', desc: 'Access to Kenya\'s best lodges' },
            { title: 'Budget Options', desc: 'Quality accommodation at all price points' },
            { title: 'Mid-Range Selection', desc: 'Comfortable stays with excellent service' },
            { title: 'Guaranteed Booking', desc: 'Secure reservations in advance' }
        ]
    },
    'transportation': {
        title: 'Transportation Services',
        subtitle: 'Safe & Comfortable Safari Vehicles',
        overview: 'Professional drivers and well-maintained 4x4s for all terrain safari experiences.',
        features: [
            { title: 'Professional Drivers', desc: 'Experienced safari drivers' },
            { title: 'Well-Maintained Vehicles', desc: 'Modern 4x4s suited for terrain' },
            { title: 'Modern Amenities', desc: 'Comfortable seating and climate control' },
            { title: 'Expert Routing', desc: 'Knowledge of best game viewing locations' }
        ]
    },
    'photography': {
        title: 'Photography Safari Tours',
        subtitle: 'Capture Africa\'s Wildlife Beauty',
        overview: 'Specialized photography tours with guides trained in positioning for optimal shots.',
        features: [
            { title: 'Expert Photography Guides', desc: 'Guides trained in wildlife photography' },
            { title: 'Prime Viewing Locations', desc: 'Best spots for unique shots' },
            { title: 'Extended Game Drives', desc: 'Longer drives for more opportunities' },
            { title: 'Photography Workshops', desc: 'Learn from experienced photographers' }
        ]
    },
    'guides': {
        title: 'Expert Naturalist Guides',
        subtitle: 'Knowledge, Passion & Expertise',
        overview: 'Highly trained guides with in-depth knowledge of wildlife, plants, and culture.',
        features: [
            { title: 'Certified Naturalists', desc: 'Professionally trained guides' },
            { title: 'Wildlife Expertise', desc: 'Deep knowledge of animal behavior' },
            { title: 'Cultural Knowledge', desc: 'Understanding of local traditions' },
            { title: 'Multi-lingual', desc: 'Guides speaking multiple languages' }
        ]
    },
    'visa': {
        title: 'Visa & Travel Assistance',
        subtitle: 'Hassle-Free Travel Planning',
        overview: 'Assistance with visas, insurance, vaccinations, and complete pre-trip advice.',
        features: [
            { title: 'Visa Support', desc: 'Guidance through visa applications' },
            { title: 'Insurance Guidance', desc: 'Travel insurance recommendations' },
            { title: 'Health Requirements', desc: 'Vaccination information' },
            { title: 'Pre-Trip Consultation', desc: 'Complete preparation advice' }
        ]
    }
};

// Contact method data
const contactMethodData = {
    'phone': {
        title: '📞 Call Us',
        content: '<h3>Direct Phone Lines</h3><p><strong>Main:</strong> +254 (0) 123 456 789</p><p><strong>Bookings:</strong> +254 (0) 987 654 321</p><h3>Best Times</h3><p>Mon-Fri: 8AM-6PM EAT | Sat: 9AM-2PM EAT</p>'
    },
    'email': {
        title: '📧 Email Us',
        content: '<h3>Email Addresses</h3><p><strong>General:</strong> info@watembezi-adventure.com</p><p><strong>Bookings:</strong> bookings@watembezi-adventure.com</p><h3>Response Time</h3><p>We respond within 24 hours</p>'
    },
    'visit': {
        title: '📍 Visit Our Office',
        content: '<h3>Office Location</h3><p><strong>Watembezi Adventure Ltd</strong></p><p>Nairobi, Kenya</p><h3>Why Visit?</h3><p>Discuss plans face-to-face and book immediately</p>'
    },
    'hours': {
        title: '⏰ Business Hours',
        content: '<h3>Regular Hours</h3><p><strong>Mon-Fri:</strong> 8AM-6PM</p><p><strong>Sat:</strong> 9AM-2PM</p><h3>24/7 Emergency</h3><p>Assistance available for booked clients</p>'
    }
};
