import './CreateQuestion.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

function UpdateQuestion() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const token = localStorage.getItem('token'); // Get the token from local storage

    useEffect(() => {
        axios.get(`http://localhost:5000/questions/id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
        })
        .then((response) => {
            setQuestion(response.data);
        })
        .catch((error) => {
            console.log("There was an error fetching the questions data!", error);
        });
    }, [id, token]);

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            questiontext: question?.questiontext || "",
            description: question?.description || "",
            image: question?.image || '',
            category: question?.category || "",
        },

        validationSchema: Yup.object({
            questiontext: Yup.string().required("Question text is required"),
            description: Yup.string().required('Description is required'),
            image: Yup.string().url('Invalid URL format'),
            category: Yup.string().required("Category is required"),
        }),

        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            axios.put(`http://localhost:5000/questions/updatequestion/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
            })
            .then(() => {
                setStatus("success");
                resetForm();
                toast.success("Question Updated successfully!"); // Show success toast
                navigate(`/readquestion/${id}`);
            })
            .catch((error) => {
                setStatus("error");
                toast.error("Failed to update the question."); // Show error toast
            })
            .finally(() => {
                setSubmitting(false);
            });
        }
    });

    return (
        <div className='container mt-4'>
            <button
                type="button"
                className="btn btn-primary"
                style={{ "marginRight": 1200 }}
                onClick={() => window.history.back()}>
                Back
            </button>
            <h2>Update Question</h2><br/><br/>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='questiontext' className='form-label'>QuestionText</label>
                    <input
                        id="questiontext"
                        name="questiontext"
                        type="text"
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.questiontext}
                        data-testid="questiontext"
                    />
                    {formik.touched.questiontext && formik.errors.questiontext && (
                        <div className='text-danger'>{formik.errors.questiontext}</div>
                    )}
                </div>
                
                <div className='mb-3'>
                    <label htmlFor='image' className='form-label'>Image URL</label>
                    <input
                        id="image"
                        name="image"
                        type="text" 
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image}
                        data-testid="image"
                    />
                    {formik.touched.image && formik.errors.image && (
                        <div className='text-danger'>{formik.errors.image}</div>
                    )}
                    {formik.values.image && (
                        <div className='mt-3'>
                            <img src={formik.values.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    )}
                </div>

                <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        data-testid="description"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className='text-danger'>{formik.errors.description}</div>
                    )}
                </div>

                <div className='mb-3'>
                    <label htmlFor='category' className='form-label'>Category</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                        data-testid="category"
                    />
                    {formik.touched.category && formik.errors.category && (
                        <div className='text-danger'>{formik.errors.category}</div>
                    )}
                </div>

                <button type='submit' className='btn btn-primary' disabled={formik.isSubmitting} style={{ "width": 400 }}>
                    Update
                </button>

                {formik.status && formik.status === 'success' && (
                    <span data-testid='response' className='text-success'>Success</span>
                )}

                {formik.status && formik.status === 'error' && (
                    <span data-testid='response' className='text-danger'>Error</span>
                )}
            </form>
        </div>
    );
}

export default UpdateQuestion;
