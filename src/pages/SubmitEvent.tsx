
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import EventForm, { FormValues } from '../components/EventForm';
import { Button } from '@/components/ui/button';

const SubmitEvent = () => {
  const navigate = useNavigate();
  
  // Get unique college options from events
  const collegeOptions = useMemo(() => {
    return Array.from(new Set(mockEvents.map((event) => event.college)));
  }, []);
  
  const handleSubmit = (data: FormValues) => {
    // In a real application, you would send this to a backend
    console.log('Event submitted:', {
      id: uuidv4(),
      ...data
    });
    
    // Navigate back to the events page after submission
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-1">Submit a New Event</h1>
          <p className="text-gray-600 mb-6">
            Share your college's tech talks, hackathons, and workshops with other students
          </p>
          
          <EventForm onSubmit={handleSubmit} collegeOptions={collegeOptions} />
        </div>
      </div>
    </div>
  );
};

export default SubmitEvent;
