export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { location, date, startTime, endTime, budget, pace, interests } = req.body;

    if (!location || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build the prompt for Claude
    const prompt = `You are an expert local guide and day planner. A visitor needs help planning their day.

Location: ${location}
Date: ${date} (use web search to find what events, festivals, or special happenings are on this specific date)
Available Time: ${startTime} to ${endTime}
Budget: ${budget}
Pace: ${pace}
Interests: ${interests.join(', ')}

IMPORTANT: Use web search to find:
1. Current events happening on ${date} in ${location}
2. Popular local spots, restaurants, and attractions
3. Any festivals, markets, or special events
4. Current opening hours and any closures
5. Weather forecast for planning indoor/outdoor activities

Create a detailed, personalized day itinerary that:
- Optimizes travel time between locations
- Matches their interests and pace preference
- Fits within their budget
- Includes mix of must-see spots and hidden gems
- Accounts for meal times
- Considers realistic timing and distances

Provide your response in the following JSON format ONLY (no other text, no markdown):

{
  "itinerary": [
    {
      "time": "09:00 AM",
      "title": "Activity or location name",
      "description": "2-3 sentences about what they'll experience and why it's recommended for their interests",
      "duration": "1.5 hours",
      "cost": "$10-15",
      "travel_time": "10 min walk",
      "google_maps_link": "https://www.google.com/maps/search/?api=1&query=exact+location+name+${location.replace(/ /g, '+')}",
      "booking_link": "relevant booking URL if applicable or empty string"
    }
  ],
  "summary": "3-4 sentence overview of what makes this day special and how it matches their preferences",
  "total_cost": "$80-120 per person",
  "tips": [
    "Practical tip 1 about the day (weather, booking, timing, etc)",
    "Practical tip 2",
    "Practical tip 3"
  ],
  "events": "Brief mention of any special events happening on this date that were incorporated"
}

Make sure the itinerary:
- Has 4-6 activities depending on pace (Relaxed: 4, Moderate: 5, Packed: 6)
- Includes breakfast/lunch/dinner suggestions based on timing
- Has realistic travel times between locations
- Prioritizes their selected interests
- Includes at least one unique or special recommendation`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search"
          }
        ],
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'API request failed' });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
