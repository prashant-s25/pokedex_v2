import * as React from 'react';
import './card.css'
const getTableData=(data)=>{
    return(
      <table border={1} >
<tbody>
{Object.keys(data).map(ele=>{
        return(
          <tr key={`ele_${ele}`}>
          <th>
            {ele}
          </th>
          <td>{typeof data[ele] === 'object'?getTableData(data[ele]):data[ele]}</td>
        </tr>
        )
        })}
</tbody>
      </table>
      
    )
}
export const PokemonCard: React.FC<any> = ({ pokemonData }) => {
  if (!pokemonData?.name) return <div data-testid='details-not-found'>Page not found</div>;
  return (
  <div className='container' data-testid="poke-details">
{getTableData(pokemonData)}
  </div>
    );
};
