import React from 'react';
import { Link } from "react-router";
import { Grid, Row } from 'react-bootstrap';

class Page extends React.Component {
  
  constructor(props) {
	super(props);	
	this.state = {
		  collapsed: false,
		};
  }
	
  toggleChapter(e) {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  
  toggleChapterAlways() {
    const collapsed = false;
    this.setState({collapsed});
	this.props.closeAll();
  }
  
  render() {
	const { collapsed } = this.state;
	const page = this.props.data;

	return (<Link to={this.props.url} onClick={this.toggleChapter.bind(this)}>
				<Row style={{height:"50px", textAlign:"center", border:"1px solid gray", verticalAlign:"middle", margin:"10px", paddingTop:"10px"}}>
					<strong>({this.props.id}) {page.body.substring(0,100)}</strong>
				</Row>
			</Link>
		)
  }
}

class PagesList extends React.Component {
  
    constructor(props) {
		super(props);		
	  }
  
  render() {
	
	const pages = this.props.pages;
	const closeAll = this.props.closeAll;
	let baseUrl = this.props.baseUrl;
	
    return (
		<Grid>
			{pages.map(function(page,index) {
			  let pageId = index+1;
			  return <Page data={page} id={pageId} key={index} closeAll={closeAll} url={baseUrl+"/"+pageId} />
			 })}
		</Grid>			

    )
  }
}

module.exports = PagesList;