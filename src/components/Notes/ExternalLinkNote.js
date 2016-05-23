import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import WebPreview from '../WebPreview';

class ExternalLinkNote extends React.Component {
  render() {	
	
	let note = this.props.data;
	
    return (	
		<Grid fluid>
			<Row>
				<Col xs={12} md={10} mdOffset={1}>					
					<WebPreview url={note.relatedObject.url}/>
				</Col>
			</Row>				
		</Grid>		
    )
  }
  
}

module.exports = ExternalLinkNote;