 
/**
 * Mission
 * @typedef Mission
 * @type {object}
 * @property {number} id - id
 * @property {string} title - Mission title
 * @property {number} status - Mission status
 */
export class Mission {
  /**
   * Mission name
   */
  name!: string;

  /**
   * Mission robotId
   */
  robotId!: number;

};


/**
 * Base Response 
 * @typedef BaseResponseModel
 * @type {object}
 * @property {string} message - message
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
 * Mission Response 
 * @typedef MissionResponseModel
 * @type {object}
 * @property {Mission} data - Missions data list
 */
export class ResponseModel<T> extends BaseResponseModel {
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
   * Response errors
   */
  errors!: [];
  
}

