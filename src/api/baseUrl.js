import axios from 'axios'

const instance = axios.create({
    baseURL: "https://ik8e6ohu47.execute-api.ap-south-1.amazonaws.com/dev",
})

export default instance