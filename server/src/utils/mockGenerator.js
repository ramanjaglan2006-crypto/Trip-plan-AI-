/**
 * Server-side intelligent mock generator.
 * Matches Zod schema and generates rich itineraries for ANY destination (Bhopal, Rewa, etc.).
 */

const CURATED_CITIES = {
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
            tips: ['Early morning boat rides offer the best birdwatching and calm waters.'],
          },
          {
            title: 'Taj-ul-Masajid & Shaukat Mahal',
            description: 'Visit one of Asia’s largest and most majestic mosques featuring pink minarets, followed by Indo-Gothic Shaukat Mahal.',
            time: '11:30 AM',
            durationMinutes: 75,
            category: 'Culture',
            estimatedCost: '₹0',
            tips: ['Dress modestly; slip-on shoes recommended for easy shoe storage.'],
          },
          {
            title: 'Bhopali Poha Jalebi & Chatori Gali Food Trail',
            description: 'Sample legendary Bhopali poha topped with sev and pomegranate, plus fresh hot jalebi and traditional Sulemani chai.',
            time: '01:30 PM',
            durationMinutes: 60,
            category: 'Food',
            estimatedCost: '₹150',
            tips: ['Try the classic salty Sulemani chai with thick cream.'],
          },
          {
            title: 'Madhya Pradesh Tribal Museum & Sunset View',
            description: 'Immerse yourself in world-class art installations and life-size tribal dwellings celebrating regional indigenous heritage.',
            time: '04:00 PM',
            durationMinutes: 120,
            category: 'Culture',
            estimatedCost: '₹50',
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
            tips: ['Hire an ASI authorized guide near the gate for the gateway symbol stories.'],
          },
          {
            title: 'Bhojpur Temple (Bhojeshwar Temple)',
            description: 'Marvel at the unfinished 11th-century temple housing one of the largest monolithic Shiva lingams in India.',
            time: '02:00 PM',
            durationMinutes: 90,
            category: 'Sightseeing',
            estimatedCost: '₹25',
            tips: ['Observe the ancient architectural blueprints engraved into surrounding rocks.'],
          },
          {
            title: 'Van Vihar National Park Lake Drive',
            description: 'Scenic open-air zoological park nestled along the lake shore, home to free-roaming deer, tigers, and exotic bird species.',
            time: '04:30 PM',
            durationMinutes: 90,
            category: 'Adventure',
            estimatedCost: '₹50',
            tips: ['Rent a bicycle at the entrance gate for an eco-friendly lake drive.'],
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
            tips: ['Book safari jeep tickets early in the morning for best animal sightings.'],
          },
          {
            title: 'Rewa Royal Fort & Baghel Museum (Rewa Kila)',
            description: 'Explore the 400-year-old fort where the rivers meet, housing royal swords, ornate silver thrones, and antique artifacts.',
            time: '01:30 PM',
            durationMinutes: 90,
            category: 'Culture',
            estimatedCost: '₹50',
            tips: ['Look for the preservation hall dedicated to Maharaja Martand Singh.'],
          },
          {
            title: 'Venkat Bhawan & Bagheli Culinary Delights',
            description: 'Marvel at Italian-styled royal summer architecture, followed by traditional Bagheli Indrahar kadhi and Mawa sweets.',
            time: '04:30 PM',
            durationMinutes: 75,
            category: 'Food',
            estimatedCost: '₹120',
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
            tips: ['Stay strictly within designated viewing platforms; canyon edges are steep.'],
          },
          {
            title: 'Keoti Falls & Historic Fortified Watchtower',
            description: 'Breathtaking segmented waterfall dropping into a scenic forested basin with historic watchtower lookouts.',
            time: '01:00 PM',
            durationMinutes: 100,
            category: 'Adventure',
            estimatedCost: '₹10',
            tips: ['Pack drinking water and light picnic snacks as options are sparse.'],
          },
        ],
      },
    ],
  },
};

function extractDestinationName(userPrompt) {
  const prompt = userPrompt.trim();
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
      for (let d = 1; d <= duration; d++) {
        const templateDay = data.stopsByDay[(d - 1) % data.stopsByDay.length];
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
          })),
        });
      }

      return {
        trip: {
          title: `${duration} Days in ${data.destination.split(',')[0]}: Complete Exploration`,
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
          title: `${cityName} Old Town & Heritage Promenade`,
          description: `Morning walking tour through historical town squares, vintage architecture, and central clock towers.`,
          time: '09:30 AM',
          durationMinutes: 120,
          category: 'Sightseeing',
          estimatedCost: '$10 / ₹300',
          tips: ['Comfortable walking shoes and morning golden-hour photography.'],
        },
        {
          title: `Local Food Market & Regional Specialties`,
          description: `Savor authentic street food and renowned regional delicacies popular among local residents.`,
          time: '01:00 PM',
          durationMinutes: 75,
          category: 'Food',
          estimatedCost: '$15 / ₹450',
          tips: ['Ask street vendors for chef specialties and house-made sauces.'],
        },
        {
          title: `${cityName} Grand Museum & Art Gallery`,
          description: `Explore curated collections of regional artifacts, paintings, and traditional crafts.`,
          time: '03:30 PM',
          durationMinutes: 90,
          category: 'Culture',
          estimatedCost: '$8 / ₹200',
          tips: ['Free audio guides are frequently available at the entrance counter.'],
        },
      ],
    },
    {
      title: 'Nature Wonders, Scenic Escapes & Outdoor Adventure',
      summary: `Venture out to picturesque lakes, hills, and surrounding natural sanctuaries.`,
      stops: [
        {
          title: `${cityName} Nature Park & Botanical Sanctuary`,
          description: `Fresh morning hike amidst lush botanical greenery, tranquil ponds, and shaded canopy pathways.`,
          time: '09:00 AM',
          durationMinutes: 105,
          category: 'Adventure',
          estimatedCost: '$5 / ₹150',
          tips: ['Carry a reusable water bottle and binoculars for local birdwatching.'],
        },
        {
          title: 'Scenic Waterfront Dining & Artisanal Coffee',
          description: `Relax with seasonal lunches and locally roasted specialty coffee along the promenade.`,
          time: '12:30 PM',
          durationMinutes: 60,
          category: 'Food',
          estimatedCost: '$20 / ₹600',
          tips: ['Outdoor terrace seating provides pleasant breezy views.'],
        },
        {
          title: 'Craft Village & Handloom Weavers Quarter',
          description: `Meet local artisans, witness traditional woodworking, textiles, and pottery demonstrations.`,
          time: '03:00 PM',
          durationMinutes: 100,
          category: 'Culture',
          estimatedCost: '$0',
          tips: ['Buying directly from master artisans supports the local creative community.'],
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
