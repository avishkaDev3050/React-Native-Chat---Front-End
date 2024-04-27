import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  View,
  FlatList,
  Pressable,
  Alert,
  BackHandler, 
  ToastAndroid
} from 'react-native';

export function SignIn({navigation}) {

  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);

  const ui = (
    <SafeAreaView style={styles.signIn}>
      <View style={styles.signInView}>
        <Image
          source={{
            uri:
              'https://cdn3.vectorstock.com/i/1000x1000/36/97/approved-chat-app-icon-vector-28873697.jpg',
          }}
          style={styles.image}
        />
        <TextInput
          style={styles.signInInput1}
          placeholder={'Mobile'}
          onChangeText={setMobile}
          inputMode={'numeric'}
          placeholderTextColor={'white'}
          value={mobile}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.signInInput2}
          onChangeText={setPassword}
          placeholder={'Password'}
          placeholderTextColor={'white'}
          value={password}
        />
        <Pressable style={styles.signInBtn1} onPress={signInProccess}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </Pressable>
        <Pressable style={styles.signInBtn2} onPress={signUpProccess}>
          <Text style={styles.signInBtnText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  return ui;

  function signUpProccess() {
    navigation.navigate("Sign Up");
  }

  function signInProccess() {
    var jsRequestObject = {
      mobile: mobile,
      password: password,
    };

    var jsonRequestText = JSON.stringify(jsRequestObject);
    var form = new FormData();
    form.append('jsonRequestText', jsonRequestText);

    // Alert.alert("Message", jsonRequestText);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var jsResponseObject = JSON.parse(responseText);

        // Alert.alert("Message", jsResponseObject);

        if (jsResponseObject.msg == 'Error') {
          Alert.alert('Message', 'Invalid Details');
        } else {
          var userObject = jsResponseObject.user;
          AsyncStorage.setItem("user", JSON.stringify(userObject));
          // Alert.alert("Messsage", userObject.name);
          navigation.navigate("Home");
        }
      }
    };
    request.open('POST', 'http://10.0.2.2/react_chat/loging.php', true);
    request.send(form);
  }
}

const styles = StyleSheet.create({
  signIn: {
    flex: 1,
  },

  signInView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#313330',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  signInInput1: {
    color: '#fff',
    width: '80%',
    height: 50,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    borderRadius: 19,
  },

  signInInput2: {
    color: '#fff',
    width: '80%',
    height: 50,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    borderRadius: 19,
  },

  signInBtn1: {
    marginTop: 80,
    backgroundColor: '#77a879',
    height: 40,
    width: '80%',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInBtn2: {
    backgroundColor: 'black',
    height: 40,
    width: '80%',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInBtnText: {
    fontSize: 20,
    color: '#fff',
  },
});
