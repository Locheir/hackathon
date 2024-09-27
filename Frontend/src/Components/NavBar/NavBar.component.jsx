import React from 'react';
import logo from '../../assets/CatalogueEdited.png';
import './NavBar.component.css';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ loggedIn, setLoggedIn }) {
	const Navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		if (!loggedIn) {
			return;
		}

		Navigate('/');
	}

	return (
		<div className="NavDiv">
			<Link onClick={handleSubmit} className="NavLink">
				<img src={logo} alt="C" />
				<p>ATALOGUE</p>
			</Link>
		</div>
	);
}

export default NavBar;
