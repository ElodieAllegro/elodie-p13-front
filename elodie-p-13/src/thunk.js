import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, setUserProfile, signin } from "./api";

export const signinThunk = createAsyncThunk(
  "user/signin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await signin(data.email, data.password);
      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue("Email ou mot de passe incorrect.");
      }
      return result.body;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return rejectWithValue("Problème de connexion. Vérifiez votre réseau.");
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getUserProfile",
  async (token) => {
    const res = await getUserProfile(token);
    return (await res.json()).body;
  }
);

export const setUserProfileThunk = createAsyncThunk(
  "user/setUserProfile",
  async (data) => {
    const res = await setUserProfile(data.firstName, data.lastName, data.token);
    return (await res.json()).body;
  }
);
