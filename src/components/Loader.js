import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export const Loader = ({ loading }) => {
    console.log("loader", loading)
    return (
        <>
            {
                loading ? (
                    <View style={styles.container}>
                        <View style={{
                            position: 'absolute',
                            top: "50%",
                            backgroundColor: 'white',
                            padding: 10
                        }}>
                            <ActivityIndicator size={50} animating={loading} color={MD2Colors.red800} />
                        </View>
                    </View>
                ) : null
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
});
