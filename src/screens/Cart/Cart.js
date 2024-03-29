import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, CheckoutLayout, Loader } from '../../components';
import { useNavigation } from '@react-navigation/native';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../../redux/slices/CartSlice';
import { getProductsItem } from '../../redux/slices/ProductsSlice';
import { setLoader } from '../../redux/slices/LoaderSlice';

export const Cart = () => {
  const items = useSelector(state => state.cart);
  const productItem = useSelector((state)=>state.product)
  const loading = useSelector((state)=>state?.Loader.loading)
  
  const [cartItems, setCartItems] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoader(true))
    setTimeout(()=>{
      setCartItems(items.data);
      dispatch(setLoader(false))
    },2000)
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      const priceNumericString = item?.price.substring(3);
      const priceNumeric = parseFloat(priceNumericString);
      total = total + item.qty * priceNumeric;
    });
    return total.toFixed(0);
  };


  const updateQuantity = (product, delta) => {
    const cartItemQty = cartItems?.find((cartItem) => cartItem?.id === product.id);
    if (cartItemQty) {
      const updatedQty = cartItemQty.qty + delta;
      const updatedCartItemQty = { ...cartItemQty, qty: updatedQty };
      dispatch(addItemToCart(updatedCartItemQty));

      const updatedProductData = productItem?.productData?.map(el => {
        if (el.id === product.id) {
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

  return (
    <View style={styles.container}>
      <Header
        title={'Cart Items'}
        leftIcon={require('../../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack(null);
        }}
      />
      <FlatList
        data={cartItems}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}>
              <Image source={{ uri: item?.image }} style={styles.itemImage} />
              <View>
                <Text style={styles.name}>
                  {item?.title?.length > 25
                    ? item?.title.substring(0, 25) + '...'
                    : item?.title}
                </Text>
                <Text style={styles.desc}>
                  {item?.description?.length > 30
                    ? item?.description.substring(0, 30) + '...'
                    : item?.description}
                </Text>
                <View style={styles.qtyview}>
                  <Text style={styles.price} variant="bodyMedium">{`$` + " " + item?.price?.substring(3, 9)}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      if (item.qty > 1) {
                        dispatch(reduceItemFromCart(item));
                        decreaseQuantity(item)
                      } else {
                        dispatch(removeItemFromCart(index));
                      }
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item?.qty}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => increaseQuantity(item)}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {cartItems?.length < 1 && (
        <View style={styles.noItems}>
          <Text>No Items in Cart</Text>
        </View>
      )}
      {cartItems?.length > 0 && (
        <CheckoutLayout items={cartItems.length} total={getTotal()} />
      )}
     <Loader loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
