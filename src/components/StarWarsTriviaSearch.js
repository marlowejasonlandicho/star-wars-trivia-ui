import React from 'react';
import TextField from '@mui/material/TextField';

function StarwarsTriviaSearch({ onBlur }) {
  return (
    <div>
      <TextField
        id='outlined-basic'
        variant='outlined'
        onBlur={(event) => onBlur(event.target.value)}
      />
    </div>
  );
}

export default StarwarsTriviaSearch;
