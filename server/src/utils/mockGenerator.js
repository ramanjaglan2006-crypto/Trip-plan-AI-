/**
 * Server-side intelligent mock generator.
 * Matches Zod schema and generates rich itineraries for ANY destination (Bhopal, Rewa, Tokyo/Japan, Paris, Rome, etc.).
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
    ],
  },
};

CURATED_CITIES.tokyo = CURATED_CITIES.japan;

function extractDestinationName(userPrompt) {
  const prompt = (userPrompt || '').trim();
  const lower = prompt.toLowerCase();

  for (const key of Object.keys(CURATED_CITIES)) {
    if (lower.includes(key)) {
      return CURATED_CITIES[key].destination;
    }
  }

  const patterns = [
    /(?:trip to|visit|explore|travel to|going to|holiday in|vacation in|in)\s+([A-Za-z\s]+?)(?:\s+for|\s+with|\s+under|\s+next|\s+this|\s*\.|\s*,|\s*$)/i,
    /(?:^|\s)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
  ];

  for (const pat of patterns) {
    const match = prompt.match(pat);
    if (match && match[1]) {
      const candidate = match[1].trim();
      const lowerCandidate = candidate.toLowerCase();
      if (!['a', 'the', 'my', 'days', 'day', 'trip', 'budget', 'family', 'friends', 'weekend'].includes(lowerCandidate)) {
        return candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
    }
  }

  return 'Curated Destination';
}

function extractDuration(userPrompt) {
  const lower = (userPrompt || '').toLowerCase();
  const match = lower.match(/(\d+)\s*days?/);
  if (match && parseInt(match[1])) {
    return Math.min(Math.max(parseInt(match[1]), 1), 7);
  }
  return 3;
}

function generateMockItinerary(userPrompt) {
  const lower = (userPrompt || '').toLowerCase();
  const duration = extractDuration(userPrompt);

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
      title: `${duration} Days in ${cityName}: Curated Highlights`,
      destination: cityName,
      duration,
      travelers: 2,
      summary: `A carefully paced, unforgettable travel itinerary exploring the landmark sights, rich culture, and authentic culinary highlights of ${cityName}.`,
    },
    days,
  };
}

module.exports = {
  generateMockItinerary,
};
