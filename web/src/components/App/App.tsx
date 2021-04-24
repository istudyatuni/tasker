import React, {
	useEffect,
} from 'react';
import 'fomantic-ui-css/semantic.min.css'

import { LoadPageTitle } from 'api/PageTitleApi'


import ListContainer from 'components/List/ListContainer'

function App() {
	useEffect(() => {
		LoadPageTitle()
	})

	return (
	<div className="App">
		<ListContainer />
	</div>
	);
}

export default App;
