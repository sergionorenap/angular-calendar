import { Weather } from './weather';

export interface Reminder {
  id: string;
  text: string;
  date: string;
  time: string;
  color: string;
  city?: string;
  weather?: Weather;
}
