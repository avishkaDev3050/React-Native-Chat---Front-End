import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Chat({route}) {
  const [name, setName] = useState(null);
  const [test, setTest] = useState(null);
  
  const [chatHistoey, setChatHistory] = useState([]);
  const [chatText, setChatText] = useState('');

  async function sendRequest() {

    const form = new FormData();
    var userJsonText = await AsyncStorage.getItem('user');
    var userJSObject = JSON.parse(userJsonText);
    form.append("id1", userJSObject.id);
    form.append("id2", route.params.id);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        // Alert.alert("Message", responseText);
        setChatHistory(responseArray);
      }
    };
    request.open('POST', 'http://10.0.2.2/react_chat/load_chat.php', true);
    request.send(form);
  }

  async function saveChat() {
    const userJsonText = await AsyncStorage.getItem('user');
    const userObject = JSON.parse(userJsonText);

    var requestObject = {
      from: userObject.id,
      to: route.params.id,
      message: chatText,
    };

    setChatText("");

    var requestJsonObject = JSON.stringify(requestObject);

    const form = new FormData();
    form.append('r', requestJsonObject);

    var request2 = new XMLHttpRequest();
    request2.onreadystatechange = function () {
      if (request2.readyState == 4 && request2.status == 200) {
        // Alert.alert("Message" ,request2.responseText);
      }
    };
    request2.open('POST', 'http://10.0.2.2/react_chat/save_chat.php', true);
    request2.send(form);
  }

  const ui = (
    <SafeAreaView style={styles.chat}>
      <View style={styles.chatMainView}>
        <Image
          source={{
            uri: `${"http://10.0.2.2/react_chat/uploads/" + route.params.pic + ".png"}`
          }}
          style={styles.chatImage}
        />
        <Text style={styles.chatText1}>{route.params.name}</Text>
      </View>

      <View style={styles.chatList}>
        <FlatList data={chatHistoey} renderItem={chatItem} />
      </View>

      <View style={styles.chatSendView}>
        <TextInput
          style={styles.chatInput}
          placeholder={'Type a Message'}
          onChangeText={setChatText}
          placeholderTextColor={'#fff'}
          value={chatText}
        />
        <Pressable onPress={saveChat}>
          <Image
            source={{
              uri: 'https://img.icons8.com/external-flat-icons-vectorslab/68/external-Send-Message-user-interface-flat-icons-vectorslab.png',
            }}
            style={styles.img}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );

  function noDelayLoad() {
    sendRequest();
  }

  function start() {
    const running = setInterval(sendRequest, 500);
    return () => clearInterval(running);
  }

  useEffect(noDelayLoad, []);
  useEffect(start, []);

  return ui;
}

function chatItem({item}) {
  const itemUi = (
    <View
      style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
      <Text style={styles.chatMsg}>{item.msg}</Text>
      <View style={styles.chatView1}>
        <Text style={styles.chatTime}>{item.time}</Text>
        {item.status == 'seen' && item.side == 'right' ? (
          <Icon
            name="check"
            size={15}
            color="#1b1c16"
            style={styles.chatStatus}
          />
        ) : null}
      </View>
    </View>
  );

  return itemUi;
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },

  mainView: {
    flex: 1,
    backgroundColor: '#313330',
    gap: 20,
  },

  homeText: {
    fontSize: 30,
    padding: 15,
    color: '#fff',
    start: 10,
    fontFamily: "Satisfy",
  },

  logo: {
    marginTop: 20,
    start: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  menuIcon: {
    marginTop: 20,
    start: 110,
    width: 35,
    height: 35,
  },

  topBar: {
    flexDirection: "row",
  },

  homeInput: {
    height: 45,
    borderStyle: 'solid',
    borderWidth: 1,
    width: '90%',
    borderRadius: 20,
    fontSize: 15,
    color: 'white',
    paddingLeft: 15,
    paddingEnd: 45,
    marginStart: 15,
    borderColor: '#5742f5',
  },

  homeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  img: {
    height: 20,
    width: 20,
    padding: 20,
    marginLeft: 10,
  },

  homeInputImage: {
    position: 'absolute',
    marginEnd: 29,
    end: 10,
    width: 25,
    height: 25,
  },

  freindlist: {
    paddingTop: 16,
    flex: 3,
    width: '100%',
    backgroundColor: 'black',
  },

  itemImage: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginEnd: 20,
    marginStart: 20,
    marginTop: 10,
  },

  item: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'green',
    padding: 8,
  },

  itemText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  itemText2: {
    fontSize: 15,
    color: 'yellow',
  },

  itemText3: {
    fontSize: 12,
    color: 'white',
  },

  itemText4: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  itemView1: {
    width: '50%',
    paddingVertical: 10,
  },

  itemShape1: {
    width: 25,
    height: 25,
    backgroundColor: '#2675EC',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 9,
  },

  chat: {
    flex: 1,
  },

  chatMainView: {
    paddingLeft: 19,
    alignItems: 'center',
    flexDirection: "row",
    flex: 1,
    backgroundColor: '#313330',
    gap: 10,
  },

  chatImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },

  chatText1: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
  },

  chatList: {
    flex: 7,
    width: '100%',
    backgroundColor: 'black',
    padding: 16,
  },

  chatViewRight: {
    backgroundColor: '#5742f5',
    marginTop: 10,
    marginEnd: 10,
    padding: 16,
    borderWidth: 4,
    borderColor: '#1b1c16',
    borderRadius: 18,
    alignSelf: 'flex-end',
  },

  chatViewLeft: {
    backgroundColor: '#1b1c16',
    padding: 16,
    marginTop: 10,
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#5742f5',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },

  chatMsg: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  chatView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  chatTime: {
    fontSize: 13,
    color: 'yellow',
    fontWeight: 'bold',
  },

  chatStatus: {
    paddingLeft: 10,
  },

  chatSendView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#313330',
    width: '100%',
    paddingStart: 30,
    paddingVertical: 20,
  },

  chatInput: {
    height: 45,
    borderStyle: 'solid',
    backgroundColor: 'black',
    color: '#fff',
    borderWidth: 2,
    width: '80%',
    borderRadius: 20,
    fontSize: 20,
    paddingEnd: 50,
    borderColor: 'red',
    paddingHorizontal: 15,
  },

  signIn: {
    flex: 1,
    justifyContent: "center",
  },

  signInView: {
    width: "100%",
    backgroundColor: "#313330",
    alignItems: "center",
    gap: 20,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  signInInput1: {
    width: "80%",
    height: 50,
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    borderRadius: 19,
  },

  signInInput2: {
    width: "80%",
    height: 50,
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    borderRadius: 19,
  },

  signInBtn1: {
    marginTop: 80,
    backgroundColor: "#77a879",
    height: 40,
    width: "80%",
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  signInBtn2: {
    backgroundColor: "black",
    height: 40,
    width: "80%",
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  signInBtnText: {
    fontSize: 20,
    color: "#fff",
  },

});
