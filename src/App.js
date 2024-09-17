import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import StarwarsTriviaResult from './components/StarWarsTriviaResult';
import { useState } from 'react';
import StarwarsTriviaSearch from './components/StarWarsTriviaSearch';
import SearchDBResult from './components/SearchDBResult';

const SEARCH_PEOPLE = gql`
  query searchPeople($searchText: String!) {
    searchPeople(searchText: $searchText) {
      people {
        name
        films {
          title
          episodeId
          director
          producer
          releaseDate
        }
        vehicles {
          name
          model
          manufacturer
          costInCredits
          length
          maxAtmospheringSpeed
          crew
          passengers
          cargoCapacity
          consumables
          vehicleClass
        }
      }
    }
  }
`;

const SEARCH_PEOPLE_FROM_DB = gql`
  query searchPeopleFromDB($searchText: String!) {
    searchPeopleFromDB(searchText: $searchText) {
      people {
        name
        films {
          title
          episodeId
          director
          producer
          releaseDate
        }
        vehicles {
          name
          model
          manufacturer
          costInCredits
          length
          maxAtmospheringSpeed
          crew
          passengers
          cargoCapacity
          consumables
          vehicleClass
        }
      }
    }
  }
`;

function App() {
  const [searchText, setSearchText] = useState('');
  const [searchFromDB, setSearchFromDB] = useState(false);
  const [searchPeople, searchPeopleResult] = useLazyQuery(SEARCH_PEOPLE, {
    variables: { searchText },
    notifyOnNetworkStatusChange: false,
  });

  const [searchPeopleFromDB, searchPeopleFromDBResult] = useLazyQuery(SEARCH_PEOPLE_FROM_DB, {
    variables: { searchText },
    notifyOnNetworkStatusChange: false,
  });

  return (
    <div className='App'>
      <Container maxWidth='medium'>
        <h1>Star Wars Trivia Search</h1>
        <Grid container spacing={2}>
          <StarwarsTriviaSearch
            onBlur={(value) => {
              setSearchText(value);
            }}
          />
          <Button
            variant='contained'
            onClick={() => {
              setSearchFromDB(false);
              searchPeople();
            }}
          >
            Search From Star Wars API
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setSearchFromDB(true);
              searchPeopleFromDB();
            }}
          >
            Search From DB
          </Button>
        </Grid>
        <br />
        {searchPeopleResult?.loading || searchPeopleFromDBResult?.loading ? (
          <div>Loading ...</div>
        ) : searchFromDB ? (
          <div>
            <SearchDBResult searchPeopleResult={searchPeopleFromDBResult} />
          </div>
        ) : (
          <div>
            <StarwarsTriviaResult searchPeopleResult={searchPeopleResult} />
          </div>
        )}

        {searchPeopleResult?.error || searchPeopleFromDBResult?.error ? (
          <div>There is an error...</div>
        ) : (
          ''
        )}
      </Container>
    </div>
  );
}

export default App;
