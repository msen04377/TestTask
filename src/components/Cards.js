import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { scale } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const Cards = ({ item, index, addToCart, cart, navigation }) => {

  const product = cart.find(product => product.id === item?.id);

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
            : `${item?.name.substring(0, 14.5)}...`}
        </Text>
        <Text variant="bodyMedium">{item?.main_price}</Text>
        {product ? (
          <Button icon="shopping" text="outline" onPress={() => navigation.navigate('Cart')}>
            Go To Cart
          </Button>
        ) : (
          <Button icon="plus" text="outline" onPress={() => addToCart(item)}>
            Add to cart
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({});
