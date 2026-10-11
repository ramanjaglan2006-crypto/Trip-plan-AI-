/**
 * Client-side mock generator & fallback engine.
 * Ensures the web app functions smoothly when deployed as a standalone frontend on Vercel.
 */
export function generateClientMock(userPrompt) {
  const lower = (userPrompt || '').toLowerCase();

  let destination = 'Tokyo & Kyoto, Japan';
  let title = '5 Days in Japan: Tokyo & Kyoto Highlights';
  let duration = 5;
  let summary = 'A balanced, relaxed journey exploring modern Tokyo neighborhoods, iconic Shinto shrines, authentic ramen alleys, and historic Kyoto zen gardens.';

  if (lower.includes('paris') || lower.includes('france')) {
    destination = 'Paris, France';
    title = '3 Days Romantic & Cultural Paris';
    duration = 3;
    summary = 'Discover iconic Paris landmarks, Louvre art highlights, Montmartre cobblestones, fresh croissant bakeries, and nighttime Seine river cruise views.';
  } else if (lower.includes('rome') || lower.includes('italy')) {
    destination = 'Rome, Italy';
    title = '4 Days Ancient Rome & Culinary Trail';
    duration = 4;
    summary = 'Step back in time at the Colosseum and Roman Forum, take an artisan pasta making class, explore Vatican City treasures, and hunt for hidden gelato spots.';
  } else if (lower.includes('goa') || lower.includes('beach')) {
    destination = 'Goa, India';
    title = '3 Days Goa Beaches, Culture & Nightlife';
    duration = 3;
    summary = 'Relax on golden sand beaches, explore Portuguese heritage in Fontainhas, sample authentic Goan seafood curry, and enjoy sunset beach shack vibes.';
  } else if (lower.includes('rajasthan') || lower.includes('jaipur')) {
    destination = 'Rajasthan, India';
    title = '7 Days Royal Rajasthan: Jaipur, Jodhpur & Udaipur';
    duration = 7;
    summary = 'Immerse yourself in grand desert fortresses, ornate royal palaces, vibrant bazaar spices, and serene lake reflections across Rajasthan’s royal cities.';
  } else if (lower.includes('dubai')) {
    destination = 'Dubai, UAE';
    title = '4 Days Family Adventure in Dubai';
    duration = 4;
    summary = 'Experience futuristic skyscrapers, desert dune safari adventures, world-class fountains, and relaxing beach strolls along the Arabian Gulf.';
  }

  const durationMatch = lower.match(/(\d+)\s*days?/);
  if (durationMatch && parseInt(durationMatch[1])) {
    duration = Math.min(Math.max(parseInt(durationMatch[1]), 1), 7);
  }

  const days = [];
  for (let d = 1; d <= duration; d++) {
    if (destination.includes('Japan')) {
      if (d === 1) {
        days.push({
          day: 1,
          title: 'Arrival & Asakusa Historic Walk',
          location: 'Tokyo (Asakusa)',
          summary: 'Settle in, explore Tokyo’s oldest temple, and enjoy authentic street food snacks.',
          stops: [
            {
              id: 'day1-stop1',
              time: '10:00 AM',
              title: 'Sensō-ji Temple & Nakamise Street',
              description: 'Walk through the Thunder Gate to Tokyo’s oldest temple and sample fresh ningyo-yaki sweets.',
              durationMinutes: 120,
              category: 'Culture',
              estimatedCost: '$0',
              tips: ['Visit early before 10 AM to avoid peak crowds.'],
            },
            {
              id: 'day1-stop2',
              time: '01:00 PM',
              title: 'Traditional Tempura Lunch at Daikokuya',
              description: 'Historic Edo-style tempura restaurant operating since 1887.',
              durationMinutes: 60,
              category: 'Food',
              estimatedCost: '$25',
              tips: ['Order the tendon bowl with sesame seed dressing.'],
            },
            {
              id: 'day1-stop3',
              time: '03:30 PM',
              title: 'Sumida River Walk & Tokyo Skytree View',
              description: 'Stroll along the river park with sweeping views of the modern skyline.',
              durationMinutes: 90,
              category: 'Sightseeing',
              estimatedCost: '$0',
              tips: ['Great photo angle across Azuma Bridge.'],
            },
          ],
        });
      } else {
        days.push({
          day: d,
          title: `Day ${d}: Vibrant Neighborhoods & Sights`,
          location: d % 2 === 0 ? 'Tokyo (Shinjuku & Shibuya)' : 'Kyoto (Arashiyama & Gion)',
          summary: 'Curated blend of modern architecture, lush parks, and authentic culinary experiences.',
          stops: [
            {
              id: `day${d}-stop1`,
              time: '09:30 AM',
              title: d % 2 === 0 ? 'Meiji Jingu Shrine & Yoyogi Park' : 'Fushimi Inari-taisha Torii Gates',
              description: 'Tranquil forested shrine grounds offering serene morning paths.',
              durationMinutes: 120,
              category: 'Sightseeing',
              estimatedCost: '$0',
              tips: ['Wear comfortable walking shoes.'],
            },
            {
              id: `day${d}-stop2`,
              time: '01:00 PM',
              title: 'Artisan Ramen & Matcha Tasting',
              description: 'Enjoy handcrafted noodles followed by authentic green tea sweets.',
              durationMinutes: 75,
              category: 'Food',
              estimatedCost: '$20',
              tips: ['Cash payments are customary in classic eateries.'],
            },
            {
              id: `day${d}-stop3`,
              time: '04:00 PM',
              title: 'Panoramic Sunset Observation Deck',
              description: 'Catch breathtaking views as the sunset illuminates the horizon.',
              durationMinutes: 90,
              category: 'Relaxation',
              estimatedCost: '$18',
              tips: ['Arrive 30 minutes before golden hour.'],
            },
          ],
        });
      }
    } else {
      days.push({
        day: d,
        title: `Day ${d}: ${destination} Exploration`,
        location: destination,
        summary: 'Full day itinerary featuring cultural highlights, local food, and scenic pacing.',
        stops: [
          {
            id: `day${d}-stop1`,
            time: '09:30 AM',
            title: `Historic Walking Tour in ${destination}`,
            description: `Visit iconic historic monuments and central heritage squares.`,
            durationMinutes: 120,
            category: 'Sightseeing',
            estimatedCost: '$15',
            tips: ['Wear comfortable walking shoes.'],
          },
          {
            id: `day${d}-stop2`,
            time: '01:00 PM',
            title: 'Local Specialty Dining',
            description: 'Enjoy regional dishes at a highly recommended local restaurant.',
            durationMinutes: 75,
            category: 'Food',
            estimatedCost: '$30',
            tips: ['Ask for seasonal chef recommendations.'],
          },
          {
            id: `day${d}-stop3`,
            time: '04:00 PM',
            title: 'Scenic Viewpoint & Sunset Relax',
            description: 'Unwind at a panoramic lookout with views of the surrounding city skyline or coast.',
            durationMinutes: 90,
            category: 'Relaxation',
            estimatedCost: '$10',
            tips: ['Arrive 30 minutes before sunset for best photography.'],
          },
        ],
      });
    }
  }

  return {
    trip: {
      title,
      destination,
      duration,
      travelers: 2,
      summary,
    },
    days,
  };
}
