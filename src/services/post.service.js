import axios from 'axios';

export const getPost = (totalPages) => {
	return axios.get(`${process.env.REACT_APP_API_URL}&page=${totalPages}`);
};
