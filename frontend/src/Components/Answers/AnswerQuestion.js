import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnswerQuestion = () => {
    const { qid } = useParams(); // Get the question ID from the route parameters
    const navigate = useNavigate(); // For navigation after submitting the answer

    const formik = useFormik({
        initialValues: {
            answertext: '',
        },
        validationSchema: Yup.object({
            answertext: Yup.string().required('Answer text is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                 await axios.post(`http://localhost:5000/answers/${qid}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in local storage
                    },
                });
                toast.success('Answer submitted successfully!'); // Display success notification
                setSubmitting(false);
                formik.resetForm(); // Reset the form after submission
                setTimeout(() => {
                    navigate(`/readquestion/${qid}`); // Redirect to the question page after a short delay
                }, 2000); // 2-second delay before redirecting
            } catch (error) {
                toast.error('An error occurred while submitting the answer.');
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container mt-4">
            <ToastContainer /> {/* Add the ToastContainer to display notifications */}
            <h2>Answer the Question</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="answertext" className="form-label">Your Answer</label>
                    <textarea
                        id="answertext"
                        name="answertext"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.answertext}
                        rows="4"
                    />
                    {formik.touched.answertext && formik.errors.answertext && (
                        <div className="text-danger">{formik.errors.answertext}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    Submit Answer
                </button>
            </form>
        </div>
    );
};

export default AnswerQuestion;
