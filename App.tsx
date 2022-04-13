import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/views/Home.view";
import CreateSession from "./src/views/CreateSession.view";
import JoinSession from "./src/views/JoinSession.view";
import WaitingRoom from "./src/views/WaitingRoom.view";
import GameRoom from "./src/views/GameRoom.view";
import EndRoom from "./src/views/EndRoom.view";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  GlobalContext,
  RoleTypes,
  GlobalContextInterface,
} from "./src/utils/GlobalContext";
import { useState } from "react";
import { io } from "socket.io-client";
import { CardProps } from "./src/components/Card";

const Stack = createNativeStackNavigator();

export default function App() {
  const [role, setRole] = useState<RoleTypes>("None");
  const [cardData, setCardData] = useState<Array<CardProps>>([]);
  const [sessionID, setSessionID] = useState<string>("");
  const socket = io("ws://3b13-104-183-243-37.ngrok.io");
  const [winningRestaurant, setWinningRestaurant] = useState<string>("");

  let GlobalContextProps: GlobalContextInterface = {
    role,
    setRole,
    cardData,
    setCardData,
    sessionID,
    setSessionID,
    socket,
    winningRestaurant,
    setWinningRestaurant,
  };

  return (
    <GlobalContext.Provider value={GlobalContextProps}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Create Session" component={CreateSession} />
          <Stack.Screen name="Join Session" component={JoinSession} />
          <Stack.Screen name="Waiting Room" component={WaitingRoom} />
          <Stack.Screen name="Game Room" component={GameRoom} />
          <Stack.Screen name="End Room" component={EndRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
