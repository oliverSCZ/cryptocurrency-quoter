import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';

import axios from 'axios';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size:  20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius:  10px;
  color: #FFFFFF;

  &hover {
    background-color: #326AC0;
    cursor: pointer;
  }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {


// state del listado de criptomonedas
const [listacripto, guardarCriptomonedas] = useState([]);
const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    { codigo: 'MXN', nombre: 'Peso Mexicano'},
    { codigo: 'EUR', nombre: 'Euro'},
    { codigo: 'BOL', nombre: 'Peso Boliviano'},

  ]

  // utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda('Choose your currency','',MONEDAS);

  // utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda('Choose your criptocurrency', '', listacripto);

   // ejecutar llamado a la API 
  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url)
      guardarCriptomonedas(resultado.data.Data)
    }

    consultarAPI();
  }, [])
  
  // cuando el usuario hace submit

  const cotizarMoneda = e => {
    e.preventDefault();
    
    // validar si ambos campos estan llenos

    if ( moneda === '' || criptomoneda === '' ) {
        guardarError(true);
        return;
    }
    //pasar los datos al componente general
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda); 
  }

  return (
    <form
      onSubmit={cotizarMoneda}
    >
      {error? <Error mensaje= "All fields are required"/>: null}
      <SelectMonedas />
      <SelectCripto />

      <Boton
        type='submit'
        value="Calculate"
      />
    </form>
    );
}
 
export default Formulario;