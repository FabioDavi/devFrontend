import React, {useState, useEffect} from 'react'
import api from './services/api'

import './Global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

//importando o index.js abaixo (não pprecisa informar ... sempre pega o index.js primeito automaticamente)
import DevItem from './components/devItem'
import DevForm from './components/devForm'

function App() {
  const [devs, setDevs] = useState([]) 


  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    //antes de fechar.. .chamar esta função
    loadDevs()
  }, [] )


  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]);
    console.log(response.data)
  }


    return (
        //abaixo ilustra o uso de fragment e os componentes filhos
        <div id="app">
         <aside>
          <strong>
            Cadastrar
          </strong>
            <DevForm onSubmit={handleAddDev}/>
         </aside>

         <main>
          <ul>
            {devs.map(dev =>(
              //informando aqui .. cada div unico dentro do dev
              <DevItem key={dev._id} dev={dev} />  
            ))}
          </ul>
         </main>    
        </div>
      );
}

export default App;
