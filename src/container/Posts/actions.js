import { GET_POSTS, GET_SEARCH_RESULT, PAGE_CHANGE } from './actionTypes';
import { getPost } from '../../services/post.service';

export const getPostsAction = (totalPages) => {
	return (dispatch) => {
		getPost(totalPages)
			.then((response) => {
				if (response && response.status && response.status === 200) {
					dispatch({
						type: GET_POSTS,
						payload: response.data,
					});
				}
			})
			.catch((error) => {
				alert(
					'Something went wrong in fetching posts API. Please try again later.'
				);
			});
	};
};

export const getSearchAction = (searchKey) => {
	return (dispatch) => {
		dispatch({
			type: GET_SEARCH_RESULT,
			payload: searchKey,
		});
	};
};

export const getPageChangeAction = (selectedPage) => {
	return (dispatch) => {
		dispatch({
			type: PAGE_CHANGE,
			payload: selectedPage,
		});
	};
};
