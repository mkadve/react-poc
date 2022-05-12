import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Table } from 'react-bootstrap';
import {
	getPostsAction,
	getPageChangeAction,
	getSearchAction,
} from './actions';
import PostDetailsModal from '../../components/PostDetailsModal';
import Pagination from '../../components/Pagination';

class Posts extends Component {
	intervalId;
	constructor(props) {
		super(props);
		this.state = {
			selectedPost: null,
		};
	}

	getPosts = () => {
		this.props.getPostsAction(this.props.totalPages);
	};

	componentDidMount = () => {
		this.getPosts();
		this.intervalId = setInterval(() => {
			this.getPosts();
		}, 10000);
	};

	componentWillUnmount = () => {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	};

	onSearchChange = (event) => {
		let searchKey = event.target.value;
		this.props.getSearchAction(searchKey);
	};

	onSelectPost = (selectedPost) => {
		this.setState({
			selectedPost,
		});
	};

	onModalClose = () => {
		this.setState({
			selectedPost: null,
		});
	};

	onPageChange = (event) => {
		const target = event.target;
		if (target && target.tagName.toLowerCase() === 'a') {
			const selectedPage = parseInt(target.text.trim());
			this.props.getPageChangeAction(selectedPage);
		}
	};

	render() {
		return (
			<div className="container p-5">
				<Form>
					<Form.Group controlId="searchId">
						<Form.Control
							type="text"
							placeholder="Search by title, url or author..."
							onChange={(event) => this.onSearchChange(event)}
							value={this.props.searchTerm}
						/>
					</Form.Group>
				</Form>
				<Table>
					<thead>
						<tr>
							<th>Title</th>
							<th>URL</th>
							<th>author</th>
							<th>Created At</th>
						</tr>
					</thead>
					<tbody>
						{this.props.currentPosts.map((post, index) => (
							<tr key={index} onClick={() => this.onSelectPost(post)}>
								<td className="ctd">{post.title}</td>
								<td className="ctd">
									<a
										target="_blank"
										rel="onpener noreferer"
										onClick={(e) => e.stopPropagation()}
										href={post.url}
										title={post.url}
									>
										{post.url}
									</a>
								</td>
								<td className="ctd">{post.author}</td>
								<td className="ctd">{post.created_at}</td>
							</tr>
						))}
					</tbody>
				</Table>
				{this.props.currentActivePage ? (
					<Pagination
						currentActivePage={this.props.currentActivePage}
						totalPages={this.props.totalPages}
						onPageChange={this.onPageChange}
					/>
				) : null}
				{this.state.selectedPost ? (
					<PostDetailsModal
						onModalClose={this.onModalClose}
						selectedPost={this.state.selectedPost}
					/>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.posts,
		currentPosts: state.currentPosts,
		pageNo: state.pageNo,
		totalPages: state.totalPages,
		currentActivePage: state.currentActivePage,
		selectedPage: state.selectedPage,
		searchTerm: state.searchTerm,
		filteredPosts: state.filteredPosts,
	};
};

const mapDispatchToProps = {
	getPostsAction,
	getSearchAction,
	getPageChangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
