/**
 * Dynamic Intelligent Mock Generator for TripWise AI.
 * Generates rich, realistic itineraries for ANY city worldwide (Bhopal, Rewa, Tokyo/Japan, Paris, Rome, etc.).
 * Includes pre-embedded geographic coordinates for instant, high-fidelity mapping and distance routing.
 */

const CURATED_CITIES = {
  japan: {
    destination: 'Tokyo, Japan',
    title: 'Iconic Tokyo: Shrines, Neon Skylines & Culinary Wonders',
    summary: 'Immerse yourself in Japan’s vibrant capital: historic Asakusa and Meiji Shrine, futuristic Shibuya Sky, bustling Tsukiji seafood alleys, and tranquil gardens.',
    stopsByDay: [
      {
        title: 'Historic Asakusa & Modern Skyline',
        location: 'Asakusa & Sumida District',
        summary: 'Explore ancient temple heritage, traditional street snacks, and panoramic skyline lookouts.',
        stops: [
          {
            title: 'Senso-ji Temple & Asakusa Kaminarimon Gate',
            description: 'Tokyo’s oldest Buddhist temple founded in 645 AD, famous for the giant red lantern and sacred incense burner.',
            time: '09:00 AM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '¥0 (Free)',
            latitude: 35.7148,
            longitude: 139.7967,
            tips: ['Purify your hands at the dragon fountain before entering the main hall.'],
          },
          {
            title: 'Nakamise-dori Shopping Street',
            description: 'Historic shopping promenade lined with 90+ heritage stalls serving fresh ningyo-yaki cakes, matcha ice cream, and handicrafts.',
            time: '10:45 AM',
            durationMinutes: 60,
            category: 'Food',
            estimatedCost: '¥800',
            latitude: 35.7126,
            longitude: 139.7963,
            tips: ['Consume food and snacks near the shop storefront per Japanese street etiquette.'],
          },
          {
            title: 'Tokyo Skytree Observation Deck',
            description: 'Marvel at 360-degree views from the 450-meter-high Tembo Galleria overlooking Mount Fuji on clear days.',
            time: '01:00 PM',
            durationMinutes: 120,
            category: 'Sightseeing',
            estimatedCost: '¥2,700',
            latitude: 35.7100,
            longitude: 139.8107,
            tips: ['Advance fast-track tickets bypass long ground-floor lines.'],
          },
          {
            title: 'Ueno Park & Tokyo National Museum',
            description: 'Stroll around tranquil Shinobazu pond and visit Japan’s oldest and largest museum housing national samurai treasures.',
            time: '04:00 PM',
            durationMinutes: 105,
            category: 'Culture',
            estimatedCost: '¥1,000',
            latitude: 35.7188,
            longitude: 139.7765,
            tips: ['The Japanese gallery on the second floor displays authentic katana swords and kimono silks.'],
          },
        ],
      },
      {
        title: 'Modern Culture, Harajuku & Neon Shibuya',
        location: 'Harajuku & Shibuya',
        summary: 'Experience tranquil forest shrines, avant-garde youth fashion, and the world’s busiest pedestrian crossing.',
        stops: [
          {
            title: 'Meiji Jingu Shrine & Forest Trail',
            description: 'Serene Shinto shrine dedicated to Emperor Meiji, nestled in a dense sacred forest of 100,000+ donated trees.',
            time: '09:00 AM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '¥0 (Free)',
            latitude: 35.6764,
            longitude: 139.6993,
            tips: ['Admire the ceremonial sake barrel wall along the gravel approach.'],
          },
          {
            title: 'Takeshita Street & Harajuku Fashion Alley',
            description: 'Epicenter of Japanese pop culture, crepe stalls, rainbow cotton candy, and quirky boutique fashion.',
            time: '11:00 AM',
            durationMinutes: 75,
            category: 'Sightseeing',
            estimatedCost: '¥1,200',
            latitude: 35.6716,
            longitude: 139.7032,
            tips: ['Try Marion Crepes warm strawberry banana crepe with custard.'],
          },
          {
            title: 'Shibuya Crossing & Shibuya Sky Rooftop',
            description: 'Walk across the iconic scramble crossing, visit Hachiko statue, and head 229m up to the 360° open-air Sky Deck.',
            time: '01:30 PM',
            durationMinutes: 120,
            category: 'Sightseeing',
            estimatedCost: '¥2,200',
            latitude: 35.6595,
            longitude: 139.7005,
            tips: ['Sunset time slots sell out days ahead; pre-book online for golden hour.'],
          },
          {
            title: 'Shinjuku Gyoen National Garden',
            description: 'Exquisite 144-acre botanical park blending traditional Japanese landscape gardening, English lawns, and French formal gardens.',
            time: '04:30 PM',
            durationMinutes: 90,
            category: 'Relaxation',
            estimatedCost: '¥500',
            latitude: 35.6852,
            longitude: 139.7101,
            tips: ['Alcohol is prohibited inside; ideal peaceful retreat for walking and tea.'],
          },
        ],
      },
      {
        title: 'Seafood Feasts, Digital Art & Tokyo Tower',
        location: 'Tsukiji, Toyosu & Minato',
        summary: 'World-renowned seafood gastronomy, immersive digital art exhibitions, and retro city landmarks.',
        stops: [
          {
            title: 'Tsukiji Outer Market Fresh Seafood Trail',
            description: 'Bustling maze of open-air stalls serving fresh otoro tuna nigiri, grilled scallops, tamagoyaki omelets, and fresh oysters.',
            time: '08:30 AM',
            durationMinutes: 105,
            category: 'Food',
            estimatedCost: '¥3,500',
            latitude: 35.6654,
            longitude: 139.7705,
            tips: ['Arrive with an appetite; cash is preferred by independent artisan vendors.'],
          },
          {
            title: 'teamLab Planets Tokyo (Toyosu)',
            description: 'Critically acclaimed body-immersive digital art museum where you walk barefoot through crystal water rooms and floating flower gardens.',
            time: '11:30 AM',
            durationMinutes: 120,
            category: 'Adventure',
            estimatedCost: '¥3,800',
            latitude: 35.6517,
            longitude: 139.7897,
            tips: ['Wear pants that roll up above knees as you wade through knee-deep digital water.'],
          },
          {
            title: 'Ginza Avenue Luxury Promenade & Itoya Stationery',
            description: 'Tokyo’s premier boulevard; visit the 12-story Itoya stationery store and depachika gourmet basements.',
            time: '02:30 PM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '¥1,500',
            latitude: 35.6719,
            longitude: 139.7648,
            tips: ['On weekends, main Ginza street is closed to cars for pedestrian strolling.'],
          },
          {
            title: 'Tokyo Tower Main Deck & Twilight Vista',
            description: 'The beloved 333m Eiffel-inspired communications tower glowing vibrant orange in twilight over the metropolis.',
            time: '05:00 PM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '¥1,200',
            latitude: 35.6586,
            longitude: 139.7454,
            tips: ['Step onto the glass floor windows looking straight down 150 meters.'],
          },
        ],
      },
    ],
  },
  tokyo: {
    // Alias to japan curated data
    destination: 'Tokyo, Japan',
    title: 'Iconic Tokyo: Shrines, Neon Skylines & Culinary Wonders',
    summary: 'Immerse yourself in Japan’s vibrant capital: historic Asakusa and Meiji Shrine, futuristic Shibuya Sky, bustling Tsukiji seafood alleys, and tranquil gardens.',
    stopsByDay: [], // will inherit below
  },
  paris: {
    destination: 'Paris, France',
    title: 'Romantic Paris: Monuments, Art & Seine River Walks',
    summary: 'Experience the City of Light: iconic Eiffel Tower panoramas, the masterpieces of the Louvre, bohemian Montmartre, and cozy Parisian bistros.',
    stopsByDay: [
      {
        title: 'Iconic Landmarks & Royal Heritage',
        location: 'Central Paris & 7th Arrondissement',
        summary: 'Explore the Eiffel Tower, Seine riverside, and world-renowned museum galleries.',
        stops: [
          {
            title: 'Eiffel Tower & Champ de Mars',
            description: 'Ascend Gustave Eiffel’s 330m iron masterpiece for panoramic views over Paris, followed by a stroll along Champ de Mars lawns.',
            time: '09:00 AM',
            durationMinutes: 120,
            category: 'Sightseeing',
            estimatedCost: '€28',
            latitude: 48.8584,
            longitude: 2.2945,
            tips: ['Book summit elevator tickets online 60 days ahead for early morning access.'],
          },
          {
            title: 'Musée d’Orsay',
            description: 'Housed in a magnificent Beaux-Arts railway station, home to the world’s largest collection of Impressionist masterpieces by Monet, Van Gogh, and Degas.',
            time: '12:00 PM',
            durationMinutes: 120,
            category: 'Culture',
            estimatedCost: '€16',
            latitude: 48.8599,
            longitude: 2.3266,
            tips: ['Visit the 5th floor clock face gallery for striking silhouette photos.'],
          },
          {
            title: 'Tuileries Garden & Café Angelina',
            description: 'Stroll through Catherine de Medici’s royal palace gardens and enjoy Angelina’s legendary African hot chocolate.',
            time: '03:00 PM',
            durationMinutes: 75,
            category: 'Food',
            estimatedCost: '€15',
            latitude: 48.8634,
            longitude: 2.3275,
            tips: ['The classic Mont-Blanc chestnut pastry pairs perfectly with rich hot chocolate.'],
          },
          {
            title: 'Louvre Museum Courtyard & Pyramid at Twilight',
            description: 'Explore the world’s largest art museum, home to the Mona Lisa and Venus de Milo, illuminated as dusk settles.',
            time: '05:00 PM',
            durationMinutes: 120,
            category: 'Culture',
            estimatedCost: '€22',
            latitude: 48.8606,
            longitude: 2.3376,
            tips: ['Enter via the Carrousel du Louvre underground mall for shorter security queues.'],
          },
        ],
      },
      {
        title: 'Historic Heart, Notre-Dame & Latin Quarter',
        location: 'Île de la Cité & Saint-Germain',
        summary: 'Gothic architecture, cobblestone bookshops, and intellectual café culture.',
        stops: [
          {
            title: 'Notre-Dame Cathedral & Île de la Cité',
            description: 'Marvel at the iconic French Gothic cathedral, flying buttresses, and the historic heart of Paris on the Seine island.',
            time: '09:30 AM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '€0 (Free)',
            latitude: 48.8530,
            longitude: 2.3499,
            tips: ['Walk around the rear garden square for picturesque photos of the choir buttresses.'],
          },
          {
            title: 'Shakespeare and Company Bookshop & Café',
            description: 'Historic English-language bookstore frequented by Hemingway and James Joyce, nestled right across the river from Notre-Dame.',
            time: '11:30 AM',
            durationMinutes: 60,
            category: 'Culture',
            estimatedCost: '€10',
            latitude: 48.8526,
            longitude: 2.3471,
            tips: ['Photography is strictly restricted inside the vintage reading rooms; browse quietly.'],
          },
          {
            title: 'Luxembourg Gardens & Medici Fountain',
            description: 'Relax by tree-lined promenades, formal French flowerbeds, and the romantic 1630s Italianate Medici Fountain.',
            time: '01:30 PM',
            durationMinutes: 90,
            category: 'Relaxation',
            estimatedCost: '€0 (Free)',
            latitude: 48.8462,
            longitude: 2.3371,
            tips: ['Pull up one of the iconic green metal chairs around the central pond.'],
          },
          {
            title: 'Saint-Germain-des-Prés & Café de Flore',
            description: 'Historic neighborhood of philosophers; sip café crème where Jean-Paul Sartre and Simone de Beauvoir wrote.',
            time: '03:45 PM',
            durationMinutes: 75,
            category: 'Food',
            estimatedCost: '€18',
            latitude: 48.8540,
            longitude: 2.3326,
            tips: ['Outdoor terrace seating offers quintessential Parisian people watching.'],
          },
        ],
      },
      {
        title: 'Bohemian Montmartre & Arc de Triomphe',
        location: '18th & 8th Arrondissements',
        summary: 'Artistic hilltop villages, breathtaking city panoramas, and grand Napoleonic boulevards.',
        stops: [
          {
            title: 'Sacré-Cœur Basilica & Montmartre Hilltop',
            description: 'Roman-Byzantine white travertine basilica standing at the highest point of Paris with dramatic panoramic views.',
            time: '09:30 AM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '€0 (Free)',
            latitude: 48.8867,
            longitude: 2.3431,
            tips: ['Climb the basilica dome for an unobstructed view across the entire Parisian basin.'],
          },
          {
            title: 'Place du Tertre Artists Square',
            description: 'Charming historic cobblestone square where local portrait artists, painters, and caricaturists set up open-air easels.',
            time: '11:30 AM',
            durationMinutes: 60,
            category: 'Culture',
            estimatedCost: '€30',
            latitude: 48.8865,
            longitude: 2.3408,
            tips: ['Watch multiple artists before commissioning a quick portrait or sketch.'],
          },
          {
            title: 'Arc de Triomphe & Champs-Élysées Promenade',
            description: 'Napoléon’s triumphal arch honoring French military victories; climb to the rooftop for the 12-avenue star perspective.',
            time: '02:30 PM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '€16',
            latitude: 48.8738,
            longitude: 2.2950,
            tips: ['Always use the pedestrian underground tunnel to reach the arch safely.'],
          },
          {
            title: 'Seine River Sunset Cruise (Bateaux Mouches)',
            description: 'Glide along the Seine as the monuments and historic bridges illuminate beneath twilight skies.',
            time: '05:30 PM',
            durationMinutes: 75,
            category: 'Relaxation',
            estimatedCost: '€18',
            latitude: 48.8637,
            longitude: 2.3013,
            tips: ['Time your departure so you pass the Eiffel Tower on the hour when it sparkles.'],
          },
        ],
      },
    ],
  },
  rome: {
    destination: 'Rome, Italy',
    title: 'Eternal Rome: Ancient Empires, Baroque Plazas & Italian Feasts',
    summary: 'Step into history: the Colosseum, Roman Forum, Trevi Fountain, Vatican wonders, and world-class carbonara in Trastevere.',
    stopsByDay: [
      {
        title: 'Ancient Rome: Gladiators & Emperors',
        location: 'Historic Center / Colosseo',
        summary: 'Explore the epicenter of the Roman Empire and imperial palaces.',
        stops: [
          {
            title: 'Colosseum (Flavian Amphitheatre)',
            description: 'The monumental 2,000-year-old stone amphitheater that once seated 50,000 spectators for gladiatorial battles.',
            time: '09:00 AM',
            durationMinutes: 120,
            category: 'Culture',
            estimatedCost: '€18',
            latitude: 41.8902,
            longitude: 12.4922,
            tips: ['Combined ticket includes Roman Forum and Palatine Hill access.'],
          },
          {
            title: 'Roman Forum & Palatine Hill',
            description: 'Walk the ancient Via Sacra, temples of Saturn and Vesta, and the imperial ruins where Rome was founded.',
            time: '11:30 AM',
            durationMinutes: 105,
            category: 'Sightseeing',
            estimatedCost: 'Included',
            latitude: 41.8925,
            longitude: 12.4853,
            tips: ['Carry a refillable water bottle to fill up at Rome’s cold nasoni public fountains.'],
          },
          {
            title: 'Trevi Fountain (Fontana di Trevi)',
            description: 'Nicola Salvi’s breathtaking Baroque fountain masterpiece featuring Oceanus; toss a coin over your left shoulder to ensure your return to Rome.',
            time: '02:30 PM',
            durationMinutes: 45,
            category: 'Sightseeing',
            estimatedCost: '€0 (Free)',
            latitude: 41.9009,
            longitude: 12.4833,
            tips: ['Grab artisanal gelato at nearby Giolitti or San Crispino.'],
          },
          {
            title: 'Pantheon & Piazza della Rotonda',
            description: 'The best-preserved ancient Roman monument with its unreinforced concrete dome and open central oculus, resting place of Raphael.',
            time: '04:00 PM',
            durationMinutes: 60,
            category: 'Culture',
            estimatedCost: '€5',
            latitude: 41.8986,
            longitude: 12.4769,
            tips: ['Observe the light beam streaming through the 9-meter ceiling oculus.'],
          },
        ],
      },
      {
        title: 'Vatican Splendors & Trastevere Twilight',
        location: 'Vatican City & Trastevere',
        summary: 'Renaissance art treasures, St. Peter’s Basilica, and bustling cobblestone trattorias.',
        stops: [
          {
            title: 'Vatican Museums & Sistine Chapel',
            description: 'Marvel at classical sculptures, the Raphael Rooms, and Michelangelo’s ceiling frescoes and The Last Judgment.',
            time: '08:30 AM',
            durationMinutes: 150,
            category: 'Culture',
            estimatedCost: '€20',
            latitude: 41.9065,
            longitude: 12.4536,
            tips: ['Modest dress code strictly enforced: shoulders and knees must be covered.'],
          },
          {
            title: 'St. Peter’s Basilica & St. Peter’s Square',
            description: 'The world’s largest church, home to Michelangelo’s Pietà, Bernini’s bronze Baldacchino, and the grand colonnade.',
            time: '11:45 AM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '€0 (Free)',
            latitude: 41.9022,
            longitude: 12.4539,
            tips: ['Climb the 551 steps of the dome for the iconic view over St. Peter’s Square.'],
          },
          {
            title: 'Piazza Navona & Fountain of the Four Rivers',
            description: 'Grand Baroque square built on the ancient Stadium of Domitian, featuring Bernini’s dramatic sculpted fountain and street artists.',
            time: '03:00 PM',
            durationMinutes: 60,
            category: 'Sightseeing',
            estimatedCost: '€0 (Free)',
            latitude: 41.8992,
            longitude: 12.4731,
            tips: ['Acoustics in the square make it a lively venue for classical buskers.'],
          },
          {
            title: 'Trastevere Heritage Alleys & Authentic Trattoria Dinner',
            description: 'Cross the Tiber to wander ivy-draped medieval cobblestone alleys and enjoy authentic Cacio e Pepe and Tonnarello pasta.',
            time: '05:30 PM',
            durationMinutes: 105,
            category: 'Food',
            estimatedCost: '€30',
            latitude: 41.8885,
            longitude: 12.4705,
            tips: ['Look for family-run osterias with handwritten Italian chalkboards.'],
          },
        ],
      },
    ],
  },
  bhopal: {
    destination: 'Bhopal, Madhya Pradesh, India',
    title: 'Heritage, Lakes & Wildlife in Bhopal',
    summary: 'Experience the City of Lakes: serene evening boating on Upper Lake, UNESCO prehistoric art at Bhimbetka, the grand Taj-ul-Masajid, and spicy Bhopali street food.',
    stopsByDay: [
      {
        title: 'Lakes, Temples & Old City Heritage',
        location: 'Old Bhopal & Upper Lake',
        summary: 'Explore historic architecture, serene lake breezes, and bustling heritage lanes.',
        stops: [
          {
            title: 'Upper Lake (Bhojtal) & Boat Club Walk',
            description: 'Stroll along the historic 11th-century lake embankment, take a scenic cruise, and enjoy morning chai.',
            time: '09:00 AM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '₹100',
            latitude: 23.2399,
            longitude: 77.3546,
            tips: ['Early morning boat rides offer the best birdwatching and calm waters.'],
          },
          {
            title: 'Taj-ul-Masajid & Shaukat Mahal',
            description: 'Visit one of Asia’s largest and most majestic mosques featuring pink minarets, followed by Indo-Gothic Shaukat Mahal.',
            time: '11:30 AM',
            durationMinutes: 75,
            category: 'Culture',
            estimatedCost: '₹0',
            latitude: 23.2629,
            longitude: 77.3928,
            tips: ['Dress modestly; slip-on shoes recommended for easy shoe storage.'],
          },
          {
            title: 'Bhopali Poha Jalebi & Chatori Gali Food Trail',
            description: 'Sample legendary Bhopali poha topped with sev and pomegranate, plus fresh hot jalebi and traditional Sulemani chai.',
            time: '01:30 PM',
            durationMinutes: 60,
            category: 'Food',
            estimatedCost: '₹150',
            latitude: 23.2555,
            longitude: 77.4012,
            tips: ['Try the classic salty Sulemani chai with thick cream.'],
          },
          {
            title: 'Madhya Pradesh Tribal Museum & Sunset View',
            description: 'Immerse yourself in world-class art installations and life-size tribal dwellings celebrating regional indigenous heritage.',
            time: '04:00 PM',
            durationMinutes: 120,
            category: 'Culture',
            estimatedCost: '₹50',
            latitude: 23.2205,
            longitude: 77.3949,
            tips: ['Stay until dusk to catch the illuminated outdoor courtyard.'],
          },
        ],
      },
      {
        title: 'UNESCO Wonders & Ancient Marvels',
        location: 'Sanchi & Bhojpur Excursion',
        summary: 'Journey into ancient Indian history, sacred Buddhist stupas, and monolithic stone wonders.',
        stops: [
          {
            title: 'The Great Sanchi Stupa (UNESCO Heritage)',
            description: 'Explore the 3rd-century BCE Buddhist complex commissioned by Emperor Ashoka with intricately carved torana gateways.',
            time: '09:30 AM',
            durationMinutes: 150,
            category: 'Culture',
            estimatedCost: '₹40',
            latitude: 23.4793,
            longitude: 77.7397,
            tips: ['Hire an ASI authorized guide near the gate for the gateway symbol stories.'],
          },
          {
            title: 'Bhojpur Temple (Bhojeshwar Temple)',
            description: 'Marvel at the unfinished 11th-century temple housing one of the largest monolithic Shiva lingams in India.',
            time: '02:00 PM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '₹25',
            latitude: 23.1000,
            longitude: 77.5833,
            tips: ['Observe the ancient architectural blueprints engraved into surrounding rocks.'],
          },
          {
            title: 'Van Vihar National Park Lake Drive',
            description: 'Scenic open-air zoological park nestled along the lake shore, home to free-roaming deer, tigers, and exotic bird species.',
            time: '04:30 PM',
            durationMinutes: 90,
            category: 'Adventure',
            estimatedCost: '₹50',
            latitude: 23.2295,
            longitude: 77.3658,
            tips: ['Rent a bicycle at the entrance gate for an eco-friendly lake drive.'],
          },
        ],
      },
      {
        title: 'Arts, Craft Bazaars & Panoramic Sunset',
        location: 'Shamla Hills & New Bhopal',
        summary: 'Contemporary arts, local handicraft shopping, and scenic hilltop lookouts.',
        stops: [
          {
            title: 'Bharat Bhavan Multi-Arts Complex',
            description: 'Charles Correa designed art center overlooking Upper Lake with galleries, poetry libraries, and tribal sculptures.',
            time: '10:00 AM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '₹20',
            latitude: 23.2384,
            longitude: 77.3912,
            tips: ['Check the day schedule for spontaneous live folk recitals.'],
          },
          {
            title: 'Chowk Bazaar & Mrignayani Handloom Emporium',
            description: 'Shop for authentic Chanderi and Maheshwari handloom silk sarees, zari zardozi craft, and brassware.',
            time: '01:00 PM',
            durationMinutes: 100,
            category: 'Sightseeing',
            estimatedCost: '₹200',
            latitude: 23.2591,
            longitude: 77.4019,
            tips: ['Mrignayani offers certified government-stamped authentic silk weaves.'],
          },
          {
            title: 'Kerwa Dam Sunset Lookout',
            description: 'Relax amidst lush green forests and water reservoirs with pleasant evening breezes away from city sounds.',
            time: '04:30 PM',
            durationMinutes: 90,
            category: 'Relaxation',
            estimatedCost: '₹0',
            latitude: 23.1491,
            longitude: 77.3752,
            tips: ['Great spot for sunset silhouettes and local pakoras from roadside stalls.'],
          },
        ],
      },
    ],
  },
  rewa: {
    destination: 'Rewa, Madhya Pradesh, India',
    title: 'Rewa: Land of White Tigers & Majestic Waterfalls',
    summary: 'Discover royal Baghelkhand heritage, the historic Rewa Fort, the world-famous White Tiger Safari in Mukundpur, and roaring cascading waterfalls.',
    stopsByDay: [
      {
        title: 'Royal Heritage & The White Tiger Safari',
        location: 'Rewa City & Mukundpur',
        summary: 'Explore royal palaces, white tiger sanctuaries, and ancient weapons collections.',
        stops: [
          {
            title: 'Mukundpur White Tiger Safari & Zoo',
            description: 'Visit the birthplace of the world’s first captured white tiger, Mohan, in a lush natural wildlife sanctuary.',
            time: '09:00 AM',
            durationMinutes: 150,
            category: 'Adventure',
            estimatedCost: '₹150',
            latitude: 24.4172,
            longitude: 81.2584,
            tips: ['Book safari jeep tickets early in the morning for best animal sightings.'],
          },
          {
            title: 'Rewa Royal Fort & Baghel Museum (Rewa Kila)',
            description: 'Explore the 400-year-old fort where the rivers meet, housing royal swords, ornate silver thrones, and antique artifacts.',
            time: '01:30 PM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '₹50',
            latitude: 24.5362,
            longitude: 81.2982,
            tips: ['Look for the preservation hall dedicated to Maharaja Martand Singh.'],
          },
          {
            title: 'Venkat Bhawan & Bagheli Culinary Delights',
            description: 'Marvel at Italian-styled royal summer architecture, followed by traditional Bagheli Indrahar kadhi and Mawa sweets.',
            time: '04:30 PM',
            durationMinutes: 75,
            category: 'Food',
            estimatedCost: '₹120',
            latitude: 24.5385,
            longitude: 81.3005,
            tips: ['Indrahar is a steamed lentil delicacy unique to Rewa and Baghelkhand.'],
          },
        ],
      },
      {
        title: 'Spectacular Waterfalls & Canyon Views',
        location: 'Chachai & Keoti Falls Circuit',
        summary: 'Witness the roaring waterfalls of the Tons and Mahana river riverbeds cutting deep rocky canyons.',
        stops: [
          {
            title: 'Chachai Falls Panoramic Lookout',
            description: 'Admire one of India’s highest natural waterfalls plunging over 130 meters down steep stone gorges.',
            time: '09:30 AM',
            durationMinutes: 120,
            category: 'Sightseeing',
            estimatedCost: '₹20',
            latitude: 24.7797,
            longitude: 81.2842,
            tips: ['Stay strictly within designated viewing platforms; canyon edges are steep.'],
          },
          {
            title: 'Keoti Falls & Historic Fortified Watchtower',
            description: 'Breathtaking segmented waterfall dropping into a scenic forested basin with historic watchtower lookouts.',
            time: '01:00 PM',
            durationMinutes: 100,
            category: 'Adventure',
            estimatedCost: '₹10',
            latitude: 24.8142,
            longitude: 81.3256,
            tips: ['Pack drinking water and light picnic snacks as options are sparse.'],
          },
          {
            title: 'Purwa Falls & Sunset Canyon Walk',
            description: 'A wide curtain waterfall on the Tons River plunging through sandstone formations illuminated by golden twilight.',
            time: '04:00 PM',
            durationMinutes: 90,
            category: 'Relaxation',
            estimatedCost: '₹0',
            latitude: 24.7792,
            longitude: 81.4251,
            tips: ['Watch the dramatic mist rising over the river during late afternoon.'],
          },
        ],
      },
    ],
  },
  goa: {
    destination: 'Goa, India',
    title: 'Sun, Sand & Heritage: Complete Goa Coastal Experience',
    summary: 'Sun-drenched golden beaches, Portuguese colonial churches in Old Goa, clifftop forts, and vibrant beach shack cuisine.',
    stopsByDay: [
      {
        title: 'North Goa: Beaches, Forts & Shacks',
        location: 'Calangute, Candolim & Aguada',
        summary: 'Clifftop lighthouses, Arabian Sea waves, and fresh seafood.',
        stops: [
          {
            title: 'Fort Aguada & Historic 17th Century Lighthouse',
            description: 'Well-preserved Portuguese fort standing at the mouth of Mandovi river with sweeping sea panoramas.',
            time: '09:00 AM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '₹50',
            latitude: 15.4926,
            longitude: 77.7737,
            tips: ['Morning breeze makes climbing the fort walls very comfortable.'],
          },
          {
            title: 'Calangute Beach & Water Sports Promenade',
            description: 'The Queen of Beaches; relax on sun loungers, enjoy parasailing, and sip coconut water.',
            time: '11:30 AM',
            durationMinutes: 120,
            category: 'Adventure',
            estimatedCost: '₹500',
            latitude: 15.5439,
            longitude: 73.7553,
            tips: ['Book licensed government-regulated water sports operators.'],
          },
          {
            title: 'Anjuna Flea Market & Curlies Sunset Vista',
            description: 'Legendary flea market with bohemian clothes, handmade jewelry, and live beachfront music.',
            time: '04:00 PM',
            durationMinutes: 120,
            category: 'Culture',
            estimatedCost: '₹200',
            latitude: 15.5794,
            longitude: 73.7412,
            tips: ['Arrive for the golden hour sunset right as the beach lights come on.'],
          },
        ],
      },
      {
        title: 'Old Goa UNESCO Churches & Spice Plantations',
        location: 'Old Goa & Ponda',
        summary: 'Sacred Portuguese Baroque architecture and fragrant spice trail tours.',
        stops: [
          {
            title: 'Basilica of Bom Jesus (UNESCO World Heritage)',
            description: 'Historic 1605 Baroque basilica holding the sacred relics of St. Francis Xavier in a silver casket.',
            time: '09:30 AM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '₹0 (Free)',
            latitude: 15.5009,
            longitude: 73.9116,
            tips: ['Admire the intricate carved gilded altarpiece.'],
          },
          {
            title: 'Se Cathedral & Church of St. Francis of Assisi',
            description: 'One of the largest churches in Asia, dedicated to Catherine of Alexandria, famous for the Golden Bell.',
            time: '11:30 AM',
            durationMinutes: 75,
            category: 'Culture',
            estimatedCost: '₹0 (Free)',
            latitude: 15.5036,
            longitude: 73.9128,
            tips: ['Visit the adjacent archaeological museum.'],
          },
          {
            title: 'Sahakari Spice Farm Traditional Feast',
            description: 'Guided plantation tour through vanilla, cardamom, and pepper vines, followed by traditional Goan lunch served on banana leaves.',
            time: '01:30 PM',
            durationMinutes: 120,
            category: 'Food',
            estimatedCost: '₹500',
            latitude: 15.4128,
            longitude: 74.0204,
            tips: ['Sip the refreshing welcome lemongrass tea upon arrival.'],
          },
        ],
      },
    ],
  },
  jaipur: {
    destination: 'Jaipur, Rajasthan, India',
    title: 'The Pink City: Palaces, Forts & Royal Astronomy',
    summary: 'Immerse in royal Rajputana grandeur: the iconic Hawa Mahal honeycomb, hilltop Amer Fort, UNESCO astronomical observatories, and vibrant bazaars.',
    stopsByDay: [
      {
        title: 'Royal City Palaces & Iconic Monuments',
        location: 'Old Walled City Jaipur',
        summary: 'Marvel at pink sandstone architecture and royal heritage.',
        stops: [
          {
            title: 'Hawa Mahal (Palace of Winds)',
            description: 'Stunning 5-story pink honeycomb facade with 953 jharokhas built for royal women to observe street festivals.',
            time: '09:00 AM',
            durationMinutes: 75,
            category: 'Sightseeing',
            estimatedCost: '₹50',
            latitude: 26.9239,
            longitude: 75.8267,
            tips: ['Morning sun illuminates the pink sandstone facade beautifully for photography.'],
          },
          {
            title: 'City Palace Jaipur & Chandra Mahal',
            description: 'A dazzling blend of Rajasthani and Mughal architecture, housing royal costumes, armory, and the famous Peacock Gate.',
            time: '10:45 AM',
            durationMinutes: 120,
            category: 'Culture',
            estimatedCost: '₹300',
            latitude: 26.9258,
            longitude: 75.8236,
            tips: ['Don’t miss the two massive silver vessels that hold Guinness world records.'],
          },
          {
            title: 'Jantar Mantar UNESCO Astronomical Observatory',
            description: '18th-century collection of 19 architectural astronomical instruments including the world’s largest stone sundial.',
            time: '01:30 PM',
            durationMinutes: 75,
            category: 'Culture',
            estimatedCost: '₹200',
            latitude: 26.9248,
            longitude: 75.8246,
            tips: ['Check the local solar time against your phone at the Vrihat Samrat Yantra sundial.'],
          },
          {
            title: 'Johari Bazaar & Traditional Pyaz Kachori Trail',
            description: 'Famous gemstone and jewelry market; treat yourself to piping hot crispy onion kachoris and sweet lassi.',
            time: '03:45 PM',
            durationMinutes: 90,
            category: 'Food',
            estimatedCost: '₹150',
            latitude: 26.9197,
            longitude: 75.8258,
            tips: ['Try Rawat Mishthan Bhandar or LMB for authentic Rajasthani sweets.'],
          },
        ],
      },
      {
        title: 'Amer Grand Fort & Jal Mahal Vista',
        location: 'Amer & Man Sagar Lake',
        summary: 'Massive ramparts, mirror palaces, and serene lake reflections.',
        stops: [
          {
            title: 'Amer Fort (Amber Palace)',
            description: 'Majestic hilltop fortress with cobblestone paths, Sheesh Mahal (hall of mirrors), and panoramic Maota Lake views.',
            time: '09:00 AM',
            durationMinutes: 150,
            category: 'Culture',
            estimatedCost: '₹100',
            latitude: 26.9855,
            longitude: 75.8513,
            tips: ['Enter the Sheesh Mahal where a single candle illuminates the entire ceiling.'],
          },
          {
            title: 'Jal Mahal (Water Palace Lookout)',
            description: 'Submerged 18th-century pleasure palace appearing to float serenely in the middle of Man Sagar Lake.',
            time: '12:30 PM',
            durationMinutes: 45,
            category: 'Sightseeing',
            estimatedCost: '₹0 (Free)',
            latitude: 26.9656,
            longitude: 75.8592,
            tips: ['Roadside promenade features traditional Rajasthani costume photography.'],
          },
          {
            title: 'Nahargarh Fort & Sunset Over Pink City',
            description: 'Clifftop fort along the Aravalli hills offering the most spectacular sunset vista overlooking the entire Jaipur skyline.',
            time: '04:30 PM',
            durationMinutes: 100,
            category: 'Relaxation',
            estimatedCost: '₹50',
            latitude: 26.9373,
            longitude: 75.8156,
            tips: ['Padao open-air café at the fort terrace serves refreshing beverages with sunset views.'],
          },
        ],
      },
    ],
  },
};

