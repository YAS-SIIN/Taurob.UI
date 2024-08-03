import { RobotResponse, ResponseModel } from "../utils/models";



/** 
 * call getRobots Rest Api from back-end server to retrieve list of robot  
 * @returns list of robot 
 */
const getRobots = async (): Promise<ResponseModel<RobotResponse[]>> => {
  try {
    //call getRobot Rest API from server 
    const response = await fetch(`${process.env.REACT_APP_API_URL}/Api/Robot`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    let errorMessage = '';
    if (typeof error === "string") {
      errorMessage = error.toUpperCase()
    } else if (error instanceof Error) {
      errorMessage = error.message
    }
    return {
      data: [],
      statusCode: 500,
      resultCode: -1,
      errorDetail: errorMessage,
      errors: []
    };
  }
};


/** 
 * call getRobotById Rest Api from back-end server to retrieve a robot by id  
 * @param {number} id - id
 * @returns a robot 
 */
const getRobotById = async (id: number): Promise<ResponseModel<RobotResponse>> => {
  console.log(process.env.REACT_APP_API_URL);
  //call getRobot Rest API from server
  const response = await fetch(`${process.env.REACT_APP_API_URL}/Api/Robot/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};


/** 
 * call createRobot Rest Api from back-end server to create new robot  
 * @param {RobotResponse} Robot - object of robot data 
 * @returns new robot 
 */
const createRobot = async (_inputData: RobotResponse = new RobotResponse()): Promise<ResponseModel<RobotResponse>> => {

  //call createRobot Rest API from server
  const response = await fetch(`${process.env.REACT_APP_API_URL}/Api/Robot`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(_inputData)
  });
  return response.json();
};

/** 
 * call updateRobot Rest Api from back-end server to update robot  
 * @param {RobotResponse} Robot - object of robot data 
 */
const updateRobot = async (_inputData: RobotResponse = new RobotResponse()): Promise<ResponseModel<RobotResponse>> => {

  //call updateRobot Rest API from server
  const response = await fetch(`${process.env.REACT_APP_API_URL}/Api/Robot`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(_inputData)
  });
  return response.json();
};

/** 
 * call deleteRobot Rest Api from back-end server to delete new robot  
 * @param {number} id - id
 */
const deleteRobot = async (id: number): Promise<ResponseModel<number>> => {

  //call deleteRobot Rest API from server
  const response = await fetch(`${process.env.REACT_APP_API_URL}/Api/Robot/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return response.json();
};



const robotService = {
  getRobots: getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobot
};
export default robotService;