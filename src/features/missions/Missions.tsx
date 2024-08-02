/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import DataTable from 'react-data-table-component';
import { useAppSelector } from '../../app/hooks';
import { Mission } from '../../utils/models';

/**
 * Mission page with data
 * @returns show list of mission 
 */
export function Missions() {
  const columns = [
    { name: 'name', selector: (row: Mission) => row.name },
    {
      name: 'Actions', cell: (props: Mission) => (
        <><Button variant="warning">Edit</Button></>)
    }
  ];

  let _mission: Mission = new Mission();
  
  const [mission, setMission] = useState(_mission);
  const {
    responseModelList,
    loading,
    error,
    dataChanged
  } = useAppSelector((state) => state.missionsReducer);

  useEffect(() => {
    debugger
  
  }, []);

  return (
    <div>
    
      <br></br>
      <Card>
        <Card.Header>Data <i></i></Card.Header>
        <Card.Body>
          {error && <Alert variant='danger'>There is an error</Alert>}
          {!error && loading ? (
            <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
          ) : (
            <>
              {!error && responseModelList.data && (<><label>Total missions is: {responseModelList.data.length}</label> <DataTable columns={columns} data={responseModelList.data} striped pagination /></>)}

            </>
          )}
        </Card.Body>
      </Card>

    </div>
  );
}
