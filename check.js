import React from "react";
import { SafeAreaView  } from "react-native";

export function Check() {

    async function checkUser() {
        const user = await AsyncStorage.getItem('user');
        return user;
    }

    const ui = (
        <SafeAreaView>
            {Check != null?"Home":"SIgn In"}
        </SafeAreaView>
    );
     
    return ui;
}