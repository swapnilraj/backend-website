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

export const stations = stationsFile;

export const stationNames = Object.keys(stations);

export const messageType = [
  "Delayed",
  "Cancelled",
  "Arriving",
  "Reduced Capacity",
  "Diversion"
];
