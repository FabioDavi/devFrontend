
import React, {useState, useEffect} from 'react'

function DevForm({onSubmit}){


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


    async function HandleSubmit(e){
        e.preventDefatult()
        await onSubmit(
            {
                github_username, 
                techs,
                latitude, 
                longitude
              }
        );
        //esvaziar os campos após inclusão
        setgitHub_uname('')
        settechs('')
    }
    

    return(

        <form onSubmit={HandleSubmit}>
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

    )

}

export default DevForm