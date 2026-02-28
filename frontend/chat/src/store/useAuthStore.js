import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'


export const useAuthStore = create((set) =>({
    authUser:null,
    isCheckinghAuth:true,
    isSiginingUp:false,
    isLoggingin:false,

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
    },

    login:async (data) =>{
        set({isLoggingin:true})
        try {
            const res = await axiosInstance.get("/auth/login",data)
            set({authUser:res.data})
            toast.success("you are logged in")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingin:false})
        }
    },

    logout:async () =>{
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("logged out successfully")
        } catch (error) {
            console.log("error in loggin out",error)
            toast.error("error in logging out")
        }
    }
}))