import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PostDetailsModal = (props) => {
	return (
		<Modal show={props.selectedPost !== null} onHide={props.onModalClose}>
			<Modal.Header closeButton>{props.selectedPost.title}</Modal.Header>
			<Modal.Body>{JSON.stringify(props.selectedPost)}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onModalClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PostDetailsModal;
