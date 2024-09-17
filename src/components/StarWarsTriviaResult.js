import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const SAVE_SEARCH_RESULT = gql`
  mutation saveSearchResult($searchResultInput: SearchResultInput!) {
    saveSearchResult(searchResultInput: $searchResultInput) {
      people {
        name
        height
        mass
        gender

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function StarwarsTriviaResult({ searchPeopleResult }) {
  const [saveSearchResult, { data, loading, error }] = useMutation(SAVE_SEARCH_RESULT);

  if (
    searchPeopleResult?.data?.searchPeople?.people === undefined ||
    searchPeopleResult?.data?.searchPeople?.people.length == 0
  ) {
    return <div>No Data</div>;
  } else {
    return (
      <div>
        <Button
          variant='contained'
          onClick={(value) => {
            saveSearchResult({
              variables: { searchResultInput: searchPeopleResult?.data?.searchPeople },
            });
          }}
        >
          SAVE RESULT
        </Button>
        &nbsp;&nbsp;{loading ? 'Saving...' : ''}
        &nbsp;&nbsp;{data ? 'Saved' : ''}
        {searchPeopleResult?.data?.searchPeople?.people.map((people) => (
          <div>
            <h1>{people.name}</h1>
            <h2>Films</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell align='center'>Episode Id</StyledTableCell>
                    <StyledTableCell align='left'>Director</StyledTableCell>
                    <StyledTableCell align='left'>Producer</StyledTableCell>
                    <StyledTableCell align='center'>Release&nbsp;Date</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {people.films.map((film) => (
                    <StyledTableRow
                      key={film.title}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component='th' scope='row'>
                        {film.title}
                      </StyledTableCell>
                      <StyledTableCell align='center'>{film.episodeId}</StyledTableCell>
                      <StyledTableCell align='left'>{film.director}</StyledTableCell>
                      <StyledTableCell align='left'>{film.producer}</StyledTableCell>
                      <StyledTableCell align='center'>{film.releaseDate}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <h2>Vehicles</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align='left'>Name</StyledTableCell>
                    <StyledTableCell align='left'>Model</StyledTableCell>
                    <StyledTableCell align='left'>Manufacturer</StyledTableCell>
                    <StyledTableCell align='center'>Cost&nbsp;in&nbsp;Credits</StyledTableCell>
                    <StyledTableCell align='center'>Length</StyledTableCell>
                    <StyledTableCell align='center'>
                      Max&nbsp;Atmosphering&nbsp;Speed
                    </StyledTableCell>
                    <StyledTableCell align='center'>Crew</StyledTableCell>
                    <StyledTableCell align='center'>Passengers</StyledTableCell>
                    <StyledTableCell align='center'>Cargo&nbsp;Capacity</StyledTableCell>
                    <StyledTableCell align='center'>Consumables</StyledTableCell>
                    <StyledTableCell align='left'>Vehicle&nbsp;Class</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {people.vehicles.map((vehicle) => (
                    <StyledTableRow key={vehicle.name}>
                      <StyledTableCell
                        component='th'
                        scope='row'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        {vehicle.name}
                      </StyledTableCell>
                      <StyledTableCell align='left'>{vehicle.model}</StyledTableCell>
                      <StyledTableCell align='left'>{vehicle.manufacturer}</StyledTableCell>
                      <StyledTableCell align='center'>{vehicle.costInCredits}</StyledTableCell>
                      <StyledTableCell align='center'>{vehicle.length}</StyledTableCell>
                      <StyledTableCell align='center'>
                        {vehicle.maxAtmospheringSpeed}
                      </StyledTableCell>
                      <StyledTableCell align='center'>{vehicle.crew}</StyledTableCell>
                      <StyledTableCell align='center'>{vehicle.passengers}</StyledTableCell>
                      <StyledTableCell align='center'>{vehicle.cargoCapacity}</StyledTableCell>
                      <StyledTableCell align='center'>{vehicle.consumables}</StyledTableCell>
                      <StyledTableCell align='left'>{vehicle.vehicleClass}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default StarwarsTriviaResult;
