import {useState, useEffect} from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)

    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)
    const [item, setItem] = useState(null)
    const httpConfig = (data, method) =>{
        if(method==="POST"){
            setConfig({
                method,
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }
    }

    useEffect(()=>{
        async function dataFetch(){
            const request = await fetch(url)
            const json = await request.json()
            setData(json)
        }
        dataFetch()
    }, [url, callFetch])

    useEffect(()=>{
        async function methods(){
            if(method==="POST"){
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                setItem(res)
            }
        }
        methods()
    },[config,method,url])

    useEffect(() => {
        if (item) {
            setData((prevData) => [...prevData, item]); // Atualiza o estado com o novo item
        }
    }, [item]);

    return {data, httpConfig}
}

