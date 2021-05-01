import React, { useState } from 'react';

import AdminSectionContainer from '../components/AdminSectionContainer';
import T from '../components/Table';
import TextField from '../components/TextField';
import Button from '../../../components/Button';
import Avatar from '../components/Avatar';

export default function Users(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AdminSectionContainer>
      <header className="flex justify-between py-4">
        <TextField
          autoFocus
          label="Search"
          name="search"
          type="search"
          value={searchValue}
          tabIndex={1}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <div>
          <Button variant="primary">Add</Button>
        </div>
      </header>
      <T.Table>
        <T.Head>
          <T.EmptyHeader />
          <T.Header label="First Name" />
          <T.Header label="Last Name" />
          <T.Header label="Email" />
          <T.Header label="Date Joined" />
          <T.EmptyHeader />
        </T.Head>
        <T.Body>
          <T.Row>
            <T.RowCell center>
              <Avatar squareSize={32} />
            </T.RowCell>
            <T.Data text="Esteban" />
            <T.Data text="Borai" />
            <T.Data text="cayde@cayde.com" />
            <T.Data text="21st, January of 2021" />
            <T.RowCell>
              <T.RowButton variant="warning">
                Edit
              </T.RowButton>
              <T.RowButton variant="danger">
                Delete
              </T.RowButton>
            </T.RowCell>
          </T.Row>
        </T.Body>
      </T.Table>
    </AdminSectionContainer>
  );
}
