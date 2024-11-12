import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../types/ResModels/reduxTypes";
import { IUser } from "../../types/ResModels/IUser";
import { loginDto, registerDto } from "../../types/ReqModels/Authorization";

const BASE_URL = "http://localhost:8200/account"

const initialState: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null,
};

export const fetchRegister = createAsyncThunk(
    "user/register",
    async (dto: registerDto, thunkApi) => {
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dto),
        });
        if (res.status != 201) {
            return thunkApi.rejectWithValue("Could not register!");
        }
    } catch (err) {
        thunkApi.rejectWithValue((err as Error).message);
    }
    }
);

export const fetchLogin = createAsyncThunk(
    "user/login",
    async (dto: loginDto, thunkApi) => {
    try {
        console.log("entered");
        const res = await fetch(`${BASE_URL}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });
        if (res.status != 200) {
            return thunkApi.rejectWithValue("Can't login, please try again");
        }
        const body = await res.json() as {token: string}
        localStorage.setItem("Authorization", body.token);
        console.log(body.token);
    } catch (err) {
        thunkApi.rejectWithValue((err as Error).message);
    }
    }
);

export const fetchUser = createAsyncThunk(
    "user/user",
    async (_, thunkApi ) => {
    try {
        const res = await fetch(`${BASE_URL}/`, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")!
            }
        });
        if (res.status != 200) {
            thunkApi.rejectWithValue("Can't login, please try again");
        }
        const body = await res.json() as IUser
        return thunkApi.fulfillWithValue(body)
    } catch (err) {
        thunkApi.rejectWithValue((err as Error).message);
    }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    logout: (state) => {
        state.user = null;
    },
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder
        .addCase(fetchUser.pending, (state) => {
            state.status = DataStatus.LOADING;
            state.error = null;
            state.user = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = DataStatus.SUCCESS;
            state.error = null;
            state.user = action.payload as unknown as IUser;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.status = DataStatus.FAILED;
            state.error = action.error as string;
            state.user = null;
        });
    },
});

export default userSlice;