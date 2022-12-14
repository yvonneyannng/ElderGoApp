import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, Dimensions, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'

import home from '../assets/home.png'
import back from '../assets/back.png'
import food from '../assets/food.png'
import clothes from '../assets/clothes.png'
import edu from '../assets/edu.png'
import entertainment from '../assets/entertainment.png'
import housing from '../assets/housing.png'
import transpo from '../assets/transpo.png'
import medical from '../assets/medical.png'
import beauty from '../assets/beauty.png'

const icons = [food, clothes, housing, transpo, medical, beauty, edu, entertainment]

export default function ServiceType({ route, navigation }) {

  console.log("[TYPE] userID: " + route.params.userID)
  const [mainType, setMainType] = useState([]);

  const getMainType = async () => {
    const url = route.params.baseUrl + '/OrderType/GetMainType';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setMainType(responseData);
      })
      .catch((error) => {
        console.log('error  ' + error);
      })
  };

  useEffect(() => {
    getMainType();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>服務類別</Text>
          </View>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={home} style={styles.homeIcon}/>
        </TouchableOpacity>
      </View>
      <View style={{height: 5}}/>

      {/* index, type */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{
          width: Math.round(Dimensions.get('window').width), 
          // paddingHorizontal: 10,
        }}
      >
        {mainType.map((type, index) => {
          if(index % 2 === 0){
            return(
              <View 
                style={styles.view} 
                key={index+20}
              >
                <TouchableOpacity 
                  style={[styles.button, {backgroundColor: "#d2a24c"}]} 
                  onPress={() => navigation.navigate("ServiceList", {msg: mainType[index], userID: route.params.userID})}
                  key={index}
                >
                  <Text style={[styles.buttonText, {color: "#6f5643"}]}>{mainType[index]}</Text>
                  <Image source={icons[index]} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, {backgroundColor: "#d2a24c"}]} 
                  onPress={() => navigation.navigate("ServiceList", {msg: mainType[index + 1], userID: route.params.userID})}
                  key={index + 1}
                >
                  <Text style={[styles.buttonText, {color: "#6f5643"}]}>{mainType[index + 1]}</Text>
                  <Image source={icons[index + 1]} style={styles.icon}/>
                </TouchableOpacity>
              </View>
            )
          }
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
    justifyContent: "space-between",
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
  button: {
    paddingVertical: 15,
    alignSelf: "stretch",
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 10,
    width: 170,
  },
  buttonText: {
    fontSize: 40,
    fontFamily: "Avenir Next",
    marginLeft: 20,
    letterSpacing: 2,
    fontWeight: "600"
  },
  view: {
    flexDirection: "row", 
    alignSelf: "center",
    // justifyContent: "space-between", 
    // width: "100%"
    // ali
    // backgroundColor: "#000"
  },
  icon: {
    width: 70,
    height: 70,
    alignSelf: "flex-end",
    marginRight: 15,
  }
})