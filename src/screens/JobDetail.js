import React, { useContext, useEffect, useState } from 'react'
import {View, Text, ActivityIndicator,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Context as OrderContext} from '../context/OrderContext'
import {getDateFromTimestamp} from '../components/getDate'

const Jobs = ({navigation, route}) =>{

    const { fetchServiceDetails, state:{ ServiceDetails } } = useContext(OrderContext)
    const [splash, setSplash] = useState(true)
    const {serviceId} = route.params

    useEffect(()=>{
        navigation.addListener('focus',async () =>{
            await fetchOpenBookings(serviceId)
        })
    },[navigation])

    setTimeout(() => {
        setSplash(false)
    }, 2000);

    if(splash){
        return(
            <SafeAreaView style={{flex:1,alignItems:'center', justifyContent:'center',backgroundColor:'white'}} >
                <Text style={{fontSize:15,marginBottom:10}} >Fetching job details...</Text>
                <ActivityIndicator color='black' size='large'/>
            </SafeAreaView>
        )
    }

    return(
        <SafeAreaView style={{flex:1}} >
            <View style={{
                    height:80,backgroundColor:'aliceblue',margin:5,
                    borderRadius:5,
                    elevation: 10,
                    }} >
                <Text style={{marginLeft:10,marginTop:10,fontSize:20}}>{ServiceDetails.service_name} </Text>
                <Text style={{marginLeft:10,marginTop:10,fontSize:14}}>Service location: {ServiceDetails.service_location} </Text>
            </View>
        </SafeAreaView>
    )
}

export default Jobs