import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

export const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart,
}) => {
  const cartItems = useSelector((state) => state.cart);

  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}
      >
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {!isCart && <View></View>}      
      {isCart && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Image
            source={rightIcon}
            style={[styles.icon, { width: 40, height: 40 }]}
          />
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#fff",
              position: "absolute",
              right: 0,
              top: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000" }}>{cartItems?.data?.length}</Text>
          </View>
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 65,

    backgroundColor: "#FF5733",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
});
