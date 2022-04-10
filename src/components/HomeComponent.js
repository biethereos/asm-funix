import React from 'react';
import StaffList from './StaffListComponent';

const Home = (props) => {
	return (
		<div className="container">
			<div className="row align-items-start">
				<StaffList staffs={props.staffs} />
			</div>
		</div>
	);
};

export default Home;
