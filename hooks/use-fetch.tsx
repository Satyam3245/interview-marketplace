"use client"

import { useState } from "react"
import { toast } from "sonner";

const useFetch = (cb:any)=>{
    const [data,setData] = useState(undefined);
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<Error | null>(null);
    const fn = async (...args:any)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await cb(...args);
            setData(response);
        } catch (error:any) {
            const errorMessage = error?.message;
            setError(error);
            toast.error(errorMessage);    
        }finally{
            setLoading(false)
        }
    }
    return {data,loading,error,fn,setData};    
}

export default useFetch;