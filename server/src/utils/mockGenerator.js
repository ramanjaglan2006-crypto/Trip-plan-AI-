/**
 * Generates an intelligent contextual mock itinerary matching the Zod schema.
 */
function generateMockItinerary(userPrompt) {
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

  // Duration extraction if specified (e.g., "5-day trip")
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
              estimatedCost: '$10',
              tips: ['Visit Nakamise street stalls early before peak afternoon crowds.'],
            },
            {
              id: 'day1-stop2',
              time: '01:00 PM',
              title: 'Ueno Alley Tonkotsu Ramen Lunch',
              description: 'Savor rich, steaming tonkotsu ramen at an authentic counter in Ameyoko street market.',
              durationMinutes: 60,
              category: 'Food',
              estimatedCost: '$15',
              tips: ['Purchase ticket at the vending machine before taking a seat.'],
            },
            {
              id: 'day1-stop3',
              time: '04:00 PM',
              title: 'Shibuya Crossing & Sunset Sky Deck',
              description: 'Cross the world’s busiest pedestrian scramble and catch panoramic city sunset views at Shibuya Sky.',
              durationMinutes: 120,
              category: 'Sightseeing',
              estimatedCost: '$22',
              tips: ['Reserve Shibuya Sky timed entry 2 weeks in advance.'],
            },
          ],
        });
      } else if (d === 2) {
        days.push({
          day: 2,
          title: 'Digital Art & Odaiba Bay Sunset',
          location: 'Tokyo (Toyosu & Odaiba)',
          summary: 'Immerse in futuristic digital installations and relaxing bayfront gardens.',
          stops: [
            {
              id: 'day2-stop1',
              time: '10:00 AM',
              title: 'teamLab Planets Immersive Museum',
              description: 'Walk through knee-deep water and infinite crystal mirror rooms in this world-renowned digital art museum.',
              durationMinutes: 150,
              category: 'Art & Tech',
              estimatedCost: '$38',
              tips: ['Wear easy-to-remove shoes and shorts or pants that roll up above knees.'],
            },
            {
              id: 'day2-stop2',
              time: '02:00 PM',
              title: 'Toyosu Fish Market Sushi Lunch',
              description: 'Enjoy ultra-fresh omakase sushi right outside Tokyo’s premier fish market.',
              durationMinutes: 90,
              category: 'Food',
              estimatedCost: '$45',
              tips: ['Try the fatty tuna (otoro) and grilled tamagoyaki.'],
            },
            {
              id: 'day2-stop3',
              time: '05:00 PM',
              title: 'Odaiba Seaside Park & Giant Gundam',
              description: 'Watch the sunset over Rainbow Bridge and admire the 18-meter transforming Unicorn Gundam statue.',
              durationMinutes: 90,
              category: 'Relaxation',
              estimatedCost: '$0',
              tips: ['Gundam light show transforms every 30 minutes after dark.'],
            },
          ],
        });
      } else {
        days.push({
          day: d,
          title: d === 3 ? 'Meiji Shrine & Harajuku Culture' : `City Highlights & Hidden Gems (Day ${d})`,
          location: d === 3 ? 'Tokyo (Harajuku)' : `${destination}`,
          summary: `Exploration of iconic heritage spots, local markets, and scenic photo stops.`,
          stops: [
            {
              id: `day${d}-stop1`,
              time: '09:30 AM',
              title: `Explore ${destination} Central Heritage Landmark`,
              description: `Morning walking tour of top historic architecture and scenic gardens.`,
              durationMinutes: 120,
              category: 'Sightseeing',
              estimatedCost: '$15',
              tips: ['Morning sunlight is ideal for photography.'],
            },
            {
              id: `day${d}-stop2`,
              time: '01:00 PM',
              title: 'Authentic Local Specialty Lunch',
              description: 'Relax at a cozy family-run eatery serving authentic regional signature dishes.',
              durationMinutes: 75,
              category: 'Food',
              estimatedCost: '$25',
              tips: ['Cash payments are preferred at traditional family restaurants.'],
            },
            {
              id: `day${d}-stop3`,
              time: '04:00 PM',
              title: 'Artisan Neighborhood Exploration & Tea',
              description: 'Stroll through boutique lanes, craft artisan shops, and enjoy afternoon matcha or tea.',
              durationMinutes: 90,
              category: 'Culture',
              estimatedCost: '$20',
              tips: ['Take time to wander into side alleys away from main streets.'],
            },
          ],
        });
      }
    } else {
      days.push({
        day: d,
        title: `Day ${d}: ${destination} Exploration`,
        location: destination,
        summary: `Full day itinerary featuring cultural highlights, local food, and scenic pacing.`,
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

module.exports = {
  generateMockItinerary,
};
