import {useState, useEffect} from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        async function dataFetch(){
            const request = await fetch(url)
            const json = await request.json()
            setData(json)
        }
        dataFetch()
    }, [url])
    return {data}
}

