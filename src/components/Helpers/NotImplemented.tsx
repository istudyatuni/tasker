import React from 'react'
import {
	Icon,
	Header,
} from 'semantic-ui-react'

const NotImplemented: React.FC = () => {
	return (
		<Header as='h2' icon inverted>
			<Icon name='wait' />
			Now not implemented
		</Header>
	)
}

export default NotImplemented;
