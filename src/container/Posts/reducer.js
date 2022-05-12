import { GET_POSTS, GET_SEARCH_RESULT, PAGE_CHANGE } from './actionTypes';
const INITIAL_STATE = {
	posts: [],
	currentPosts: [],
	searchPostPosts: [],
	pageNo: 0,
	totalPages: 0,
	currentActivePage: 1,
	selectedPage: -1,
	searchTerm: '',
	filteredPosts: [],
};

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_POSTS: {
			let posts = [...state.posts, ...action.payload.hits];
			let pageNo = action.payload.page;
			let totalPages = state.totalPages + 1;
			let currentPosts = [];
			let currentActivePage = 1;
			let selectedPage = state.selectedPage;
			if (selectedPage > -1) {
				currentActivePage = selectedPage;
			}
			if (!state.currentPosts.length) {
				currentPosts = posts;
			} else {
				currentPosts = state.currentPosts;
			}
			return {
				...state,
				posts,
				pageNo,
				totalPages,
				currentPosts,
				currentActivePage,
				selectedPage,
				searchPostPosts: currentPosts,
			};
		}

		case GET_SEARCH_RESULT: {
			const searchTerm = action.payload.toLowerCase().trim();
			let filteredPosts = [];
			if (state.currentPosts && state.currentPosts.length && searchTerm) {
				filteredPosts = state.searchPostPosts.filter((post) => {
					const title = post.title.toLowerCase();
					const url = post.url ? post.url.toLowerCase() : '';
					const author = post.author.toLowerCase();
					return (
						title.includes(searchTerm) ||
						url.includes(searchTerm) ||
						author.includes(searchTerm)
					);
				});
			}
			if (!searchTerm.length) {
				const selectedPage = state.selectedPage;
				const startIndex =
					selectedPage > -1
						? (selectedPage - 1) * 20
						: (state.currentActivePage - 1) * 20;
				const endIndex = startIndex + 20;
				filteredPosts = state.posts.slice(startIndex, endIndex);
			}
			return {
				...state,
				searchTerm,
				currentPosts: filteredPosts,
			};
		}

		case PAGE_CHANGE: {
			const selectedPage = action.payload;
			const startIndex =
				selectedPage > -1
					? (selectedPage - 1) * 20
					: (state.currentActivePage - 1) * 20;
			const endIndex = startIndex + 20;
			const posts = state.posts.slice(startIndex, endIndex);
			return {
				...state,
				selectedPage: action.payload,
				currentActivePage: action.payload,
				currentPosts: posts,
				searchPostPosts: posts,
				searchTerm: '',
			};
		}

		default:
			return state;
	}
};

export default rootReducer;
