
import React from "react";
import { Event } from "../types/event";
import { format } from "date-fns";
import { Calendar, Link, Globe, MapPin, School } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventDetailProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, isOpen, onClose }) => {
  if (!event) return null;

  const eventTypeColor = {
    hackathon: "bg-event-hackathon",
    workshop: "bg-event-workshop",
    "tech-talk": "bg-event-tech-talk",
    other: "bg-event-other",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Organized by {event.college}
              </DialogDescription>
            </div>
            <Badge className={`${eventTypeColor[event.type]} text-white ml-2`}>
              {event.type.replace('-', ' ')}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="h-64 mb-4 overflow-hidden rounded-md">
            <img
              src={event.imageUrl || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Description</h3>
              <p className="mt-1">{event.description}</p>
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy • h:mm a")}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-gray-500" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center">
              <School className="w-5 h-5 mr-2 text-gray-500" />
              <span>{event.college}</span>
            </div>
            
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-gray-500" />
              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate"
              >
                {event.link}
              </a>
            </div>
            
            <div className="pt-4">
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                onClick={() => window.open(event.link, "_blank")}
              >
                <Link className="w-5 h-5 mr-2" /> Visit DoraHacks Event Page
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetail;
