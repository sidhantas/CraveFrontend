import { StyleSheet, Text, View, Button } from "react-native";
import styles from "./Styles/Home.style";
import { io } from "socket.io-client";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useGlobalContext } from "../utils/GlobalContext";

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function Home({ navigation }: HomeProps) {
  const { setRole } = useGlobalContext();

  return (
    <View style={styles.container}>
      <Button
        title="Create Session"
        onPress={() => {
          setRole("Host");
          navigation.navigate("Create Session");
        }}
      />
      <View style={{ marginBottom: 5 }} />
      <Button
        title="Join Session"
        onPress={() => {
          setRole("Guest");
          navigation.navigate("Join Session");
        }}
      />
    </View>
  );
}
