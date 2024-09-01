import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    const fetchAllQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/questions/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching all questions:', error);
            setMessage('Error fetching questions.');
        }
    };

    const fetchUnapprovedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/questions/unapproved', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching unapproved questions:', error);
            setMessage('Error fetching unapproved questions.');
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/questions/approve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Question approved successfully.');
            fetchUnapprovedQuestions();
        } catch (error) {
            console.error('Error approving question:', error);
            toast.error('Error approving question.');
        }
    };

    const handleResolve = async (id) => {
        try {
            await axios.put(`http://localhost:5000/questions/resolve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Question Completed successfully.');
            fetchUnapprovedQuestions();
        } catch (error) {
            console.error('Error resolving question:', error);
            toast.error('Error resolving question.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Question deleted successfully.');
            fetchUnapprovedQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
            toast.error('Error deleting question.');
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/questions/questiontext/${searchText}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data || []);
            if (!response.data.length) {
                toast.error('No questions found for the search term.');
            }
        } catch (error) {
            toast.error('Error searching questions.');
        }
    };

    const handleFilterByCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/questions/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data || []);
            if (!response.data.length) {
                toast.error('No questions found for this category.');
            }
        } catch (error) {
            toast.error('Error filtering questions.');
        }
    };

    const fetchAllApprovedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/questions/approved', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching approved questions:', error);
            toast.error('Error fetching approved questions.');
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white min-h-screen">
            <ToastContainer />
            <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
            {message && <div className="alert alert-info">{message}</div>}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="p-2 border border-gray-300 rounded mr-2"
                /><button 
                onClick={handleSearch} 
                style={{
                    background: 'linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(41, 137, 216, 1) 50%, rgba(125, 185, 232, 1) 100%)',
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    border: 'none',
                    cursor: 'pointer'
                }}
                className="hover:bg-opacity-90"
            >
                Search
            </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filter by category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button 
                onClick={handleFilterByCategory} 
                style={{
                    background: 'linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(41, 137, 216, 1) 50%, rgba(125, 185, 232, 1) 100%)',
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    border: 'none',
                    cursor: 'pointer'
                }}
                className="hover:bg-opacity-90"
            >
                Filter
            </button>
            </div>

            <div className="mb-4">
            <button onClick={fetchUnapprovedQuestions} 
            style={{
                background: 'linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(41, 137, 216, 1) 50%, rgba(125, 185, 232, 1) 100%)',
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '8px', 
                border: 'none',
                cursor: 'pointer',
                marginRight: '8px'
            }}
            className="hover:bg-opacity-90"
            >
                View Unapproved Questions
            </button>
            <button 
            onClick={fetchAllApprovedQuestions} 
            style={{
                background: 'linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(41, 137, 216, 1) 50%, rgba(125, 185, 232, 1) 100%)',
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '8px', 
                border: 'none',
                cursor: 'pointer'
            }}
            className="hover:bg-opacity-90"
            >
                 View Approved Questions
            </button>

            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Questions List</h2>
                {questions.length > 0 ? (
                    <ol>
                        {questions.map((question) => (
                            <li key={question._id} className="mb-4 p-4 border rounded shadow">
                                <p><strong>Question:</strong> {question.questiontext}</p>
                                <p><strong>Status:</strong> {question.status}</p>
                                <div className="mt-2">
                                <button onClick={() => handleApprove(question._id)} 
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 249, 196, 1) 0%, rgba(255, 235, 59, 1) 50%, rgba(255, 213, 0, 1) 100%)',
                                    color: 'white', 
                                    padding: '4px 12px', 
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginRight: '8px'
                                    }}>
                                        Approve
                                </button>
                                
                                <button onClick={() => handleResolve(question._id)} 
                                style={{
                                    background: 'linear-gradient(135deg, rgba(56, 142, 60, 1) 0%, rgba(76, 175, 80, 1) 50%, rgba(139, 195, 74, 1) 100%)',
                                    color: 'white', 
                                    padding: '4px 12px', 
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginRight: '8px'
                                    }}>
                                        Complete
                                </button>
                                
                                <button onClick={() => handleDelete(question._id)} 
                                style={{
                                    background: 'linear-gradient(135deg, rgba(239, 83, 80, 1) 0%, rgba(244, 67, 54, 1) 50%, rgba(229, 57, 53, 1) 100%)',
                                    color: 'white', 
                                    padding: '4px 12px', 
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer'
                                    }}>
                                        Delete
                                </button>

                                </div>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p>No questions found</p>
                )}
            </div>

           
        </div>
    );
};

export default AdminDashboard;
