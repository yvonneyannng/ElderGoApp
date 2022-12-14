import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Alert, 
  Image, 
  Dimensions, 
  KeyboardAvoidingView, 
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'

import home from '../assets/home.png'
import back from '../assets/back.png'

export default function Settings({ route, navigation }) {

  const getMember = () => {
    const url = route.params.baseUrl + '/Members/GetMember?' + new URLSearchParams({
      id: route.params.userID
    });
    fetch(url, { method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        setName(responseData.name)
        setPhone(responseData.phone)
        setAddress(responseData.address)
      })
      .catch((error) => {
        console.log('[SETTINGS] error: ' + error);
      })
  };

  // useEffect(() => {
  //   getMember();
  // }, []);

  console.log("[SETTINGS] elderID: " + route.params.userID)
  // 傳入姓名、電話、地址做為預設值
  const [newName, setName] = useState(newName)
  const [phone, setPhone] = useState(phone)
  const [address, setAddress] = useState(address)
  const [comeIn, setComeIn] = useState(0)

  // save new user data
  const save = () => {
    const url = route.params.baseUrl + '/Members/EditMember';
    if(newName === '' || phone === '' || address === '') {
      Alert.alert(
        "檢查一下", 
        "有空白欄位!",
        [{ text: "確定", onPress: () => console.log("Confirm Pressed") }]
      )
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: route.params.userID,
          name: newName,
          phone: phone,
          address: address
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if(responseData.isSuccess) {
            Alert.alert(
              "變更成功", 
              "姓名："+newName+"\n聯絡號碼："+phone+"\n預設地址："+address,
              [{ text: "確定", onPress: () => console.log("Confirm Pressed") }]
            )
          }
        })
        .catch((error) => {
          console.log('[SETTINGS] error: ' + error);
        })
      setComeIn(1)
      navigation.goBack()
    }
  }

  useEffect(() => {
    getMember();
    if(comeIn === 1) {
      save();
    }
  }, []);
  // ===========================

  // alert for user clicking 'logout' button
  // yes: back to sign in
  // no: stay in settings
  const logout = () => {
    Alert.alert(
      "確認", 
      "是否確定要登出?",
      [
        { text: "是", onPress: () => navigation.navigate("SignIn") },
        { text: "否", onPress: () => console.log("No Pressed") }
      ]
    )
  }

  const Input = (icon, title, pholder, data, setData) => {
    return(
      <View style={styles.inputContainer}>
        <View style={{flexDirection: "row", alignItems: "center", marginLeft: 5}}>
          <Image source={icon} style={{height: 30, width: 30, tintColor: "#cc6b49"}}></Image>
          <Text style={styles.inputTitle}>{title}</Text>
        </View>
        <TextInput 
          style={styles.inputBlock} 
          placeholder={pholder}
          placeholderTextColor="#ebecf0"
          onChangeText={setData}
          value={data}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>設定</Text>
      </View>
      <View style={{height: 10}}></View>

      {/* Name, Phone number, Address */}
      <ScrollView showsVerticalScrollIndicator={false} style={{width: Math.round(Dimensions.get('window').width), paddingHorizontal: 25}}>
        {Input(require("../assets/card.png"), "姓名", "例: XXX", newName, setName)}
        {Input(require("../assets/phone.png"), "聯絡號碼", "例: 0912345678", phone, setPhone)}
        {Input(require("../assets/address.png"), "預設地址", "例: 逢甲路100號", address, setAddress)}

        {/* Save and Logout button, triggering 'save' and 'logout' alert*/}
        <View style={{
          flexDirection: "row", 
          marginTop: 30, 
          marginBottom: 40, 
          width: Math.round(Dimensions.get('window').width) - 55,
          alignSelf: "center",
        }}>
          <TouchableOpacity style={styles.button} onPress={save}>
            <Text style={[styles.buttonText, {color: "white"}]}>儲     存</Text>
          </TouchableOpacity>
          <View style={{width: 20}}/>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={[styles.buttonText, {color: "white"}]}>登     出</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

// const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece6c2',
  },
  header: {
    flexDirection: "row", 
    marginTop: 60,
    // backgroundColor: "black",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    marginRight: 20,
    justifyContent: "center",
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 30,
    height: 30,
    marginRight: 5,
  },
  inputContainer: {
    alignSelf: "center",
    marginBottom: 30,
    // backgroundColor: "brown",
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  inputTitle:{
    fontSize: 25,
    // marginTop: 10,
    marginLeft: 5,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#cc6b49",
    letterSpacing: 1,
    padding: 10
  },
  inputBlock: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    padding: 15,
    backgroundColor: "#d2a24c",
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
  },
  button: {
    backgroundColor: "#cc6b49",
    paddingVertical: 13,
    flex: 1,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "Avenir Next",
    fontWeight: "600"
  }
});