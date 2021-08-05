import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Context as OrderContext} from '../context/OrderContext'


const MyJobs = ({navigation}) =>{

    const { fetchMyBookings, state:{ MyBookings } } = useContext(OrderContext)
    const [splash, setSplash] = useState(true)

    useEffect(() =>{
        navigation.addListener('focus', async ()=>{
            await fetchMyBookings()
        })
    })

    setTimeout(() => {
        setSplash(false)
    }, 2000);

    if(splash){
        return(
            <SafeAreaView style={{flex:1,alignItems:'center', justifyContent:'center',backgroundColor:'white'}} >
                <Text style={{fontSize:15,marginBottom:10}} >Fetching...</Text>
                <ActivityIndicator color='black' size='large'/>
            </SafeAreaView>
        )
    }

    return(
        <SafeAreaView style={{flex:1}} >
            {
                MyBookings !== null
                ?
                MyBookings.map(job =>{
                    return(
                        <TouchableOpacity key={job.id} onPress={() => navigation.navigate('OrderDetail', {id:job.id, status:"NotBooked"})} >
                            <View style={{
                                    height:80,backgroundColor:'aliceblue',margin:5,
                                    borderRadius:5,
                                    elevation: 10,
                                    }} >
                                <Text style={{marginLeft:10,marginTop:10,fontSize:20}}>{job.service_name} </Text>
                                <Text style={{marginLeft:10,marginTop:10,fontSize:14}}>On: {job.service_date}, 12 - 13 hrs </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                :
                <View style={{flex:1,alignItems:'center', justifyContent:'center'}} >
                    <Text>Oops! there are no jobs for you now</Text>
                </View>
            }
        </SafeAreaView>
    )
}

export default MyJobs