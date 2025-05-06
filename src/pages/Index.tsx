
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Event, EventType } from "../types/event";
import { mockEvents } from "../data/mockEvents";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";
import EventDetail from "../components/EventDetail";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BackgroundAnimation from "../components/BackgroundAnimation";

const Index = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<EventType | "all">("all");
  const [selectedCollege, setSelectedCollege] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  // Get unique college options from events
  const collegeOptions = useMemo(() => {
    return Array.from(new Set(mockEvents.map((event) => event.college)));
  }, []);

  // Filter events based on the criteria
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Filter by search query
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by event type
      const matchesType = selectedType === "all" || event.type === selectedType;
      
      // Filter by college
      const matchesCollege = selectedCollege === "all" || event.college === selectedCollege;
      
      // Filter by date
      const matchesDate = !selectedDate || 
                          new Date(event.date).setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0);
      
      return matchesSearch && matchesType && matchesCollege && matchesDate;
    });
  }, [events, searchQuery, selectedType, selectedCollege, selectedDate]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const navigateToSubmit = () => {
    navigate("/submit");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden">
      <BackgroundAnimation />
      
      <div className="container py-12 relative z-10">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
                Campus Event Seeker
              </h1>
              <p className="text-gray-300 text-lg max-w-xl">
                Discover tech talks, hackathons, and workshops at colleges near you
              </p>
            </div>
            <Button 
              onClick={navigateToSubmit} 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-6 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-purple-500/30 flex items-center h-12"
            >
              <Plus className="mr-2 h-5 w-5" />
              Submit Event
            </Button>
          </div>
        </header>

        <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl mb-10 border border-white/10 shadow-xl">
          <EventFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCollege={selectedCollege}
            setSelectedCollege={setSelectedCollege}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            collegeOptions={collegeOptions}
          />
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <EventCard
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-xl font-medium text-white">No events found</h3>
            <p className="text-gray-300 mt-2">
              Try adjusting your filters or submit a new event
            </p>
            <Button
              variant="outline"
              className="mt-6 border-purple-400 text-purple-200 hover:bg-purple-900/50"
              onClick={navigateToSubmit}
            >
              Submit New Event
            </Button>
          </div>
        )}
      </div>

      <footer className="mt-24 border-t border-purple-800/40 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Campus Event Seeker</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://dorahacks.io/" target="_blank" rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 transition-colors">
                DoraHacks
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                About
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      <EventDetail
        event={selectedEvent}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Index;
