import {
  SafeAreaView, 
  Text, 
  StyleSheet, 
  Image, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'

import home from '../assets/home.png'
import address from '../assets/address.png'
import status from '../assets/status.png'
import checked from '../assets/checked.png'
import line from '../assets/line.png'
import back from '../assets/back.png'

export default function OrderRecord({ route, navigation }) {

  const [order, setOrder] = useState([]);

  const [dataItem, setDataItem] = useState()

  // fetch the orders
  const getOrder = () => {
    console.log("[ORD-REC] userID: " + route.params.userID)
    const url = route.params.baseUrl + '/OrdersHistory/GetElderHistory?' + new URLSearchParams({
      ElderId: route.params.userID
    });
    fetch(url, { method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setOrder(responseData);
      })
      .catch((error) => {
        console.log('[ORD-REC] error: ' + error);
      })
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>歷史訂單</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: Math.round(Dimensions.get('window').width), paddingHorizontal: 25}}>
        <View style={{height: 15}}></View>
        {order.map((type, index) => {
          return(
            <View key={index} style={styles.recordCard}>
              <Text key={index} style={styles.recordTitle}>{type.exeTime.substring(5, 7)}月{type.exeTime.substring(8, 10)}日  |  {type.exeTime.substring(11, 16)}</Text>
              <View style={{flexDirection: "row", marginLeft: 10}}>
                <Image source={checked} style={styles.recordIcon}/>
                <Text style={styles.recordText}>{type.mainType} → {type.typeDetail}</Text>
              </View>
              <Image source={line} style={styles.divider}/>
              <View style={{flexDirection: "row", marginLeft: 10}}>
                <Image source={address} style={styles.recordIcon}/>
                <Text style={styles.recordText}>{type.place === "" ? "預設地址" : type.place}</Text>
              </View>
              <Image source={line} style={styles.divider}/>
              <View style={{flexDirection: "row", marginLeft: 10}}>
                <Image source={status} style={styles.recordIcon}/>
                <Text 
                  style={[
                    styles.recordText, 
                    {color: type.statu === 0 ? '#cc6849' : type.statu === 3 ? '#52784c' : '#ece6c2'}
                  ]}
                >
                  {type.statu === 0 ? '已下單' : type.statu === 3 ? '已完成' : type.statu === 1 ? '訂單已被接收' : '進行中'}
                </Text>
              </View>
              <View style={{height: 5}}></View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece6c2'
  },
  header: {
    flexDirection: "row", 
    marginTop: 60,
    // backgroundColor: "black",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    // marginRight: 190,
    justifyContent: "center",
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 8
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 20,
    height: 30,
    marginRight: 10,
    marginTop: 11,
  },
  recordCard: {
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 55,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignSelf: "center",
    marginBottom: 25,
  },
  recordTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    letterSpacing: 2,
    backgroundColor: "#6f5643",
    textAlign: "center",
    padding: 5,
    marginBottom: 15
  },
  recordText: {
    fontSize: 20,
    color: "#6f5643",
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    letterSpacing: 2,
    marginHorizontal: 20,
    // alignSelf: "center",
  },
  recordIcon: {
    width: 30,
    height: 30,
    tintColor: "#6f5643",
  },
  divider: {
    width: 30,
    height: 15,
    tintColor: "#6f5643",
    marginLeft: 10,
    marginVertical: 10
  }
});