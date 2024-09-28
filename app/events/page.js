'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('event')
        .select('event_name, description, registration_fees, organized_by');
      
      if (error) console.error('Error fetching events:', error);
      else setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center my-6">Upcoming Events</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8">
        {events.map((event, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{event.event_name}</h2>
            <p className="mb-4">{event.description}</p>
            <p className="font-semibold">Registration Fees: {event.registration_fees}</p>
            <p className="font-semibold">Organized by: {event.organized_by}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
