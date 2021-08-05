import React, { useContext, useEffect, useState } from 'react'
import {View, Text, ActivityIndicator,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Context as OrderContext} from '../context/OrderContext'
import {getDateFromTimestamp} from '../components/getDate'

const Jobs = ({navigation}) =>{

    const { fetchOpenBookings, state:{ OpenBookings } } = useContext(OrderContext)
    const [splash, setSplash] = useState(true)
    const [openBookings, setOpenBookings] = useState(null)

    useEffect(()=>{
        navigation.addListener('focus',async () =>{
            await fetchOpenBookings("Chennai")
        })
    },[navigation])

    setTimeout(() => {
        setSplash(false)
    }, 2000);

    if(splash){
        return(
            <SafeAreaView style={{flex:1,alignItems:'center', justifyContent:'center',backgroundColor:'white'}} >
                <Text style={{fontSize:15,marginBottom:10}} >Fetching jobs around you...</Text>
                <ActivityIndicator color='black' size='large'/>
            </SafeAreaView>
        )
    }

    return(
        <SafeAreaView style={{flex:1}} >
            {
                OpenBookings !== null
                ?
                OpenBookings.map(job =>{
                    return(
                        <TouchableOpacity key={job.id} onPress={() => navigation.navigate('OrderDetail', job.id)} >
                            <View style={{
                                    height:80,backgroundColor:'aliceblue',margin:5,
                                    borderRadius:5,
                                    elevation: 10,
                                    }} >
                                <Text style={{marginLeft:10,marginTop:10,fontSize:20}}>{job.service_name} </Text>
                                <Text style={{marginLeft:10,marginTop:10,fontSize:14}}>Service location: {job.service_location} </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                :
                <View style={{flex:1,alignItems:'center', justifyContent:'center'}} >
                    <Text>Oops! there are no jobs around you now</Text>
                </View>
            }
        </SafeAreaView>
    )
}

export default Jobs