import * as React from 'react';
import { PokemonCard } from "components";
import { GetStaticPaths } from "next";
import { useSelector } from "react-redux";
import { fetchRequest } from "utils";
import {
  fetchDetailsName,
  pokemonDetailsState,
} from "../../store/pokedexDetailsSlice";
import { PokemonData } from "../../store/pokedexSlice";
import { wrapper } from "../../store/store";

const Pokemon: React.FC<any> = () => {
  const data = useSelector(pokemonDetailsState);
  return <div>{!!data && <PokemonCard pokemonData={data} />}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetchRequest(0, 20);
  const paths = response.results.map((pokemon: PokemonData) => ({
    params: {name: pokemon.name},
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
  const data: any = await store.dispatch<any>(
    fetchDetailsName(context?.params?.name as string)
  );

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }
  return {
    props: {},
  };
});

export default Pokemon;
