import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { scale } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const Cards = ({ item, index, addToCart, cart, navigation, setQty, qty, increaseQuantity, decreaseQuantity }) => {
  const product = cart.find(product => product.id === item?.id);
  console.log("item?.mainPrice", item?.main_price, typeof item?.main_price)
  return (
    <Card>
      <Card.Content>
        <Image
          source={{
            uri: `https://www.dahablenses.com/public/${item?.thumbnail_image}`,
          }}
          style={{ width: 120, height: 120 }}
        />
        <Text
          numberOfLines={1}
          variant="bodyMedium"
          style={{
            marginTop: scale(10),
          }}
        >
          {item?.name.length < 20
            ? `${item?.name}`
            : `${item?.name?.substring(0, 14.5)}...`}
        </Text>
        <Text variant="bodyMedium">{`$` + " " + item?.main_price?.substring(3,9)}</Text>
        {product ? (
          <View style={styles.qtyView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => decreaseQuantity(item)}
            >
              <Text style={{ fontSize: 18, fontWeight: '600' }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item?.qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => increaseQuantity(item)}
            >
              <Text style={{ fontSize: 18, fontWeight: '600' }}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={{ backgroundColor: "#FF5733", marginVertical: 10, color: '#FFFFF' }}>
            <Button text="contained" onPress={() => addToCart(item)}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: 'bold' }}>Add to cart</Text>
            </Button>
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
    // marginLeft: 20,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    // borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
});
