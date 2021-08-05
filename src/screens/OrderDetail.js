import React,{useEffect, useContext, useState} from 'react'
import { View, Text } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import {Context as OrderContext} from '../context/OrderContext'


const OrderDetail = ({navigation,route}) =>{

    const {updateBooking} = useContext(OrderContext)
    const [visible, setVisible] = useState(false)
    let status = route.params.status

    console.log(route.params)

    // useEffect(()=>{
    //      navigation.addListener('focus', async ()=>{
    //          const response = await axios.get('http://23306e4958fe.ngrok.io/service-vendor')
    //          console.log(response)
    //      })
    // })

    const confirmOrder = () =>{
        updateBooking(route.params.id)
        setVisible(true)
        setTimeout(() => {
            navigation.navigation('Orders')
        }, 2000)
    }

    return(
        <View style={{flex:1}} >
            <View>
                <Text style={{margin:5, fontWeight:'bold', fontSize:22}}>Booking details</Text>
                <Text style={{margin:5, fontWeight:'bold', fontSize:20}} >Stress relief head massage</Text>
                <Text style={{marginLeft:10, fontSize:13, marginBottom:5}} >{'\u20B9'} 1,200</Text>
                <Text style={{marginLeft:10, fontSize:17, marginBottom:5}}>Scheduled on:</Text>
                <Text style={{marginLeft:25}} >Date: 2021-07-15 </Text>
                <Text style={{marginLeft:25}}>Time: 12 - 13 hrs</Text>
            </View>
            {
                status=='booked'
                ?
                <Button title='Cancel Booking' type='clear' titleStyle={{color:'red'}} containerStyle={{position:'absolute',bottom:0,width:'100%'}} onPress={confirmOrder} />
                :
                <Button title='Confirm Booking' containerStyle={{position:'absolute',bottom:0,width:'100%'}} onPress={confirmOrder} />

            }
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={{padding:50, width:300,height:150}} >
                <>
                <Text style={{marginTop:10, alignSelf:'center', fontSize:18}} >{'\u2705'}  Booking confirmed </Text>
                </>
            </Overlay>
        </View>
    )
}

export default OrderDetail