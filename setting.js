import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Splash } from './splash';

export function Setting({navigation}) {

  const ui = (
    <SafeAreaView style={light.main}>
      <View style={light.view1}>
        <Text style={light.text1}>Settings</Text>
        <View style={light.view2}>
          <TouchableHighlight style={light.logout} onPress={logout}>
            <Text style={light.btnText}>Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );

  async function logout() {
    const remove = await AsyncStorage.removeItem("user");
    if (remove == null) {
       navigation.navigate("Sign In");
    }
  }

  return ui;
}


const light = StyleSheet.create({
  main: {
    flex: 1,
  },

  view1: {
    flex: 1,
    backgroundColor: '#313330',
  },

  text1: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
  },

  view2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },

  logout: {
    width: '90%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 25,
  },
});