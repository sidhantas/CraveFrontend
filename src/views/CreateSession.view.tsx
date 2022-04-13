import { View, Text, Button } from "react-native";
import styles from "./Styles/CreateSession.style";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useGlobalContext } from "../utils/GlobalContext";

interface CreateSessionProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function CreateSession({ navigation }: CreateSessionProps) {
  const { setCardData, setSessionID, cardData, socket } = useGlobalContext();

  socket.on("session:create", (res) => {
    switch (res.status) {
      case 200:
        console.log(res.cardData);
        setCardData(res.cardData);
        console.log(cardData);
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

  const searchRequest = {
    location: "Dublin, CA",
    radius: 40000,
    categories: "japanese",
  };

  return (
    <View style={styles.container}>
      <Text>Create Session Screen</Text>
      <Button
        title="Create!"
        onPress={() => {
          socket.emit("session:create", searchRequest);
        }}
      ></Button>
    </View>
  );
}
