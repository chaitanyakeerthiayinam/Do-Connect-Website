import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chat from './chat';

function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by verifying the presence of the token
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if not logged in
      navigate('/login');
    } else {
      // Fetch categories if logged in
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/questions/approved', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const questions = response.data;
      const uniqueCategories = [
        ...new Set(questions.map((question) => question.category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories', error);
      // Handle redirection if an error occurs
      navigate('/login'); // Redirect to login if needed
    }
  };

  return (
    <>
      <header style={{
        position: 'relative',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(41, 137, 216, 1) 50%, rgba(125, 185, 232, 1) 100%)',
        color: '#fff',
        textAlign: 'center',
        fontSize: '42px',
        fontWeight: 'bold',
        fontFamily: 'Montserrat, sans-serif',
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
        borderRadius: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
      }}>
        <h1 style={{ marginBottom: '10px' }}>Let's Learn something new and Grow Together</h1>
        <p style={{
          fontSize: '20px',
          fontWeight: 'normal',
          fontFamily: 'Arial, sans-serif',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        }}>
          Post your questions, explore answers, and dive into the world of knowledge!
        </p>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse 2s infinite',
        }}></div>
      </header>

      <div className="container my-5">
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mb-4" key={category}>
              <div className="card" onClick={() => navigate(`/listquestions/${category}`)} style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{
                    background: 'linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(41, 137, 216, 1) 50%, rgba(125, 185, 232, 1) 100%)',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px 0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}>
                    {category}
                  </h5>
                  <p className="card-text">Explore questions related to {category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Chat />
    </>
  );
}

export default Home;
