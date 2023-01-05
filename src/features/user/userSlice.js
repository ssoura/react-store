import axios from "axios";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Register new user
export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // console.log(message);

    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserDetails = createAsyncThunk(
  "user/userDetails",
  async (user, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState();
      return await userService.getUserDetails({ user, userInfo });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAction("user/logout", () => {
  userService.logout();
  return {};
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (user, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);
      // dispatch({
      //   type: USER_LOGIN_SUCCESS,
      //   payload: data,
      // })
      return data;
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listUsers = createAsyncThunk(
  "user/listUsers",
  async (thunkAPI) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users`, config);

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/users/${id}`, config);

      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_DELETE_FAIL,
        payload: message,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      // dispatch({ type: USER_UPDATE_SUCCESS });

      // dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

      // dispatch({ type: USER_DETAILS_RESET });
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        thunkAPI.dispatch(logout());
      }
      thunkAPI.rejectWithValue(message);
    }
  }
);

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
