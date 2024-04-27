import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown'
import React, {memo, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function SignUp({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); 
  const [verifyPassword, setVerifyPassword] = useState('');
  const [country, setCountry] = useState('');
  const [profileImage, setProfileImage] = useState(null);


  const [countries,setCountries] = useState([]);
  
  const ui = (
    <SafeAreaView style={styles.home}>
      <View style={styles.mainView}>
        <Pressable onPress={selectProfilePicture}>
          <Image
          source={{uri: 'https://cdn-icons-png.flaticon.com/128/2202/2202112.png'}}
          style={styles.signUpImage}
          />
        </Pressable>
        <View style={styles.signUpView1}>
        <Icon name="mobile" style={styles.signUpIcon1} color={"#fff"} />
          <TextInput
            style={styles.signUpInput1}
            autoCorrect={false}
            inputMode={'numeric'}
            maxLength={10}
            placeholder={'Your Mobile'}
            placeholderTextColor={"#fff"}
            onChangeText={setMobileNumber}
          />
        </View>

        <View style={styles.signUpView1}>
          <Icon name="user" style={styles.signUpIcon1} color={"#fff"} />
          <TextInput
            style={styles.signUpInput1}
            autoCorrect={false}
            placeholder={'Your Name'}
            placeholderTextColor={"#fff"}
            onChangeText={setName}

          />
        </View>
        <View style={styles.signUpView1}>
          <Icon name="lock" style={styles.signUpIcon1} color={"#fff"} />
          <TextInput
            style={styles.signUpInput1}
            secureTextEntry={true}
            placeholder={'Your Password'}
            placeholderTextColor={"#fff"}
            onChangeText={setPassword}

          />
        </View>
        <View style={styles.signUpView1}>
          <Icon name="lock" style={styles.signUpIcon1} color={"#fff"} />
          <TextInput
            style={styles.signUpInput1}
            secureTextEntry={true}
            placeholder={'Confirm Password'}
            placeholderTextColor={"#fff"}
            onChangeText={setVerifyPassword}

          />
        </View>
        
        <View style={styles.signUpView1}>
          <SelectDropdown 
            data={countries} 
            onSelect={setCountry}
          /> 
          
        </View> 
        <TouchableHighlight onPress={signUpRequest} style={styles.signUpButton2}>
          <Text style={styles.BtnText} >Sign Up</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={signIn} style={styles.signUpButton1}>
          <Text style={styles.BtnText} >Sign In</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );

  function loadCountries() {  

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var countryArray = JSON.parse(request.responseText);
        setCountries(countryArray);
        // Alert.alert("Message", request.responseText);
      }
    };

    request.open('GET', 'http://10.0.2.2/react_chat/load_countries.php', true);
    request.send();
  }
  
  function start() {
    loadCountries();
  }

  useEffect(start, []);



  async function selectProfilePicture() {
    const options = {mediaType: 'photo'};
    // const options ={"cameraType":"front"}
    const result = await launchImageLibrary(options);
    // const result = await launchCamera(options);
    if (result.didCancel) {
      Alert.alert('Massage', 'No Image :(');
    } else {
      Alert.alert("Message", "Profile Selected :)");
      const imageObject = {
        uri: result.assets[0].uri,
        name: 'profile.png',
        type: 'image/png',
      };
      setProfileImage(imageObject);
      // signUpRequest(imageObject);
    }
  }
  
  function signUpRequest() {    

    var formData = new FormData();   

    formData.append('mobile', mobileNumber);
    formData.append('password',password);
    formData.append('name', name);
    formData.append('country', country);
    formData.append('verifyPassword',verifyPassword);
    formData.append('profile_picture', profileImage);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        // Alert.alert('Response', request.responseText);
        if (request.responseText == "Uploaded") {
          Alert.alert("Message", "Successfuly registered :)");
          navigation.navigate("Sign In");
        } else {
          Alert.alert("Message", "Try again :(");
        }
      }
    };

    request.open('POST', 'http://10.0.2.2/react_chat/signUp.php', true);
    request.send(formData);
  }

  function signIn() {
    navigation.navigate("Sign In");
  }

  return ui;

}

const styles = StyleSheet.create({

  home: {
    flex: 1,
  },

  mainView: {
    flex: 1,
    backgroundColor: '#313330',
    gap: 20,
    alignItems: "center",
  },

  signUpMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },

  signUpImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    margin: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },

  signUpInput1: {
    width: '80%',
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    paddingStart: 35,
    borderColor: '#fff',
    color: "#fff",
  },

  signUpView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  signUpIcon1: {
    fontSize: 20,
    position: 'absolute',
    start: 15,
  },

  signUpButton1: {
    width: '80%',
    height: 45,
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signUpButton2: {
    width: '80%',
    height: 45,
    backgroundColor: 'green',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 49,
  },

  BtnText: {
    color: "#fff",
    fontWeight: "bold",
  }

});