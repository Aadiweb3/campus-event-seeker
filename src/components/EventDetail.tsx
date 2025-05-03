
import React from "react";
import { Event } from "../types/event";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

  const defaultImage = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
            <Badge className={`${eventTypeColor[event.type]} text-white ml-2`}>
              {event.type.replace('-', ' ')}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="h-64 mb-4 overflow-hidden rounded-md">
            <img
              src={event.imageUrl || defaultImage}
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
            
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Location</h3>
              <p className="mt-1">{event.location}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm text-gray-500">College</h3>
              <p className="mt-1">{event.college}</p>
            </div>
            
            <div className="pt-4">
              <Button
                className="w-full"
                onClick={() => window.open(event.link, "_blank")}
              >
                Visit Event Website
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetail;
