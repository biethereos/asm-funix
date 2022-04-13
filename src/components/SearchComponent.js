import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stringSearch: ''
		};
	}

	render() {
		return (
			<div className="search-container col-sm-6 col-md-4 col-lg-4 mt-3">
				<input type="text" placeholder="Search.." name="search" />
				<button type="submit">
					<i class="fa fa-search" />
				</button>
			</div>
		);
	}
}

export default Search;
