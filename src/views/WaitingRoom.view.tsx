import { Text, View, Button } from "react-native";
import { useGlobalContext } from "../utils/GlobalContext";
import styles from "./Styles/WaitingRoom.style";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface WaitingRoomProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function WaitingRoom({ navigation }: WaitingRoomProps) {
  const { role, sessionID, socket } = useGlobalContext();

  socket.on("session:start", () => {
    navigation.navigate("Game Room");
  });

  return (
    <View style={styles.container}>
      <Text>{sessionID}</Text>
      {role === "Host" && (
        <Button title={"Start"} onPress={() => socket.emit("session:start")} />
      )}
      {role === "Guest" && <Text>Waiting For Host</Text>}
    </View>
  );
}
