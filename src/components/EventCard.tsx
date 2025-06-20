
import React from "react";
import { Event } from "../types/event";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const eventTypeColor = {
    hackathon: "bg-event-hackathon",
    workshop: "bg-event-workshop",
    "tech-talk": "bg-event-tech-talk",
    other: "bg-event-other",
  };

  const defaultImage = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  return (
    <Card 
      className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-md border-white/10 text-white"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10" />
        <img
          src={event.imageUrl || defaultImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-2 text-white">{event.title}</h3>
          <Badge className={`${eventTypeColor[event.type]} text-white`}>
            {event.type.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-gray-300 line-clamp-3 mb-2">{event.description}</p>
        <p className="text-sm font-semibold text-white">{event.college}</p>
        <p className="text-sm text-gray-300">{event.location}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-white/10">
        <div className="flex items-center text-sm text-gray-300">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{format(new Date(event.date), "MMM d, yyyy • h:mm a")}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
