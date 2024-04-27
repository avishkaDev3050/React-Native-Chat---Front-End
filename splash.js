import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect, } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, Alert } from "react-native";

export function Splash({navigation}) {

    const ui = (
        <SafeAreaView style={styles.main}>
            <View style={styles.view}>
            <Image
                source={{
                uri:
                    'https://cdn3.vectorstock.com/i/1000x1000/36/97/approved-chat-app-icon-vector-28873697.jpg',
                }}
                style={styles.logo}
            />
            <Text style={styles.text}>CHATONLY</Text>
            </View>
        </SafeAreaView>
    );

    async function splash() {
        var user = await AsyncStorage.getItem("user");
        if(user == null) {
            navigation.navigate("Sign In");
        } else {
            navigation.navigate("Home");
        }
    }

    
    setTimeout(splash, 3000);

    return ui;

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
    },

    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#313330",
    },

    logo: {
        width: 100,
        height: 100,
    },

    text: {
        fontSize: 40,
        color: "#fff",
    },

});