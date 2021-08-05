import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider as OrderProvider} from './src/context/OrderContext'
import Orders from './src/screens/Orders'
import Profile from './src/screens/Profile'
import Jobs from './src/screens/Jobs'
import OrderDetail from './src/screens/OrderDetail'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import MyJobs from './src/screens/MyJobs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


const JobsTopTab = () =>{
  return(
    <TopTab.Navigator>
      <TopTab.Screen name='MyJobs' component={MyJobs} options={{
        tabBarLabel: 'Notifications'
      }} />
      <TopTab.Screen name='OpenJobs' component={Jobs} options={{
        tabBarLabel: 'Open Jobs'
      }} />
    </TopTab.Navigator>
  )
}

const OrderTab = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name='Orders' component={Orders}/>
      <Stack.Screen name='OrderDetail' component={OrderDetail}/>
    </Stack.Navigator>
  )
}

const ProfileTab = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={Profile}/>
    </Stack.Navigator>
  )
}

const JobTab = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name='Jobs' component={JobsTopTab}/>
    </Stack.Navigator>    
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Orders" component={OrderTab} options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="mail" color={color} size={size} />
          )
        }}  />
        <Tab.Screen name="Profile" component={ProfileTab} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-profile" color={color} size={size} />
          )
        }}  />
        <Tab.Screen name="Jobs around You" component={JobTab} options={{
          tabBarLabel: 'Jobs around You',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="network" color={color} size={size} />
          )
        }}  /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default ()=>{
  return(
    <OrderProvider>
      <App/>
    </OrderProvider>
  )
}