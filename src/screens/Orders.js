import React,{useEffect, useState,useContext} from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Context as OrderContext} from '../context/OrderContext'

const Orders = ({navigation}) =>{

    const [receivedOrders, setReceivedOrders] = useState(null)
    const [splash, setSplash] = useState(true)
    const { fetchBookings, state:{ Bookings }} = useContext(OrderContext)

    useEffect(()=>{
        navigation.addListener('focus', async ()=>{
            await fetchBookings()
        })
   },[])

   setTimeout(() => {
       setSplash(false)
   }, 2000);

    if(splash){
        return(
            <SafeAreaView style={{flex:1,alignItems:'center', justifyContent:'center',backgroundColor:'white'}} >
                <Text style={{fontSize:15,marginBottom:10}} >Fetching orders...</Text>
                <ActivityIndicator color='black' size='large'/>
            </SafeAreaView>
        )
    }
    return(
        <SafeAreaView style={{flex:1}} >
            {
                Bookings !== null
                ?
                Bookings.map(order =>{
                    return(
                        <TouchableOpacity key={order.id} onPress={() => navigation.navigate('OrderDetail', {id:order.id, status:"booked"})} >
                            <View style={{
                                    height:80,backgroundColor:'aliceblue',margin:5,
                                    borderRadius:5,
                                    elevation: 10,
                                    }} >
                                <Text style={{marginLeft:10,marginTop:10,fontSize:20}}>{order.service_name} </Text>
                                <Text style={{marginLeft:10,marginTop:10,fontSize:13}}> Scheduled on: {order.scheduled_time} </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                :
                <View style={{flex:1,alignItems:'center', justifyContent:'center'}} >
                    <Text>You have no orders</Text>
                </View>
            }
        </SafeAreaView>
    )
}

export default Orders