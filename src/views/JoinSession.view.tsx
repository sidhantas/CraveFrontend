import { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { useGlobalContext } from "../utils/GlobalContext";
import styles from "./Styles/JoinSession.style";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface JoinSessionProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function JoinSession({ navigation }: JoinSessionProps) {
  const { socket, setCardData, setSessionID } = useGlobalContext();
  const [joinID, setJoinID] = useState<string>("");

  socket.on("session:join", (res) => {
    switch (res.status) {
      case 200:
        setCardData(res.cardData);
        setSessionID(res.sessID);
        navigation.navigate("Waiting Room");
        break;
      case 500:
        console.log("Error");
        break;
      default:
        console.log("Unkown Error");
        break;
    }
  });

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setJoinID}
        value={joinID}
        placeholder="Session ID"
        textAlign={"center"}
      />
      <Button
        title="Join!"
        onPress={() => {
          socket.emit("session:join", joinID);
        }}
      />
    </View>
  );
}
