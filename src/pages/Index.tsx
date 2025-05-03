
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Event, EventType } from "../types/event";
import { mockEvents } from "../data/mockEvents";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";
import EventDetail from "../components/EventDetail";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Campus Event Seeker
              </h1>
              <p className="text-gray-600 mt-2">
                Discover tech talks, hackathons, and workshops at colleges near you
              </p>
            </div>
            <Button onClick={navigateToSubmit} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Submit Event
            </Button>
          </div>
        </header>

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

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No events found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or submit a new event
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={navigateToSubmit}
            >
              Submit New Event
            </Button>
          </div>
        )}
      </div>

      <EventDetail
        event={selectedEvent}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Index;
