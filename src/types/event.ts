
export type EventType = 'hackathon' | 'workshop' | 'tech-talk' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  location: string;
  college: string;
  link: string;
  imageUrl?: string;
}
