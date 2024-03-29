import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Button
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Provider } from "react-redux";
import { AppNavigator } from "../SCS_Test/src/navigation";
import { store } from "../SCS_Test/src/redux/store";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor='#6bb120'  />
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
