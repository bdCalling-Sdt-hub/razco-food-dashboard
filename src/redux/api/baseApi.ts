import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import axios from "axios";
const authToken = getFromLocalStorage(authKey);

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.razcofoods.net/api/v1",
    // baseUrl: "http://192.168.10.185:5000/api/v1",
    headers: { Authorization: `Bearer ${authToken}` },
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
export const imageURL = "https://server.razcofoods.net";
// export const imageURL = "http://192.168.10.185:5000";
export const baseUrl = axios.create({
  baseURL: "https://server.razcofoods.net",
  // baseURL: "http://192.168.10.185:5000",
});
export const socketURL = "https://server.razcofoods.net/";


// digital ocean link http://146.190.130.172:5000/
// local ocean link http://192.168.10.16:5000