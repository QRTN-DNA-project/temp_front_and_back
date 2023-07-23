import React, { useState,useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Button, Linking } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import CustomButton from './CustomButton';

//Test
import { DataStore } from '@aws-amplify/datastore';
import { TEST } from './models';
import { MEMBER }from './models';
import { EMERGENCY } from './models';
//Test/

const screenWidth = Dimensions.get("window").width;
import {LineChart,
  PieChart,
  StackedBarChart} from "react-native-chart-kit";

const lineChartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 11,
  useShadowColorFromDataset: true,
};
const stackedBarChartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const pieChartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const data = {
  labels: ["7", "6", "5", "4", "3", "2", "1", "5/20"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 54],
      color: (opacity = 1) => `rgba(249, 161, 74,${opacity})` ,
      strokeWidth: 2 // optional
    },
    {
      data: [66, 44, 11, 22, 33, 39, 12],
      color: (opacity = 1) => `rgba(250, 105, 136,${opacity})`,
      strokeWidth: 2 // optional
    },
    {
      data: [66, 44, 11, 22, 33, 44, 44],
      color: (opacity = 1) => `rgba(47, 185, 105,${opacity})`,
      strokeWidth: 2 // optional
    },
    {
      data: [55, 22, 33, 44, 55, 66, 77],
      color: (opacity = 1) => `rgba(127, 186, 226,${opacity})`,
      strokeWidth: 2 // optional
    },

  ],
  legend: ["one", "two", "three", "four"] // optional
};
const data2 = {
  labels: ["Test1", "Test2", "Test3"],
  legend: ["one", "two", "three", "four"],
  data: [
    [60, 60, 60, 10],
    [30, 30, 60, 0],
    [30, 30, 60, 40]
  ],
  barColors: ["#F9A14A", "#FA6988", "#2FB969", "#7FBAE2"]
};
const data3 = [
  {
    name: "one",
    number: 15,
    color: "#F9A14A",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "two",
    number: 28,
    color: "#FA6988",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "three",
    number: 52,
    color: "#2FB969",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "four",
    number: 85,
    color: "#7FBAE2",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },

];


const Profile = ({ route }) => {

  //get params
  // const {MEMBER} = route.params;
  const {id, name, address, sex, age, feature, number, current } = route.params["MEMBER"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const Tab = createBottomTabNavigator();


  const handleModify = () => {
    // handle Profile Modification button press
    Alert.alert('Info modification Button Pressed', 'You pressed the button!');
  };

  const handlePhoneCall = () => {
    // handle PhoneCall button press
    Alert.alert('Phone Call Button Pressed', 'You pressed the button!');
  };

  const handleReport = () => {
    // handle Report button press
    Alert.alert('Report Button Pressed', 'You pressed the button!');
  };

  const [displayImage, setDisplayImage] = useState(false);

  async function OnQuery(id) {
    try {
      const members = await DataStore.query( MEMBER, c => c.id.eq(id));
      if (members && members.length > 0) {
        const member = members[0];
        console.log(member);
        return member.current;
      }
      console.log('id로 찾을 수 있는 member 없음');
      return null; // 해당 id와 일치하는 멤버가 없을 경우 null 반환
    }catch (error) {
      console.log(error);
      return null;
    }
  };

  const DisplayStatus = async(id, setDisplayImage) => {
    const number = await OnQuery(id);
    if(!number)number=0;

    let imageSource;
  if (number === 1) {
    imageSource = require('../assets/walking.png');
  } else if (number === 2) {
    imageSource = require('../assets/toilet.png');
  } else if (number === 3) {
    imageSource = require('../assets/shower.png');
  } else {
    imageSource = null;
  }

  setDisplayImage(imageSource);

  };

  return (
    //navigation
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.content}>
        <View style ={styles.title}>
          <Image source={require('../assets/icon.png')} style={styles.profileImg} />
          <Text style={styles.name}>{name}</Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.info}>Address: {address}</Text>
          <Text style={styles.info}>Phone: {number}</Text>
          <Text style={styles.info}>Sex: {sex}</Text>
          <Text style={styles.info}>Age: {age}</Text>
          <Text style={styles.info}>Condition: {feature}</Text>
          <CustomButton
          buttonColor = {'#3b8686'}
          title={'current status'}
          onPress={() => DisplayStatus(id, setDisplayImage)}
        />

        {displayImage && displayImage !== null && (
          <View>
            <Image source={displayImage} style={styles.statusImg} />
          </View>
        )}
        </View>

        <SegmentedControlTab
          values={['First', 'Second', 'Third']}
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
          tabsContainerStyle={styles.segmentedControl}
        />
        {selectedIndex === 0 && (
          <View style={styles.graphContainer}>
          <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={lineChartConfig}
          />
          </View>
        )}

        {selectedIndex === 1 && (
          <View style={styles.graphContainer}>
          <StackedBarChart
          data={data2}
          width={screenWidth-10}
          height={220}
          chartConfig={stackedBarChartConfig}
          />
          </View>
        )}

        {selectedIndex === 2 && (
          <View style={styles.graphContainer}>
          <PieChart
          data={data3}
          width={screenWidth}
          height={220}
          chartConfig={pieChartConfig}
          accessor={"number"}
          backgroundColor={"transparent"}
          paddingLeft = "20"
          absolute
          />
          </View>
        )}
      </View>

      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${number}`)}}>
          <Text>Phone Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{Linking.openURL(`sms:01000000000`)}}>
          <Text>Report to 119</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarItem: {
    fontSize: 16,
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 20,

  },
  name: {
    flex: 1,
    paddingTop: 25,
    paddingLeft: 20,
    fontSize: 30,
  },
  userInfo: {
    flex: 0.5,
    marginBottom: 50,
    alignSelf: 'flex-start', //부모 컴포넌트의 align영향을 받지 않음
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 20,
  },
  info: {
    fontSize: 18,
  },
  profileImg: {
    width: 100,
    height: 100,
  },
  statusImg: {
    width: 300,
    height: 150,
    alignItems: 'center',
  },
  segmentedControl: {
    width: '90%',
    marginBottom: 20,
  },
  tabBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  callButton:{
    fontSize:20,
  },
  justText:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  graphContainer: {
    flex: 1,
    alignItems : 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});

export default Profile;