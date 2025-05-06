
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import EventForm, { FormValues } from '../components/EventForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import BackgroundAnimation from '../components/BackgroundAnimation';

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
    
    // Show a success toast
    toast.success('Event submitted successfully!');
    
    // Navigate back to the events page after submission
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-12">
      <BackgroundAnimation />
      
      <div className="container max-w-2xl relative z-10">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent text-gray-300 hover:text-white" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
        
        <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg p-8 border border-white/10">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Submit a New Event</h1>
          <p className="text-gray-300 mb-8">
            Share your college's tech talks, hackathons, and workshops with other students
          </p>
          
          <EventForm onSubmit={handleSubmit} collegeOptions={collegeOptions} />
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>Inspired by <a href="https://dorahacks.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">DoraHacks</a></p>
        </footer>
      </div>
    </div>
  );
};

export default SubmitEvent;
