import * as React from 'react';
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import Index from '../src/pages'
import Pokemon from '../src/pages/[name]'

const mock_store = {
  pokedex:{
    pokemonList: {
        page1: [
            {
                "name": "blastoise",
                "url": "https://pokeapi.co/api/v2/pokemon/9/"
            },
            {
                "name": "caterpie",
                "url": "https://pokeapi.co/api/v2/pokemon/10/"
            },
            {
                "name": "metapod",
                "url": "https://pokeapi.co/api/v2/pokemon/11/"
            },
            {
                "name": "butterfree",
                "url": "https://pokeapi.co/api/v2/pokemon/12/"
            },
            {
                "name": "weedle",
                "url": "https://pokeapi.co/api/v2/pokemon/13/"
            },
            {
                "name": "kakuna",
                "url": "https://pokeapi.co/api/v2/pokemon/14/"
            },
            {
                "name": "beedrill",
                "url": "https://pokeapi.co/api/v2/pokemon/15/"
            },
            {
                "name": "pidgey",
                "url": "https://pokeapi.co/api/v2/pokemon/16/"
            },
            {
                "name": "pidgeotto",
                "url": "https://pokeapi.co/api/v2/pokemon/17/"
            },
            {
                "name": "pidgeot",
                "url": "https://pokeapi.co/api/v2/pokemon/18/"
            },
            {
                "name": "rattata",
                "url": "https://pokeapi.co/api/v2/pokemon/19/"
            },
            {
                "name": "raticate",
                "url": "https://pokeapi.co/api/v2/pokemon/20/"
            }
        ]
    },
    pokemonCount: 1279,
    currentPage: 1
},
pokedexName: {
    "name": "charmander",
    "abilities": "blaze, solar-power",
    "height": 6,
    "stats": {
        "hp": 39,
        "attack": 52,
        "defense": 43,
        "special-attack": 60,
        "special-defense": 50,
        "speed": 65
    },
    "types": "fire",
    "weight": 85
}
}
const mockStore = configureStore([thunk]);



describe("pokedex-test-cases", () => {
  const store = mockStore(mock_store);
  it("renders the list successfully", () => {
    render(
    <Provider store={store}>
     <Index/>
    </Provider>
    );
    expect(screen.getByTestId("datagrid")).toBeInTheDocument();
  });

  it("renders pagination successfully", () => {
    render( 
    <Provider store={store}>
     <Index/>
    </Provider>
    );
     expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
describe("Component-test-cases", () => {
  
  it("renders the pokemonDetail page successfully", () => {
    const store = mockStore(mock_store);
    render(
    <Provider store={store}>
     <Pokemon/>
    </Provider>
    );
    expect(screen.getByTestId("poke-details")).toBeInTheDocument();
  });
});
