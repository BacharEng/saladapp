import { create } from "zustand";
import * as SQLite from "expo-sqlite";

type LocationObj = {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
};

type LocationState = {
  locations: LocationObj[];
  getLocations: () => void;
  //   addLocation: (loc: LocationObj) => void;
  //   updateLocation: (loc: LocationObj) => void;
  //   deleteLocation: (id: number) => void;
};

const db = SQLite.openDatabase("db.db");

const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  getLocations: () => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM locations;",
        [],
        (_, { rows: { _array } }) => {
          set({ locations: _array });
        },
        (_, error) => {
          console.log(error.message);
          return false;
        }
      );
    });
  },
}));
