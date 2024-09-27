import React from 'react';
import { ClipLoader, HashLoader } from 'react-spinners';

function Loading() {
	return (
		<div className="container">
			<HashLoader color="#3578e4" />
		</div>
	);
}

export default Loading;
