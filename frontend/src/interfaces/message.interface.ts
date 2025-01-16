export interface Message {
  sender: "user" | "openai";
  text: string;
}
