import React from 'react';
import NavBar from '../NavBar/NavBar.component';
import { Outlet } from 'react-router-dom';

function Layout({ loggedIn, setLoggedIn }) {
	return (
		<>
			<NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Outlet />
		</>
	);
}

export default Layout;
