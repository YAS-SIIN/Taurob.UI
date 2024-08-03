/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControlProps, Row, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import DataTable from 'react-data-table-component';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MissionResponse, ResponseModel, RobotResponse } from '../../utils/models';
import { createMission, deleteMission, getMissionsList, updateMission } from './missionsSlice';
import robotService from '../../services/robotService';
import { toast } from 'react-toastify';

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
          <Button variant="warning" onClick={(e) => { handleEdit(e, row) }}>Edit</Button>
          <Button variant="danger" onClick={(e) => { handleDelete(e, row.id) }}>Delete</Button>
        </>)
    },
  ];

  var initialMissionState: MissionResponse = {
    id: 0,
    name: '',
    robotId: 0,
    robotResponse: {
      id: 0,
      name: '',
      modelname: '',
      description: ''
    },
    description: ''
  };

  let initialRobotsState: ResponseModel<RobotResponse[]> = {
    data: [],
    statusCode: 0,
    resultCode: 0,
    errorDetail: '',
    errors: [],
    errorDescription: ''
  };

  const dispatch = useAppDispatch();
  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [saveMode, setSaveMode] = useState('New');
  const [mission, setMission] = useState<MissionResponse>(initialMissionState);
  const [robots, setRobots] = useState<ResponseModel<RobotResponse[]>>(initialRobotsState);


  const getRobotsList = async () => {
    try {
      const res = await robotService.getRobots();
      setRobots(res);
    } catch (error) {
      toast.error('Failed to fetch robots.');
    }
  };

  const handleSubmit = () => {
    try {
      if (mission) {
        if (saveMode === 'New') {
          dispatch(createMission(mission));
        } else if (saveMode === 'Edit') {
          dispatch(updateMission(mission));
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    }
  };

  const handleBack = () => {
    initialMissionState = {
      id: 0,
      name: '',
      robotId: 0,
      robotResponse: {
        id: 0,
        name: '',
        modelname: '',
        description: ''
      },
      description: ''
    };
    setMission(initialMissionState);
    setCreateEditVisible(false);
  };


  const handleDelete = (e: any, rowId: number) => {   e.preventDefault();
    try {
      if (confirm('Are you sure?')) {
        dispatch(deleteMission(rowId));
      }
    } catch (error) {
      toast.error('An unexpected error occurred while deleting the mission.');
    }
  };

  const handleEdit = (e: any, row: MissionResponse) => {
    e.preventDefault();
    initialMissionState = row;
    initialMissionState = {
      id: row.id,
      name: row.name,
      robotId: row.robotId,
      robotResponse: {
        id: row.robotResponse.id,
        name: row.robotResponse.name,
        modelname: row.robotResponse.modelname,
        description: row.robotResponse.description
      },
      description: row.description
    };
    setMission(initialMissionState);
    setSaveMode('Edit');
    setCreateEditVisible(true);
    //dispatch(createMission(mission));
  };

  const handleNew = () => {
    
    initialMissionState = {
      id: 0,
      name: '',
      robotId: 0,
      robotResponse: {
        id: 0,
        name: '',
        modelname: '',
        description: ''
      },
      description: ''
    };
    setMission(initialMissionState);
    setSaveMode('New');
    setCreateEditVisible(true);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {    
    const { id, value } = e.target;
    let newId: string = id.charAt(0).toLowerCase() + id.slice(1);
    setMission(prevState => ({
      ...prevState,
      [newId]: newId === 'robotId' ? parseInt(value) : value
    }));
  };

  const {
    responseModelList,
    responseModelRow,
    loading,
    error,
    dataChanged
  } = useAppSelector((state) => state.missionsReducer);

  useEffect(() => {
    dispatch(getMissionsList());
    getRobotsList();

    if (dataChanged) {
      
      if (error  || responseModelRow.statusCode !== 200) {
        let errorMessage = responseModelRow.errorDescription || 'An error occurred.';
        if (responseModelRow.errors.length != 0) {
          errorMessage += ' | ';
          debugger
          Object.keys(responseModelRow.errors).forEach(function(key:any, index: any) {
            debugger
            const errorArray = responseModelRow.errors[key] as string[];
            errorArray.forEach((b: string) => {
              errorMessage += b + ' | ';
            });
          }); 
        }
        toast.error(errorMessage);
        return;
      } else {
        toast.success('Action done successfully.');
        dispatch(getMissionsList());
        setCreateEditVisible(false);
      }
    }
  }, [dispatch, dataChanged,]);

  return (
    <div>
      {createEditVisible && <Row>
        <Col>
        </Col>
        <Col>
          <Button variant="warning" style={{ width: "100%" }} onClick={handleBack}>Back</Button>
        </Col>
        <Col>
        </Col>
      </Row>}

      {!createEditVisible && <Row>
        <Col>
        </Col>
        <Col>
          <Button variant="primary" style={{ width: "100%" }} onClick={handleNew}>Create New</Button>
        </Col>
        <Col>
        </Col>
      </Row>}

      <br></br>

      {!createEditVisible && <Card>
        <Card.Header>Data <i></i></Card.Header>
        <Card.Body>
          {error && <Alert variant='danger'>There is an error</Alert>}
          {!error && loading ? (
            <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
          ) : (
            <>
              {!error && responseModelList.data && (<><label>Total mission is: {responseModelList.data.length}</label> <DataTable columns={columns} data={responseModelList.data} striped pagination /></>)}

            </>
          )}
        </Card.Body>
      </Card>}
      {createEditVisible && <Card>
        <Card.Header>Create\Edit data <i></i></Card.Header>
        <Card.Body>

          <Form>
            <Row>
              <Col>
           
                <label>Name :</label>
                <Form.Control type="text" id="Name" placeholder="Mission name" value={mission.name} onChange={handleChange} />
              </Col>
              <Col>
                <label>Robot : </label >

                <Form.Select id="RobotId" value={mission.robotId} onChange={handleChange}>
                  <option value="">Select a robot</option>
                  {robots?.data.map(robot => (
                    <option key={robot.id} value={robot.id}>{robot.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>

                <label>Description :</label>
                <Form.Control type="text" id="Description" placeholder="Mission description" value={mission.description} onChange={handleChange} />
              </Col>

            </Row>
            <br />
            <Row>
              <Col>
              </Col>
              <Col>
                <Button variant="success" style={{ width: "100%" }} onClick={handleSubmit} >Submit</Button>
              </Col>
              <Col>

              </Col>
            </Row>
          </Form>

        </Card.Body>
      </Card>}

    </div>
  );
}
