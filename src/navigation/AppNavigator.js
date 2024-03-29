import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Cart,
  ProductList,
  ProductDetail,
  Checkout,
  Addresses,
  AddAddress,
  Login,
  Signup,
} from "../screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from 'react-redux';
import { login } from "../redux/slices/LoginSlice";
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
