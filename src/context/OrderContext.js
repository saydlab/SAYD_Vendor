import createDataContext from './createDataContext'
import baseURL from '../api/baseUrl'

const orderReducer = (state,action) =>{
    switch (action.type){
        case 'fetch_bookings':
            return {...state,Bookings:action.payload}
        case 'fetch_open_bookings':
            return {...state,OpenBookings:action.payload}
        case 'my_bookings':
            return {...state,MyBookings:action.payload}
        default:
            return {...state}
    }
}

const fetchBookings = dispatch => async () =>{
    try{
        let partnerId = "b68581ab-f72c-49bc-aeaa-102c27d58e5d"
        let response = await baseURL.get(`/bookings/${partnerId}`)
            if(response.data.length>0){
                await dispatch({type: 'fetch_bookings', payload: response.data})
            }  

        }catch(error){
        console.log("Error on fetch orders", error)
    }
}

const fetchOpenBookings = dispatch => async (serviceLocation) =>{
    try{
        let response = await baseURL.post('/open-bookings',{serviceLocation})
            if(response.data.length>0){
                dispatch({type: 'fetch_open_bookings', payload: response.data})
            }  

        }catch(error){
        console.log("Error on fetch orders", error)
    }
}

const fetchMyBookings = dispatch => async () =>{
    try {
        let partnerId = 'b68581ab-f72c-49bc-aeaa-102c27d58e5d'
        const response = await baseURL.get(`/my-bookings/${partnerId}`)
        console.log("Mybooking", response.data)
        if(response.data.length>0){
            dispatch({type:'my_bookings', payload: response.data})
        }else{
            dispatch({type:'my_bookings', payload: null})
        }
    } catch (error) {
        console.error("Fetch my bookings", error)
    }
}

const updateBooking = dispatch => async (orderId) =>{
    try {
        console.log("Orderid", orderId)
        let response = await baseURL.get(`/confirm-my-booking/${orderId}`)
        // console.log(response)
    } catch (error) {
        console.log("Error in updating order", error)
    }
}

export const { Context, Provider } = createDataContext(
    orderReducer,
    {
        fetchBookings, updateBooking, fetchOpenBookings, fetchMyBookings
    },
    {
        Bookings:null, OpenBookings:null, MyBookings:null
    }
)