import { Text, View } from "react-native";
import { useGlobalContext } from "../utils/GlobalContext";
import styles from "./Styles/EndRoom.style";

export default function EndRoom() {
  const { winningRestaurant } = useGlobalContext();

  return (
    <View style={styles.container}>
      <Text>{winningRestaurant}</Text>
    </View>
  );
}
