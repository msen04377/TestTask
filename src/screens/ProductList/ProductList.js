import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { scale } from "react-native-size-matters";

import { Cards, Container, Header, Loader } from "../../components";
import { addItemToCart } from "../../redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProductsItem } from "../../redux/slices/ProductsSlice";
import { setLoader } from "../../redux/slices/LoaderSlice";
import { useFocusEffect } from '@react-navigation/native';

export const ProductList = ({ navigation }) => {
  const items = useSelector((state) => state.cart);
  const productItem = useSelector((state)=>state.product)
  const loading = useSelector((state)=>state?.Loader.loading)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [item, setItem] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setCart(items?.data);
  }, [items]);

  useFocusEffect(
    React.useCallback(() => {
      setProducts(productItem?.productData);
      return () => {
        console.log('Screen is unfocused');
      };
    }, [productItem?.productData])
  );

  const getProducts = async () => {
    dispatch(setLoader(true))
    const response = await fetch(
      "https://www.dahablenses.com/demo/api/v4/products/best-seller"
    );
    const jsonRes = await response.json();
    const data = jsonRes?.data.map(item => ({ ...item, qty: qty }));
    dispatch(getProductsItem(data))
    dispatch(setLoader(false))
  };

  const updateQuantity = (product, delta) => {
    const cartItemQty = cart?.find((cartItem) => cartItem?.id === product.id);
    if (cartItemQty) {
      const updatedQty = cartItemQty.qty + delta;
      const updatedCartItemQty = { ...cartItemQty, qty: updatedQty };
      dispatch(addItemToCart(updatedCartItemQty));
      
      const updatedProductData = productItem?.productData?.map(el => {
        if (el === product) {
          return { ...el, qty: updatedQty };
        }
        return el;
      });
      
      dispatch(getProductsItem(updatedProductData));
    }
    
  };

  const decreaseQuantity = (product) => {
    updateQuantity(product, -1);
  };
  
  const increaseQuantity = (product) => {
    updateQuantity(product, 1);
  };


  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const addToCart = async (item) => {
    // setItem(item)
    dispatch(
      addItemToCart({
        category: item.category,
        description: description,
        id: item?.id,
        image: `https://www.dahablenses.com/public/${item?.thumbnail_image}`,
        price: item?.main_price,
        main_price: item?.main_price,
        qty: qty,
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
          margin:8
        }}
      >
        <Cards
          item={item}
          index={index}
          addToCart={addToCart}
          cart={cart}
          navigation={navigation}
          setQty={setQty}
          qty={qty}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </TouchableOpacity>
    );
  };


  return (
    <React.Fragment>
      <Header
        leftIcon={require("../../images/menu.png")}
        rightIcon={require("../../images/cart.png")}
        title={"Lenses"}
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
            <View style={{ paddingBottom: scale(0)}} />
          )}
          numColumns={2}
          key={2}
        />
        {products?.length < 1 && (
          <View style={styles.noItems}>
            <Text>No Product Found</Text>
          </View>
        )}
      </Container>
      <Loader loading={loading} />
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
