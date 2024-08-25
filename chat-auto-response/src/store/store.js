import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./chat-slice";

export const store = configureStore({
  reducer: { chats: chatSlice.reducer },
});
