import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ReadQuestion.css';

function ReadQuestion() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const token = localStorage.getItem('token');

    const fetchComments = useCallback((answerId) => {
        axios.get(`http://localhost:5000/comments/answer/${answerId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setComments(prevState => ({
                ...prevState,
                [answerId]: response.data,
            }));
        })
        .catch(error => console.error('Error fetching the comments:', error));
    }, [token]);

    const fetchAnswers = useCallback(() => {
        axios.get(`http://localhost:5000/answers/approved/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setAnswers(response.data);
            response.data.forEach(answer => fetchComments(answer._id));
        })
        .catch(error => console.error('Error fetching the answers:', error));
    }, [id, token, fetchComments]);

    const fetchQuestion = useCallback(() => {
        axios.get(`http://localhost:5000/questions/id/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => setQuestion(response.data))
        .catch(error => console.error('Error fetching the question:', error));
    }, [id, token]);

    useEffect(() => {
        fetchQuestion();
        fetchAnswers();
    }, [fetchQuestion, fetchAnswers]);

    const handleLike = (answerId) => {
        axios.put(`http://localhost:5000/answers/like/${answerId}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            toast.success("You liked the answer!");
            fetchAnswers(); // Refresh answers after liking
        })
        .catch(error => {
            console.error('Error liking the answer:', error);
            toast.error("You already liked the answer.");
        });
    };
    
    const handleDislike = (answerId) => {
        axios.put(`http://localhost:5000/answers/dislike/${answerId}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            toast.success("Disliked the answer!");
            fetchAnswers(); // Refresh answers after disliking
        })
        .catch(error => {
            console.error('Error disliking the answer:', error);
            toast.error("You already disliked the answer.");
        });
    };
    
    const handleCommentSubmit = (answerId) => {
        if (newComment.trim()) {
            axios.post(`http://localhost:5000/comments/comment/${answerId}`, 
            { comment: newComment }, 
            { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setNewComment('');
                fetchComments(answerId);
                toast.success("Comment added successfully!");
            })
            .catch(error => {
                console.error('Error posting comment:', error);
                toast.error("Failed to post the comment.");
            });
        }
    };

    return (
        <div className="container2">
            <button
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 1200 }}
                onClick={() => window.history.back()}>
                Back
            </button><br /><br />
            <ToastContainer />
            <div className="question-details">
                {question ? (
                    <div key={question._id}>
                        <div className="question-header">
                            <h5>Question No: {question._id}</h5>
                        </div>
                        <h1 className="question-text">Question: {question.questiontext}</h1><br />
                        {question.image && (
                            <img
                                src={question.image}
                                alt="Concern"
                                style={{ maxWidth: '25rem', height: 'auto' }}
                            />
                        )}
                        <p><b>Description:</b> {question.description}</p><br />
                        <p><b>Status:</b> {question.status}</p>
                    </div>
                ) : (
                    <p className="loading">Loading...</p>
                )}
            </div>

            <div className="answers-section">
                <h2>Answers</h2>
                {answers.length > 0 ? (
                    answers.map(answer => (
                        <div key={answer._id} className="answer-card">
                            <p>{answer.answertext}</p>
                            <div className="answer-actions">
                                <button onClick={() => handleLike(answer._id)} className="like-button">
                                    <FontAwesomeIcon icon={faThumbsUp} /> Like {answer.likes.length}
                                </button>
                                <button onClick={() => handleDislike(answer._id)} className="dislike-button">
                                    <FontAwesomeIcon icon={faThumbsDown} /> Dislike
                                </button>
                            </div>
                            <div className="comments-section">
                                <h3>Comments</h3>
                                {comments[answer._id] && comments[answer._id].length > 0 ? (
                                    comments[answer._id].map(comment => (
                                        <p key={comment._id}>{comment.comment}</p>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                                <input
                                    type="text"
                                    placeholder="Add a comment"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button onClick={() => handleCommentSubmit(answer._id)}>
                                    <FontAwesomeIcon icon={faComment} /> Comment
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No answers yet. Be the first to answer!</p>
                )}
            </div>
        </div>
    );
}

export default ReadQuestion;
