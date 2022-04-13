import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalContext, useGlobalContext } from "../utils/GlobalContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CardProps {
  img_url: any;
  name: String;
}

interface CardStackProps {
  cardProps: Array<CardProps>;
}

function Card(props: CardProps) {
  enum Side {
    left,
    right,
  }
  const { socket, sessionID } = useGlobalContext();
  const [visible, setVisible] = useState<boolean>(true);

  const handleClick = (side: Side) => {
    if (side === Side.left) {
      console.log("Left");
      setVisible(false);
    } else if (side === Side.right) {
      console.log("Right");
      socket.emit("session:incScore", sessionID, props.name);
      setVisible(false);
    }
  };

  return visible ? (
    <View style={cardStyles.card}>
      <TouchableWithoutFeedback onPress={() => handleClick(Side.left)}>
        <View style={cardStyles.left}></View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleClick(Side.right)}>
        <View style={cardStyles.right}></View>
      </TouchableWithoutFeedback>
      <Text style={cardStyles.restarurantName}>{props.name}</Text>
      <ImageBackground
        source={{ uri: props.img_url }}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        imageStyle={cardStyles.image}
      ></ImageBackground>
    </View>
  ) : null;
}

export default function CardStack(props: CardStackProps) {
  console.log(props.cardProps);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {props.cardProps.map((card) => (
        <Card key={card.img_url} img_url={card.img_url} name={card.name} />
      ))}
    </View>
  );
}

const cardBorderRadius = 10;

const cardStyles = StyleSheet.create({
  left: {
    zIndex: 2,
    position: "absolute",
    left: 0,
    width: "50%",
    height: "100%",
  },
  right: {
    zIndex: 2,
    position: "absolute",
    right: 0,
    width: "50%",
    height: "100%",
  },
  card: {
    width: windowWidth - 20,
    height: windowHeight,
    backgroundColor: "grey",
    borderRadius: cardBorderRadius,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: cardBorderRadius,
  },
  restarurantName: {
    position: "absolute",
    zIndex: 3,
    color: "white",
    fontSize: 50,
    left: 10,
    fontWeight: "bold",
    width: "70%",
    top: 10,
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },
});

export { Card, CardProps };
