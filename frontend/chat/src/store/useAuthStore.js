import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) =>({
    authUser:null,
    isCheckinghAuth:true,
    isSiginingUp:false,

    checkAuth:async () =>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
        } catch (error) {
            console.log("error in checkauth",error)
        }
        finally{
            set({isCheckinghAuth:false})
        }
    },

    signup:async (data)=>{
        set({isSiginingUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("account is created")
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSiginingUp:false})
        }
    }
}))