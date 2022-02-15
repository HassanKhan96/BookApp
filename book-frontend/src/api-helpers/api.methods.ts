import axios, { Axios, AxiosResponse } from "axios"


export const post = async (url: string, args: any): Promise<AxiosResponse | undefined> => {
    try{
        const result = await axios.post(url, args);
        return result;
    }
    catch(error){
        console.log(error)
    }
}

export const get = async (url: string): Promise<AxiosResponse | undefined> => {
    try{
        const result = await axios.get(url);
        return result;
    }
    catch(error){
        console.log(error)
    }
}