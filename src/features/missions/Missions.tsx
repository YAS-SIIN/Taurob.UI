/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import DataTable from 'react-data-table-component';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MissionResponse } from '../../utils/models';
import { deleteMission, getMissionsList } from './missionsSlice';

/**
 * Mission page with data
 * @returns show list of mission 
 */
export function Missions() {
  const columns = [
    { name: 'Mission name', selector: (row: MissionResponse) => row.name },
    { name: 'Robot name', selector: (row: MissionResponse) => row.robotResponse.name },
    { name: 'Robot model name', selector: (row: MissionResponse) => row.robotResponse.modelname },
    {
      name: 'Actions', cell: (row: MissionResponse) => (
        <>
          <Button variant="warning">Edit</Button>
          <Button variant="danger">Delete</Button>
        </>)
    },
  ];

  let _mission: MissionResponse = new MissionResponse();

  const dispatch = useAppDispatch();
  const [mission, setMission] = useState(_mission);
  

  const {
    responseModelList,
    loading,
    error,
    dataChanged
  } = useAppSelector((state) => state.missionsReducer);

  useEffect(() => {
    debugger
    dispatch(getMissionsList());

    if (dataChanged) {
      dispatch(getMissionsList());
    }

  }, [dispatch, dataChanged]);

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
function createMission(mission: MissionResponse): any {
  throw new Error('Function not implemented.');
}

function updateMission(mission: MissionResponse): any {
  throw new Error('Function not implemented.');
}

