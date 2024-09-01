import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for notifications

function ListAllQuestions() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchQuestions = useCallback(() => {
        axios.get('http://localhost:5000/questions/approved/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setQuestions(response.data);
        })
        .catch(error => {
            console.log("Error occurred when fetching the questions", error);
        });
    }, [token]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            axios.delete(`http://localhost:5000/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                toast.success("Question deleted successfully!");
                fetchQuestions(); // Refresh the list after deletion
            })
            .catch((error) => {
                console.error('There was an error deleting the question!', error);
                toast.error("Failed to delete the question.");
            });
        }
    };

    return (
        <div className="container">
            <h2 className='container mt-5' style={{ "textAlign": "center" }}>Questions</h2>
            <div className="my-5 p-3 bg-body rounded shadow-sm">
                {questions.map(question => (
                    <div className="d-flex text-body-secondary pt-3" key={question._id}>  
                        <div className="pb-4 mb-0 small lh-sm border-bottom w-100">
                            <div className="d-flex justify-content-between">
                                <strong className="text-gray-dark" style={{"fontSize":18, "fontFamily":"monospace"}}>Question: {question.questiontext}</strong>
                            </div><br/>
                            {token ? (
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-secondary" onClick={() => { navigate(`/readquestion/${question._id}`) }} style={{'float':"inline-end", "width":300}}>Description</button>
                                    <button className="btn btn-warning" onClick={() => { navigate(`/updatequestion/${question._id}`) }} style={{'float':"inline-end", "width":300}}>Update</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(question._id)} style={{'float':"inline-end", "width":300}}>Delete</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListAllQuestions;
