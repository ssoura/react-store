import { createSlice, createAction } from "@reduxjs/toolkit";
import {
  login,
  register,
  getUserDetails,
  updateUserProfile,
  listUsers,
  deleteUser,
  updateUser,
} from "../thunks/user";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const logoutService = () => localStorage.removeItem("userInfo");
// Logout user
export const logout = createAction("user/logout", () => {
  logoutService();
  return {};
});

const initialState = {
  userInfo: userInfoFromStorage,
  login: {
    loading: null,
    error: null,
    userInfo: {},
  },
  register: {
    loading: null,
    error: null,
    userInfo: {},
  },
  details: {
    user: {},
    loading: false,
    error: null,
  },
  updateProfile: {
    success: false,
  },
  list: {
    users: [],
  },
  delete: {},
  update: {
    loading: false,
    error: null,
    users: {},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.register.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
      });

    builder
      .addCase(login.pending, (state, action) => {
        state.login.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.loading = false;
        // console.log("payload", action.payload);
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      });

    builder
      .addCase(getUserDetails.pending, (state, action) => {
        state.details.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.details.loading = false;
        state.details.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.details.loading = false;
        state.details.error = action.payload;
      });
    builder
      .addCase(updateUserProfile.pending, (state, action) => {
        state.updateProfile.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateProfile.loading = false;
        state.updateProfile.success = true;
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateProfile.loading = false;
        state.updateProfile.error = action.payload;
      });
    builder
      .addCase(listUsers.pending, (state, action) => {
        state.list.loading = true;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.users = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      });
    builder
      .addCase(deleteUser.pending, (state, action) => {
        state.delete.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload;
      });
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.update.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });
  },
});

export default userSlice.reducer;
