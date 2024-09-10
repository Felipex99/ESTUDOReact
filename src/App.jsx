import { useState,useEffect } from 'react'
import './App.css'

const url = "http://localhost:3000/produtos"

function App() {
  const [produtos, setProdutos] = useState([])
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState(0)
  //2 - ADICIONANDO PRODUTOS
  const handleSubmit = async (e) => {
    const prod = {
      nome,
      preco
    }

    const res = await fetch(url,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prod)
    })
  }

  useEffect(() => {
    async function fetchData(){
      const link = await fetch(url)
      const prods = await link.json()
      setProdutos(prods)
      console.log(prods)
    }
    fetchData()
  },[])
  return (
    <div className='App'>
      <h1>LISTA DE PRODUTOS</h1>
      <ul>
        {produtos.map((prod)=>(
          <li key={prod.id}> {prod.nome} - {prod.preco}</li>
        )
        )}
      </ul>

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Digite o nome do produto</span>
            <input 
              type="text" 
              placeholder="Nome produto" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}/>
          </label>
          <label>
            <span>Digite o preço do produto</span>
            <input 
              type="number" 
              placeholder='Preço do produto' 
              min={0} 
              value={preco}
              onChange={(e)=>setPreco(e.target.value)}/>
          </label>
          <input type="submit"  value="Enviar"/>
        </form>
      </div>
    </div>
  )
}

export default App