import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Components/Pages/Menu';
import Footer from './Components/Pages/Footer';
import { lazy, Suspense } from 'react';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import AnswerQuestion from './Components/Answers/AnswerQuestion'; 
import UserProfile from './Components/Pages/UserProfile';
import AllUsers from './Components/Admin/AllUsers';

const Home = lazy(() => import('./Components/Pages/Home'));
const CreateQuestion = lazy(() => import('./Components/Questions/CreateQuestion'));
const UpdateQuestion = lazy(() => import('./Components/Questions/UpdateQuestion'));
const ListQuestionsByCategory = lazy(() => import('./Components/Questions/ListQuestionsByCategory'));
const ReadQuestion = lazy(() => import('./Components/Questions/ReadQuestion'));
const ListAllQuestions = lazy(() => import('./Components/Questions/ListAllQuestions'));
const AdminQuestions = lazy(() => import('./Components/Admin/AdminDashboard'));

function App() {

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
    
  if (!token) {
    return <Navigate to='/login' />;
  }

  return children;
}

  return (
    <div className="App">
      <Menu />
      <Suspense fallback={
        <div className='container'>
          <div className="d-flex align-items-center" style={{ "marginTop": 100 }}>
            <strong role="status">Loading...</strong>
            <div className="spinner-border ms-auto" aria-hidden="true"></div>
          </div>
        </div>
      }>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/createquestion" element={<ProtectedRoute><CreateQuestion /></ProtectedRoute>} />
          <Route path="/updatequestion/:id" element={<ProtectedRoute><UpdateQuestion /></ProtectedRoute>} />
          <Route path="/listquestions/:category" element={<ListQuestionsByCategory />} />
          <Route path="/readquestion/:id" element={<ReadQuestion />} />
          <Route path='/listallquestions' element={<ListAllQuestions />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/userprofile' element={<UserProfile/>}/>
          <Route path='/allusers'element={<AllUsers/>}/>
          
          <Route path='/adminquestions/*' element={<ProtectedRoute><AdminQuestions /></ProtectedRoute>} />
          <Route path="/answerquestion/:qid" element={<AnswerQuestion />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;