import { Message } from "./message.interface";

export interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}
