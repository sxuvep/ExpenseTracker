import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => {
	return (
		<div>
			<h1>Info</h1>
			<p>The info is {props.info}</p>
		</div>
	);
};

const withAdminWarning = WrappedComponent => {
	return props => (
		<div>
			<p>This is from admin compoent</p>
			<WrappedComponent {...props} />
		</div>
	);
};

const Admin = withAdminWarning(Info);

ReactDOM.render(
	<Admin info="these are the details" />,
	document.getElementById('app')
);
