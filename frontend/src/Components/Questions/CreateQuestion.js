import './CreateQuestion.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

function CreateQuestion() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            questiontext: '',
            description: '',
            image: '',
            category: ''
        },
        validationSchema: Yup.object({
            questiontext: Yup.string().required('Question Text is required'),
            description: Yup.string().required('Description is required'),
            image: Yup.string()
                .url('Invalid URL format')
                .required('Image URL is required'),
            category: Yup.string().required('Category is required'),
        }),
        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            axios.post('http://localhost:5000/questions', values, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
            })
                .then(response => {
                    setStatus('success');
                    resetForm();
                    toast.success('Question posted successfully!'); // Show success toast immediately
                    setTimeout(() => {
                        navigate('/'); // Navigate after a delay
                    }, 3000); // 3-second delay before navigation
                })
                .catch(error => {
                    setStatus('error');
                    toast.error('Failed to post the question.'); // Show error toast
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className='container mt-5' style={{ "alignText": "center" }}>
            <h3>Post your Question</h3><br /><br />
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='questiontext' className='form-label'>Question Text</label>
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
                            <img src={formik.values.image} alt="Preview" style={{ maxWidth: '50%', maxHeight: '200px' }} />
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

                <button 
                    type='submit' 
                    className='btn btn-success' 
                    disabled={formik.isSubmitting} 
                    style={{
                        width: 400,
                        background: 'linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(41, 137, 216, 1) 50%, rgba(125, 185, 232, 1) 100%)',
                        border: 'none',
                        color: '#fff'
                    }}>
                    Post Question
                </button>

                {formik.status === 'success' && (
                    <span data-testid='response' className='text-success'>Success</span>
                )}
                {formik.status === 'error' && (
                    <span data-testid='response' className='text-danger'>Error</span>
                )}
            </form>
            <ToastContainer /> {/* Add ToastContainer here */}
        </div>
    );
}

export default CreateQuestion;
