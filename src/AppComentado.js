import React, {useState} from 'react';

import Header from './Header'

/*
    3 conceitos principais do react (estes 3 conceitos montam tudo do react)
    COMPONENTE: bloco isolado de html css js que não interfere no restante da aplicação

    ESTADO: informações mantidas pelo componente ex abaixo na variavel counter (usestate) 
            lembrar do conceito IMUTABILIDADE
    
    PROPRIEDADE: informações que o componente PAI passa para os componentes FILHO 
*/

//tb chamado de JSX   união do javascript com html

//componente é uma função que retorna um conteudo html, css ,,, conteudo js
//a regra do react é ter somente 1 componente/função por arquivo
function AppComentado() {

  //exemplo do uso do estado
  let [counter, setcounter] = useState(0)

//no react, toda função que for pp de um componente precisa ser criada dentro do pp componente, ex abaixo
function increment(){
  setcounter(counter+1)
}

  return (
    //abaixo ilustra o uso de fragment e os componentes filhos
    <>
      <Header title="Dashboard"/>
      <Header title="Dashboard2"/>
      <Header title="Dashboard3s"/>

    <h1>Contador = 0</h1>
  <button onClick={increment}>contador {counter}</button>

    </>
  );
}


export default App;
