import { Message } from "./message.interface";

export interface Chat {
  id: number;
  messages: Message[];
}
