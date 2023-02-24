import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonData } from '../store/pokedexSlice';
import { pokemonState, setCurrentPage } from '../store/pokedexSlice';
import {  AppStore, wrapper } from '../store/store';

const Index = () => {
  const {pokemonList, pokemonCount, currentPage} = useSelector(pokemonState);
  const dispatch = useDispatch() as any;

  const CustomPagination = () => {
    return (
      <Pagination
      data-testid='pagination'
        color='primary'
        count={Math.ceil(pokemonCount/20)}
        page={currentPage}
        onChange={(e,p) => {
          dispatch(fetchPokemonData(p));
        }}
      />
    );
  };
  const onRowClick = (row: any) => {
    Router.push(`/pokemon/${row.row.name}`);
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Pokemon Name', width: 500 },
    { field: 'url', headerName: 'URL', width: 500 },
  ];
  return (
    <div className='titleWrapper'>
      <div className='textStyle'>Welcome to pokedex</div>
      <div style={{ height: 800, width: '100%' }}  data-testid='datagrid'>
        <DataGrid
          disableSelectionOnClick
          rows={pokemonList[`page${currentPage}`]}
          columns={columns}
          getRowId={(row) => row.name}
          pageSize={20}
          rowCount={pokemonCount}
          onRowClick={(row: any) => onRowClick(row)}
          components={{
            Footer: CustomPagination,
          }}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) =>
    async ({}) => {
      await store.dispatch<any>(fetchPokemonData(1));
      return {
        props: {},
      };
    }
);

export default Index;
