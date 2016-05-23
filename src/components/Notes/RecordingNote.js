import React from 'react';
import SoundCloudPlayer from '../SoundcloudPlayer';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
const clientId = '4f6c17d18260e9acaecec51809a1ff88'; //SECRET: c8984c019d4e450e2fd4f08fb4be0529

class RecordingNote extends React.Component {
  render() {	
	
	let note = this.props.data;
	let rec = this.props.data.relatedObject;

    return (
			<Grid fluid>
			
			<Row>
				<Col xs={6} md={4} >
					<img src={rec.defaultImage.src} 
						description={rec.defaultImage.name} 
						alt={rec.defaultImage.alt_text}
					/>
				</Col>
				<Col xs={12} md={8} >
					<h2><i className="glyphicon glyphicon-headphones"></i> {rec.title}</h2>
					{note.body}<br /> 
					<Link to={note.verse.url}>{note.verse.reference}</Link> {note.verse.t}
				</Col>
			</Row>
			
			{rec.formats.map(function(f){
		
				let player = '';
				
				if(f.host === "soundcloud"){
					player = <SoundCloudPlayer clientId={clientId} resolveUrl={"https://api.soundcloud.com/tracks/"+f.file} />;
				}
				
				return (
					<Row key={f.id}>
						<Col xs={12} md={12} >
							{player}
						</Col>
					</Row>
					);
			})}			
		</Grid>		
    )
  }
 
}

module.exports = RecordingNote;