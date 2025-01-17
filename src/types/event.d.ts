/** @format */

export type EventTitleType = {
  title: string;
  event_date: string;
  price: number;
  imageUrl: string;
  location: string;
  time_range: string;
  isEditable?: boolean;
};

export type ButtonType = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  text: string;
  variant?: "primary" | "cancel";
  isLoading?: boolean;
};

export type TEvent = {
  id: number;
  theme: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  price: number;
  coordinates?: Record<string, null>; // Json type is handled with Record
  images: string[];
  thumbnail: string;
  eventType: string;
  isPublished: boolean;
  moderators: Array<{
    id: number;
    firstname: string;
    lastname: string;
    bio: string;
    phone: string;
    avatar: string;
    email: string; // unique constraint handled by Prisma, not TypeScript
    eventId?: number | null;
  }>;
  EventSponsor: Array<EventSponsor>;
  EventTranslation: Array<TEventTranslation>;
  createdAt: Date;
  updatedAt: Date;
  participants: Participant[]; // Assuming Participant is defined elsewhere
  creator: User; // Assuming User type is defined elsewhere
  creatorId: number;
};

export type EventStates = {
  events: TEvent | null;
};

export type TCreateEventInput = {
  theme: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  price: number;
  thumbnail: File | null;
  eventType: string;
};

export type TCreateEventTranslation = {
  theme: string;
  description: string;
  eventId: number;
  language: string;
};

export type TUpdateEventTranslation = {
  theme: string;
  description: string;
};

export type TEventTranslation = {
  id: number;
  theme: string;
  description: string;
  eventId: string;
  language: string;
};

export type TModerator = {
  firstname: string;
  lastname: string;
  bio: string;
  phone: string;
  avatar: File | null;
  email: string; // unique constraint handled by Prisma, not TypeScript
  eventId?: number | null;
};

export type TModeratorEdit = {
  firstname: string;
  lastname: string;
  bio: string;
  phone: string;
  email: string;
};

export type TModeratorProps = {
  id: string;
  firstname: string;
  lastname: string;
  bio: string;
  phone: string;
  email: string; // unique constraint handled by Prisma, not TypeScript
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
};

export type TModeratorProfileType = {
  id: string;
  firstname: string;
  lastname: string;
  bio: string;
  phone: string;
  avatar: string;
  email: string;
};

export type Pattern = {
  avatar: string;
  company: string;
};

export type EventSponsor = {
  id: number;
  patternId: number;
  pattern: Pattern;
  note: string;
  amount: number;
  createdAt: string; // or Date if you're parsing to a Date object
  updatedAt: string; // or Date if you're parsing to a Date object
};
