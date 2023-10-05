import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
  color: #FFF;
  font-family: Arial, Helvetica, sans-serif;
`;
const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: bold;
  }
`;
const Precio = styled.p`
  font-size: 30px;
  span{
    font-weight: bold;
  }
`;


const Cotizacion = ({resultado}) => {

  if (Object.keys(resultado).length === 0) return null;
  console.log(resultado)

  return ( 
    <ResultadoDiv>
      <Precio>The price is: <span>{resultado.PRICE}</span></Precio>
      <Info>The highest price of the day is: <span>{resultado.HIGHDAY}</span></Info>
      <Info>The lowest price of the day is: <span>{resultado.LOWDAY}</span></Info>
      <Info>The variation of the last 24 hours is: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
      <Info>The last update: <span>{resultado.LASTUPDATE}</span></Info>
    </ResultadoDiv>

   );
}
 
export default Cotizacion;