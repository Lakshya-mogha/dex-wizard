"use client"
const FetchCachedData = (name:string) => {
    const CachedData = localStorage.getItem(name);
    if(CachedData){
        return {
            props:{
                data: CachedData
            }
        };
    }
    else{
        return {
            props:{
                data: "null"
            }
        };
    }

}

export default FetchCachedData;