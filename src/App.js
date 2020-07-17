import React, {useState, useEffect} from 'react'
import api from './services/api'

import './Global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

//importando o index.js abaixo (não pprecisa informar ... sempre pega o index.js primeito automaticamente)
import DevItem from './components/devItem'



function App() {
  const [devs, setDevs] = useState([])

  //abaixo estou crindo estados (olhar no imsonia,,, os nomes de parametros precisam ser iguais)
  const [github_username, setgitHub_uname] = useState('')
  const [techs, settechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords
        
        setLatitude(latitude)
        setLongitude(longitude)

      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000,
      }
    )
  }, [])


  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    //antes de fechar.. .chamar esta função
    loadDevs()
  }, [] )


  async function handleAddDev(e){
    e.preventDefault()

    const response = await api.post('/devs', {
      github_username, 
      techs,
      latitude, 
      longitude
    })

    //esvaziar os campos após inclusão
    setgitHub_uname('')
    settechs('')

    setDevs([...devs, response.data]);

  }


    return (
        //abaixo ilustra o uso de fragment e os componentes filhos
        <div id="app">
         <aside>
          <strong>
            Cadastrar
          </strong>
          <form onSubmit={handleAddDev}>
            <div className="input-block">
              <label htmlFor="github_username">Usuário do GitHub</label>
              <input 
                      name="github_username" 
                      id="github_username" 
                      required
                      value={github_username}
                      onChange={e => setgitHub_uname(e.target.value)}
                      ></input>
            </div>

            <div className="input-block">
              <label htmlFor="techs">Techsnso</label>
              <input 
                      name="techs" 
                      id="techs" 
                      required
                      value={techs}
                      onChange={e => settechs(e.target.value)}
              ></input>
            </div>

            <div className="input-group">
              <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input onChange={e => setLatitude(e.target.value)} type="number" value={latitude} name="latitude" id="latitude" required></input>
              </div>
              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input onChange={e => setLongitude(e.target.value)} type="number" value={longitude} name="longitude" id="longitude" required></input>
              </div>
            </div>

            <button type="submit">Salvar</button>
            
          </form>
         </aside>

         <main>
          <ul>
          {devs.map(dev =>(

      
            <DevItem key={dev._id} dev={dev} />
           

          ))}



            

          </ul>

         </main>
    
        </div>
      );

}

export default App;
