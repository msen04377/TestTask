import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { Provider } from "react-redux";

import {AppNavigator} from './src/navigation'
import {store} from './src/redux/store'

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar backgroundColor='#FF5733'  />
      <SafeAreaView style={styles.droidSafeArea}>
        <AppNavigator />
      </SafeAreaView>
     </Provider>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
