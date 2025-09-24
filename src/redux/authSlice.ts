import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id: string;
  googleId?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  profilePhoto?: string;
  role: "user" | "admin";
  otp?: string;
  otp_expiry?: number;
  is_verified: boolean;
  reset_token?: string;
  reset_token_expiry?: number;
  language?: string;
  is_two_factor: boolean;
  is_active: boolean;
  signup_date?: number;
  last_login?: number;
  is_complete: boolean;
  account_status?: "Active" | "Inactive";
  qualifications?: string;
  servicesOffered?: string[];
  location?: string;
  fee?: number;
  accessToken?: string;
  token?: string; // For the new API response
  createdAt?: string;
  updatedAt?: string;
}

const initialState: UserState = {
  _id: "",
  googleId: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
  profilePhoto: "",
  is_complete: false,
  role: "user",
  otp: "",
  otp_expiry: 0,
  is_verified: false,
  reset_token: "",
  reset_token_expiry: 0,
  language: "en",
  is_two_factor: false,
  is_active: true,
  signup_date: 0,
  last_login: 0,
  account_status: "Active",
  qualifications: "",
  servicesOffered: [],
  location: "",
  fee: 0,
  accessToken: "",
  token: "",
  createdAt: "",
  updatedAt: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    updateUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    resetUser() {
      return initialState;
    }
  }
});

export const { updateUser, resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
