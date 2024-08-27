import { createSlice } from "@reduxjs/toolkit";

const initialChatState = {
  chats: 0,
  selectedChat: 0,
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

    existedChats(state, action) {
      if (action.payload) {
        state.chats = action.payload;
      } else {
        return state;
      }
    },

    deleteChat(state, action) {
      state.chats.filter((chat) => chat.id !== action.payload);
    },

    updateChat(state, action) {
      const { id, firstName, lastName } = action.payload;
      const chat = state.chats.find((chat) => chat.id === id);
      if (chat) {
        chat.firstName = firstName;
        chat.lastName = lastName;
      }
    },

    addChat(state, action) {
      const existingChats = state.chats.filter((chat) => chat.id === action.payload.id);
      if (!existingChats) {
        return state;
      } else {
        state.chats.push(action.payload);
      }
    },
  },
});

export const chatActions = chatSlice.actions;
