import stationsFile from "./stations.json";

export interface IPublishState {
  message: string;
  type: string;
  location: string;
  latitude: string;
  longitude: string;
}

export const initialPublish: IPublishState = {
  message: "",
  type: "Delayed",
  location: "Adamstown",
  latitude: "",
  longitude: ""
};

console.log(stationsFile);

export const stations: {
  [station: string]: {
    longitude: string;
    latitude: string;
  };
} = stationsFile as any;

export const stationNames = Object.keys(stations);

export const messageType = [
  "Delayed",
  "Detour",
  "Cancelled",
  "Train Switch",
  "Arriving",
  "Reduced Capacity",
  "Diversion",
  "Other"
];
