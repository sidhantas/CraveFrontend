import {
  createContext,
  SetStateAction,
  useContext,
  useState,
  Dispatch,
} from "react";
import { Socket, io } from "socket.io-client";
import { CardProps } from "../components/Card";

export type RoleTypes = "Host" | "Guest" | "None";

interface GlobalContextInterface {
  role: RoleTypes;
  setRole: Dispatch<SetStateAction<RoleTypes>>;
  cardData: Array<CardProps>;
  setCardData: Dispatch<SetStateAction<Array<CardProps>>>;
  sessionID: string;
  setSessionID: Dispatch<SetStateAction<string>>;
  socket: Socket;
  winningRestaurant: string;
  setWinningRestaurant: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextInterface>({
  role: "None",
  setRole: () => {},
  cardData: [],
  setCardData: () => {},
  sessionID: "",
  setSessionID: () => {},
  socket: io("ws://3b13-104-183-243-37.ngrok.io"),
  winningRestaurant: "",
  setWinningRestaurant: () => {},
});

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, useGlobalContext, GlobalContextInterface };
