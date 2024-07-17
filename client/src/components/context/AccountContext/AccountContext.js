import axios from "axios";
import { createContext, useReducer } from "react";
import { API_URL_ACC } from "../../../utils/apiURL";
import { ACCOUNT_CREATION_FAIL, ACCOUNT_CREATION_SUCCESS, ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_SUCCESS } from "./accountActionTypes";

export const accountContext = createContext();

//Initial state
const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem('userAuth')),
    account: null,
    accounts: [],
    loading: false,
    error: null,
};

//reducer
const accountReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                account: payload,
                loading: false,
                error: null,
            };
        case ACCOUNT_DETAILS_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
        case ACCOUNT_CREATION_SUCCESS:
            return {
                ...state,
                account: payload,
                loading: false,
                error: null,
            };
        case ACCOUNT_CREATION_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

//Provider
export const AccountContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
    console.log(state);

    //Get account Details action
    const getAccountDetailsAction = async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`
            },
        };
        try {
            const res = await axios.get(`${API_URL_ACC}/${id}`, config);
            console.log(res);
            if(res?.data?.status == 'success') {
                dispatch({
                    type: ACCOUNT_DETAILS_SUCCESS,
                    payload: res?.data?.account,
                });
            }
        } catch (error) {
            dispatch({
                type: ACCOUNT_DETAILS_FAIL,
                payload: error?.data?.response?.message,
            });
        }
    };

    //create account action
    const createAccountAction = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`
            },
        };
        try {
            const res = await axios.post(`${API_URL_ACC}`, formData, config);
            console.log(res);
            if(res?.data?.status == 'success') {
                dispatch({
                    type: ACCOUNT_CREATION_SUCCESS,
                    payload: res?.data?.account,
                });
            }
            window.location.href = '/dashboard';
        } catch (error) {
            dispatch({
                type: ACCOUNT_CREATION_FAIL,
                payload: error?.data?.response?.message,
            });
        }
    };

    return (
        <accountContext.Provider
            value={{
                getAccountDetailsAction,
                account: state?.account,
                createAccountAction,
                error: state?.error,
            }}
        >
            {children}
        </accountContext.Provider>
    );
};

// export default AccountContextProvider;