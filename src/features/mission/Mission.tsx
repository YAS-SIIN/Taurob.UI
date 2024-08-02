/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

/**
 * Mission page with data
 * @returns show list of mission 
 */
export function Mission() {

  useEffect(() => {
    
  
  }, []);

  return (
    <div>
    
      <br></br>
      <Card>
        <Card.Header>Data <i></i></Card.Header>
        <Card.Body>
          <Alert variant='danger'>There is an error</Alert>
          
        </Card.Body>
      </Card>

    </div>
  );
}
