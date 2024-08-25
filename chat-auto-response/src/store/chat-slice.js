import { createSlice } from "@reduxjs/toolkit";

const initialChatState = {
  chats: [
    { id: 1, name: "Alice Freeman", lastMessage: "How was your meeting?", date: "Aug 17, 2022" },
    { id: 2, name: "Josefina", lastMessage: "I am going for a walk.", date: "Aug 16, 2022" },
    { id: 3, name: "Velazquez", lastMessage: "Tell me a joke please.", date: "Aug 14, 2022" },
  ],
  selectedChat: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatState,
  reducers: {
    showChats(state) {
      state.chats;
    },
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
    addChat(state, action) {
      const existingChats = state.chats.filter((chat) => chat.id === action.payload.id);
      if (existingChats) {
        return state;
      } else {
        state.chats.push(action.payload);
      }
    },
  },
});

export const chatActions = chatSlice.actions;
