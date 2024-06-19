import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    chatUser: null,
    isAuthenticated: false,
}

export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        removeUser: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        chatUser: (state, action) => {
            state.chatUser = action.payload;
        },
        removeChatUser: (state, action) => {
            state.chatUser = null;
        },
    },
})

export const { addUser, removeUser, chatUser, removeChatUser, addAllUser } = userReducer.actions

export default userReducer.reducer