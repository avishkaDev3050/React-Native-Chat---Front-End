import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export function Home({navigation}) {

  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  async function loadFreindList() {
    const userJsonText = await AsyncStorage.getItem('user');
    const formData = new FormData();
    formData.append('userJsonText', userJsonText);
    formData.append('text', searchText);
    // Alert.alert(searchText);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        // Alert.alert("Messager", request.responseText);
        setItems(JSON.parse(request.responseText));
      }
    };
    request.open('POST', 'http://10.0.2.2/react_chat/loadUser.php', true);
    request.send(formData);
  }

  function start() {
    setInterval(loadFreindList, 2000);
  }

  useEffect(start, []);

  const ui = (
    <SafeAreaView style={styles.home}>
      <View style={styles.mainView}>
        <View style={styles.topBar}>
          <Text style={styles.homeText}> Message </Text>
          <Image
            source={{
              uri:
                'https://cdn3.vectorstock.com/i/1000x1000/36/97/approved-chat-app-icon-vector-28873697.jpg',
            }}
            style={styles.logo}
          />
          <Pressable onPress={setting}>
            <Image
              source={{
                uri:
                  'https://img.icons8.com/sf-black-filled/256/automatic.png',
              }}
              style={styles.menuIcon}
            />
          </Pressable>
        </View>
        <View style={styles.homeView}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'white'}
            style={styles.homeInput}
            onChangeText={setSearchText}
          />
          <Pressable onPress={loadFreindList}>
            <Image
              source={require('./images/searchIcon.png')}
              style={styles.homeInputImage}
            />
          </Pressable>
        </View>

        <View style={styles.freindlist}>
          <FlatList data={items} renderItem={itemUI} />
        </View>
      </View>
    </SafeAreaView>
  );

  function setting() {
    navigation.navigate("Setting");
  }

  return ui;

  function itemUI({item}) {
    const ui = (
      <Pressable onPress={m}>
        <View style={styles.item}>
          <Image
            source={{
              uri: `${
                'http://10.0.2.2/react_chat/uploads/' + item.pic + '.png'
              }`,
            }}
            style={styles.itemImage}
          />
          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>{item.name}</Text>
            <Text style={styles.itemText2}>{item.msg}</Text>
          </View>
          <View style={styles.itemView1}>
            <Text style={styles.itemText3}>{item.time}</Text>
            <View style={styles.itemShape1}>
              <Text style={styles.itemText4}>{item.count}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );

    function m() {
      // Alert.alert("Message", item.pic);
      const obj = {name: item.name, id: item.id, pic: item.pic};
      navigation.navigate('Chat', obj);
    }

    return ui;
  }
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
    start: 70,
    fontFamily: 'Satisfy',
    marginTop: 10,
  },

  logo: {
    marginTop: 20,
    end: 110,
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  menuIcon: {
    marginTop: 20,
    start: 140,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    backgroundColor: "blue",
  },

  topBar: {
    flexDirection: 'row',
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
    position: 'absolute',
    end: 20,
    backgroundColor: '#5742f5',
    borderRadius: 50,
    padding: 20,
  },

  homeInputImage: {
    marginEnd: 29,
    end: 40,
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
    marginLeft: 40,
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
    marginLeft: 65,
    marginTop: 9,
  },

  chat: {
    flex: 1,
  },

  chatMainView: {
    paddingLeft: 19,
    alignItems: 'center',
    flexDirection: 'row',
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
    justifyContent: 'center',
  },

  signInView: {
    width: '100%',
    backgroundColor: '#313330',
    alignItems: 'center',
    gap: 20,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  signInInput1: {
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