// Aliases
CURATED_CITIES.tokyo = CURATED_CITIES.japan;

/**
 * Parses user destination cleanly from any prompt text.
 */
function extractDestinationName(userPrompt) {
  const prompt = userPrompt.trim();
  const lower = prompt.toLowerCase();

  for (const key of Object.keys(CURATED_CITIES)) {
    if (lower.includes(key)) {
      return CURATED_CITIES[key].destination;
    }
  }

  // Regex matches for "trip to X", "in X", "explore X", "visit X"
  const patterns = [
    /(?:trip to|visit|explore|travel to|going to|holiday in|vacation in|in)\s+([A-Za-z\s]+?)(?:\s+for|\s+with|\s+under|\s+next|\s+this|\s*\.|\s*,|\s*$)/i,
    /(?:^|\s)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
  ];

  for (const pat of patterns) {
    const match = prompt.match(pat);
    if (match && match[1]) {
      const candidate = match[1].trim();
      const lowerCandidate = candidate.toLowerCase();
      // Filter out common non-location words
      if (!['a', 'the', 'my', 'days', 'day', 'trip', 'budget', 'family', 'friends', 'weekend'].includes(lowerCandidate)) {
        return candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
    }
  }

  return 'Curated Destination';
}

/**
 * Extracts number of days from prompt (defaults to 3, max 7)
 */
function extractDuration(userPrompt) {
  const lower = (userPrompt || '').toLowerCase();
  const match = lower.match(/(\d+)\s*days?/);
  if (match && parseInt(match[1])) {
    return Math.min(Math.max(parseInt(match[1]), 1), 7);
  }
  return 3;
}

/**
 * Generates an intelligent, high-fidelity itinerary for ANY city on Earth.
 */
export function generateClientMock(userPrompt) {
  const lower = (userPrompt || '').toLowerCase();
  const duration = extractDuration(userPrompt);

  // 1. Check curated rich cities first (Japan, Paris, Rome, Bhopal, Rewa, Jaipur, Goa)
  for (const [key, data] of Object.entries(CURATED_CITIES)) {
    if (lower.includes(key)) {
      const days = [];
      const templateDays = data.stopsByDay;

      for (let d = 1; d <= duration; d++) {
        const templateDay = templateDays[(d - 1) % templateDays.length];
        days.push({
          day: d,
          title: `Day ${d}: ${templateDay.title}`,
          location: templateDay.location,
          summary: templateDay.summary,
          stops: templateDay.stops.map((s, idx) => ({
            id: `day${d}-stop${idx + 1}`,
            time: s.time,
            title: s.title,
            description: s.description,
            durationMinutes: s.durationMinutes,
            category: s.category,
            estimatedCost: s.estimatedCost,
            tips: s.tips,
            latitude: s.latitude,
            longitude: s.longitude,
          })),
        });
      }

      return {
        trip: {
          title: `${duration} Days in ${data.destination.split(',')[0]}: Curated Highlights`,
          destination: data.destination,
          duration,
          travelers: 2,
          summary: data.summary,
        },
        days,
      };
    }
  }

  // 2. Dynamic City Engine (Generates rich, tailored itineraries for ANY city requested!)
  const cityName = extractDestinationName(userPrompt);
  const days = [];

  const activityThemes = [
    {
      title: 'Iconic Landmarks & Historic Heritage Walk',
      summary: `Discover the legendary origin story, architectural monuments, and heritage heart of ${cityName}.`,
      stops: [
        {
          title: `${cityName} Historic Old Town Center`,
          description: `Morning walking tour through historical town squares, vintage architecture, and central clock towers.`,
          time: '09:30 AM',
          durationMinutes: 120,
          category: 'Sightseeing',
          estimatedCost: '$10 / ₹300',
          tips: ['Comfortable walking shoes and morning golden-hour photography.'],
        },
        {
          title: `${cityName} Central Market & Food Promenade`,
          description: `Savor authentic street food and renowned regional delicacies popular among local residents.`,
          time: '01:00 PM',
          durationMinutes: 75,
          category: 'Food',
          estimatedCost: '$15 / ₹450',
          tips: ['Ask street vendors for chef specialties and house-made sauces.'],
        },
        {
          title: `${cityName} National Museum & Art Gallery`,
          description: `Explore curated collections of regional artifacts, paintings, and traditional crafts.`,
          time: '03:30 PM',
          durationMinutes: 90,
          category: 'Culture',
          estimatedCost: '$8 / ₹200',
          tips: ['Free audio guides are frequently available at the entrance counter.'],
        },
        {
          title: `${cityName} Waterfront Promenade & Sunset Deck`,
          description: `Unwind with scenic twilight panoramic views overlooking the cityscape as lights flicker on.`,
          time: '05:30 PM',
          durationMinutes: 60,
          category: 'Relaxation',
          estimatedCost: 'Free',
          tips: ['Arrive 20 minutes before sunset for the clearest horizon colors.'],
        },
      ],
    },
    {
      title: 'Nature Wonders, Scenic Escapes & Outdoor Adventure',
      summary: `Venture out to picturesque lakes, hills, and surrounding natural sanctuaries.`,
      stops: [
        {
          title: `${cityName} Botanical Gardens & Sanctuary`,
          description: `Fresh morning hike amidst lush botanical greenery, tranquil ponds, and shaded canopy pathways.`,
          time: '09:00 AM',
          durationMinutes: 105,
          category: 'Adventure',
          estimatedCost: '$5 / ₹150',
          tips: ['Carry a reusable water bottle and binoculars for local birdwatching.'],
        },
        {
          title: `${cityName} Artisan District & Craft Stalls`,
          description: `Relax with seasonal lunches and locally roasted specialty coffee along the artisan promenade.`,
          time: '12:30 PM',
          durationMinutes: 60,
          category: 'Food',
          estimatedCost: '$20 / ₹600',
          tips: ['Outdoor terrace seating provides pleasant breezy views.'],
        },
        {
          title: `${cityName} Cultural Pavilion & Gardens`,
          description: `Meet local artisans, witness traditional woodworking, textiles, and pottery demonstrations.`,
          time: '03:00 PM',
          durationMinutes: 100,
          category: 'Culture',
          estimatedCost: '$0',
          tips: ['Buying directly from master artisans supports the local creative community.'],
        },
      ],
    },
    {
      title: 'Modern Vibrant Quarters, Bazaars & Night Vibrance',
      summary: `Immerse yourself in bustling night markets, trendy cafes, and memorable culinary trails.`,
      stops: [
        {
          title: `${cityName} Grand Bazaar & Cultural Quarter`,
          description: `Vibrant sensory journey through bustling market alleys filled with handicrafts and fragrant teas.`,
          time: '10:30 AM',
          durationMinutes: 90,
          category: 'Culture',
          estimatedCost: '$15 / ₹500',
          tips: ['Gentle bargaining is traditional and expected in open bazaar stalls.'],
        },
        {
          title: `${cityName} Heritage Dining House`,
          description: 'Multi-course regional thali or chef tasting menu served with authentic hospitality.',
          time: '01:00 PM',
          durationMinutes: 75,
          category: 'Food',
          estimatedCost: '$25 / ₹800',
          tips: ['Pair your meal with the signature spiced regional beverage.'],
        },
        {
          title: `${cityName} City Lookout & Sunset Viewpoint`,
          description: 'Experience panoramic skyline lights and evening musical acoustic performances under the stars.',
          time: '05:00 PM',
          durationMinutes: 90,
          category: 'Culture',
          estimatedCost: '$12 / ₹400',
          tips: ['Reserve seats ahead or arrive early for front-row acoustics.'],
        },
      ],
    },
  ];

  for (let d = 1; d <= duration; d++) {
    const theme = activityThemes[(d - 1) % activityThemes.length];
    days.push({
      day: d,
      title: `Day ${d}: ${theme.title}`,
      location: `${cityName} Center`,
      summary: theme.summary,
      stops: theme.stops.map((s, idx) => ({
        id: `day${d}-stop${idx + 1}`,
        time: s.time,
        title: s.title,
        description: s.description,
        durationMinutes: s.durationMinutes,
        category: s.category,
        estimatedCost: s.estimatedCost,
        tips: s.tips,
      })),
    });
  }

  return {
    trip: {
      title: `${duration} Days in ${cityName}: Complete Exploration`,
      destination: cityName,
      duration,
      travelers: 2,
      summary: `An immersive, hand-tailored ${duration}-day journey through ${cityName}, uncovering historic heritage landmarks, authentic regional cuisine, and scenic nature lookouts.`,
    },
    days,
  };
}
