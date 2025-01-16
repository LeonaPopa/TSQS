import { Message } from "./message.interface";

export interface Chat {
  id: string;
  messages: Message[];
}
