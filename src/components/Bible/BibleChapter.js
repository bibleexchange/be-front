import React from 'react';
import BibleVerseComponent from './BibleVerse';
import NoteComponent from './Note';
import { Link } from "react-router";
import { Grid, Row, Col } from 'react-bootstrap';

class BibleChapter extends React.Component {
 
  render() {
	const BibleVerseComponents = this.props.verses.map((verse)=>{
		return <BibleVerseComponent key={verse.id} {...verse} />;
	});
	
	const NoteComponents = this.props.notes.map((note)=>{
		return <NoteComponent key={note.id} {...note} />;
	});
	
    return (
		<Grid id="bible">
			<h2 id={"ch_"+this.props.id}><Link to={!this.props.url ? "":this.props.url+"#ch_"+this.props.id} data={this.props} onClick={this.props.chapterClickHandler}>{this.props.book.n} {this.props.orderBy}</Link></h2>
			<Row>
				<Col xs={12} md={8} >
					{BibleVerseComponents}
				</Col>
				<Col xs={6} md={4} >
					{NoteComponents}
				</Col>
			</Row>
		</Grid>			

    )
  }
}

module.exports = BibleChapter;