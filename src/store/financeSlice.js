import { createSlice } from "@reduxjs/toolkit";
import { initialTransactions } from "../mockData";

const financeSlice = createSlice({
    name: 'finance',
    initialState:{
        transactions: initialTransactions,
        currentRole: 'Admin',
        searchQuery: '',
    },
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setCurrentRole: (state, action) => {
            state.currentRole = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
        },
    },
});

export const { setTransactions, setCurrentRole, setSearchQuery, deleteTransaction} = financeSlice.actions;

export default financeSlice.reducer;