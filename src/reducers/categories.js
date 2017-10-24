import * as Types from '../actions/types.js';

export const CATEGORIES_GET = 'CATEGORIES_GET';

export default function categories(state = [], action) {

	const { type, categories } = action;

	switch ( type ) {
		
		case CATEGORIES_GET:
			return state.concat(categories);
		
		default: 
			return state
	}
}
