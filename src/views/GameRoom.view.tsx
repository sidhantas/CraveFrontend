import { View, Text } from "react-native";
import { useGlobalContext } from "../utils/GlobalContext";
import styles from "./Styles/GameRoom.style";
import CardStack from "../components/Card";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface GameRoomProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function GameRoom({ navigation }: GameRoomProps) {
  const { cardData, socket, setWinningRestaurant } = useGlobalContext();

  socket.on("session:complete", (winner) => {
    setWinningRestaurant(winner);
    console.log(winner);
    navigation.navigate("End Room");
  });

  return (
    <View style={styles.container}>
      <CardStack cardProps={cardData} />
    </View>
  );
}
