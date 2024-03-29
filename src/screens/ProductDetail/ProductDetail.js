import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import { CustomButton, Header } from '../../components';
  import {useDispatch} from 'react-redux';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { addItemToWishList } from '../../redux/slices/WishlistSlice';
import { addItemToCart } from '../../redux/slices/CartSlice';

export const ProductDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
  
    const checkUserStatus = async () => {
      let isUserLoggedIn = false;
      const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
      console.log(status);
      if (status == null) {
        isUserLoggedIn = false;
      } else { 
        isUserLoggedIn = true;
      }
      console.log(isUserLoggedIn);
      return isUserLoggedIn;
    };
    console.log("data", route.params.data)

    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    return (
      <View style={styles.container}>
        <Header
          leftIcon={require('../../images/back.png')}
          rightIcon={require('../../images/cart.png')}
          title={'Product Detail'}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
          isCart={true}
        />
        <ScrollView>
          <Image
          source={{
            uri: `https://www.dahablenses.com/public/${route.params.data?.thumbnail_image}`,
          }}
          style={styles.banner}
        />
          <Text style={styles.title}>{route.params.data.name}</Text>
          {/* <Text style={styles.desc}>{route.params.data.description}</Text> */}
          <Text style={styles.desc}>{description}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.price, {color: '#000'}]}>{'Price:'}</Text>
            <Text style={styles.price}>{route.params.data.main_price}</Text>
            <View style={styles.qtyView}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  if (qty > 1) {
                    setQty(qty - 1);
                  }
                }}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{qty}</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setQty(qty + 1);
                }}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <CustomButton
            bg={'#FF9A0C'}
            title={'Add To Cart'}
            color={'#fff'}
            onClick={() => {
              if (checkUserStatus()) {
                dispatch(
                  addItemToCart({
                    category: route.params.data.category,
                    description: description,
                    id: route.params.data.id,
                    image: `https://www.dahablenses.com/public/${route.params.data?.thumbnail_image}`,
                    price: route.params.data.main_price,
                    qty: qty,
                    rating: route.params.data.rating,
                    title: route.params.data.name,
                    name: route.params.data.name,
                    thumbnail_image: route.params.data?.thumbnail_image
                  }),
                );
              } else {
                setModalVisible(true);
              }
            }}
          />
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    banner: {
      width: '100%',
      height: 300,
      resizeMode: 'center',
    },
    title: {
      fontSize: 23,
      color: '#000',
      fontWeight: '600',
      marginLeft: 20,
      marginTop: 20,
    },
    desc: {
      fontSize: 16,
  
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
    },
    price: {
      color: 'green',
      marginLeft: 20,
      marginTop: 20,
      fontSize: 20,
      fontWeight: '800',
    },
    wishlistBtn: {
      position: 'absolute',
      right: 20,
      top: 100,
      backgroundColor: '#E2DFDF',
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    icon: {
      width: 24,
      height: 24,
    },
    qtyView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 20,
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
  });