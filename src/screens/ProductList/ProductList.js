import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { scale } from "react-native-size-matters";

import { Cards, Container, Header } from "../../components";
import { getData, storeData } from "../../util/util";
import { addItemToCart } from "../../redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
// import axios from 'axios';

export const ProductList = ({ navigation }) => {
  const items = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setCart(items?.data);
  }, [items]);

  const getProducts = async () => {
    const response = await fetch(
      "https://www.dahablenses.com/demo/api/v4/products/best-seller"
    );
    const jsonRes = await response.json();
    setProducts(jsonRes?.data);
  };

  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const addToCart = async (item) => {
    dispatch(
      addItemToCart({
        category: item.category,
        description: description,
        id: item?.id,
        image: `https://www.dahablenses.com/public/${item?.thumbnail_image}`,
        price: item?.main_price,
        main_price: item?.main_price,
        qty: 1,
        rating: item?.rating,
        title: item?.name,
        name: item?.name,
        thumbnail_image: item?.thumbnail_image,
      })
    );
  };

  const ProductCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("ProductDetail", { data: item });
        }}
      >
        <Cards
          item={item}
          index={index}
          addToCart={addToCart}
          cart={cart}
          navigation={navigation}
        />
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <Header
        leftIcon={require("../../images/menu.png")}
        rightIcon={require("../../images/cart.png")}
        title={"SCS App"}
        isCart={true}
        onClickLeftIcon={() => console.log("left icon")}
      />
      <Container isScrollable style={styles.container}>
        <FlatList
          style={{ marginTop: scale(40) }}
          showsVerticalScrollIndicator={false}
          vertical
          data={products}
          renderItem={({ item, index }) => (
            <ProductCard key={index} item={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ paddingBottom: scale(10) }} />
          )}
          contentContainerStyle={{
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
          }}
        />
        {products?.length < 1 && (
          <View style={styles.noItems}>
            <Text>No Product Found</Text>
          </View>
        )}
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  noItems: {
    marginTop: 50,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
