import { AxiosResponse } from "axios";
import request from "./request";

export type StoreType = {
  id: string;
  title: string;
  category: string;
  address: string;
  x: string;
  y: string;
};

export const getStoreAPI = async (
  lat: number,
  lon: number,
  distance: number
): Promise<AxiosResponse<StoreType[]>> =>
  await request("/store", {
    method: "GET",
    params: {
      lat,
      lon,
      distance,
    },
  });

export const registerStoreApi = async (registerSotreData: StoreType) =>
  await request("/store", {
    method: "POST",
    data: registerSotreData,
  });

export const searchStore = async (query: string, lat: number, lon: number) =>
  await request("/search", {
    method: "GET",
    params: {
      lang: "ko",
      caller: "pcweb",
      types: "place,address,bus",
      query,
      coords: `${lat},${lon}`,
    },
  });
