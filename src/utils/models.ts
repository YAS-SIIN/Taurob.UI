

/**
 * Base Response 
 * @typedef BaseResponseModel
 * @type {object}
 * @property {number} id - id
 * @property {string} description - description
 */
export class BaseResponseModel {
  /**
   * id
   */
  id!: number;

  /**
   * message
   */
  description!: string;
}
  
 
/**
 * MissionResponse
 * @typedef MissionResponse
 * @type {object}
 * @property {string} name - name
 * @property {number} robotId - robotId
 * @property {RobotResponse} robot - robot
 */
export class MissionResponse extends BaseResponseModel {
  /**
   * Mission name
   */
  name!: string;

  /**
   * Mission robotId
   */
  robotId!: number;

  /**
   * Mission robot
   */
  robotResponse!: RobotResponse;

};

 
/**
 * RobotResponse
 * @typedef RobotResponse
 * @type {object}
 * @property {string} name - name
 * @property {number} robotId - robotId
 */
export class RobotResponse extends BaseResponseModel {
  /**
   * Robot name
   */
  name!: string;

  /**
   * Robot modelname
   */
  modelname!: string;
};


/**
 * Mission Response 
 * @typedef MissionResponseModel
 * @type {object}
 * @property {MissionResponse} data - Missions data list
 */
export class ResponseModel<T> {
  /**
   * Missions data list
   */
  data!: T;
  
  /**
   * Response status code
   */
  statusCode!: number;
  
  
  /**
   * Response result code
   */
  resultCode!: number;
  
  
  /**
   * Response error detail
   */
  errorDetail!: string;
  
  
  /**
   * Response error detail
   */
  errorDescription!: string;
  
  
  /**
   * Response errors
   */
  errors!: [];
  
}


/**
 * Initial State 
 * @typedef InitialStateModel
 * @type {object}
 * @property {ResponseModel} responseModelList - response data list
 * @property {ResponseModel} responseModelRow - response data
 * @property {boolean} loading - loading
 * @property {boolean} error - error
 * @property {boolean} dataChanged - dataChanged
 */
export class InitialStateModel<T>  {
  responseModelList!: ResponseModel<T[]>;
  responseModelRow!: ResponseModel<T>;
  loading!: boolean;
  error!: boolean;
  dataChanged!: boolean;
  message!: string;
}
 