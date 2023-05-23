// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';

export const registerUser = createAsyncThunk(
    REGISTER_URL,
    async ({ firstName,
        lastName,
        password,
        email,
        graduationYear }, { rejectWithValue }) => {
        try {

            await axios.post(
                REGISTER_URL,
                {
                    firstName,
                    lastName,
                    password,
                    email,
                    graduationYear
                },

            )
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export const userLogin = createAsyncThunk(
    LOGIN_URL,
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                LOGIN_URL,
                { email, password },
            )

            // store user's token in local storage

            localStorage.setItem('userToken', data.data.userToken)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)