import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AllUsers() {
    const [users, setUsers] = useState([]);



    /*const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');*/

    // Fetch all users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);
    

    const fetchUsers = async () => {
        try {
            console.log("Fetching users...");
            const response = await axios.get('http://localhost:5000/users', { withCredentials: true });
            console.log("Users fetched:", response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
            toast.error('Error fetching users');
        }
    };
    

    /*const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/register', { username, password, role }, { withCredentials: true });
            toast.success(response.data.message);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error creating user:', error); // Debug log to check errors
            toast.error('Error creating user');
        }
    };*/

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`, { withCredentials: true });
            toast.success('User deleted successfully');
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error); // Debug log to check errors
            toast.error('Error deleting user');
        }
    };

    const handleActivateUser = async (id) => {
        try {
            await axios.put(`http://localhost:5000/users/activate/${id}`, {}, { withCredentials: true });
            toast.success('User activated successfully');
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error activating user:', error); // Debug log to check errors
            toast.error('Error activating user');
        }
    };

    const handleDeactivateUser = async (id) => {
        try {
            await axios.put(`http://localhost:5000/users/deactivate/${id}`, {}, { withCredentials: true });
            toast.success('User deactivated successfully');
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error deactivating user:', error); // Debug log to check errors
            toast.error('Error deactivating user');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bg-gradient-to-b from-purple-100 to-white min-h-screen">
                <div className="container mx-auto p-8">
                    <h1 className="bg-lime-400 text-3xl font-semibold mb-4">Manage All Users</h1>

                    

                    {/* Table to display users */}
                    <table className="w-full border border-collapse border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-pink-400">
                            <tr>
                                <th className="py-2 px-4 border-r">ID</th>
                                <th className="py-2 px-4 border-r">Username</th>
                                <th className="py-2 px-4 border-r">Email</th>
                                <th className="py-2 px-4 border-r">Role</th>
                                <th className="py-2 px-4 border-r">Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-2 px-4 border-r">{index + 1}</td>
                                    <td className="py-2 px-4 border-r">{user.username}</td>
                                    <td className="py-2 px-4 border-r">{user.email}</td>
                                    <td className="py-2 px-4 border-r">{user.role}</td>
                                    <td className="py-2 px-4 border-r">{user.status}</td>
                                    <td className="py-4 px-4">
                                    <button 
                                            onClick={() => handleActivateUser(user._id)}
                                            className="btn btn-success mr-2"
                                            disabled={user.status === 'active'}
                                        >
                                            Activate
                                        </button>
                                        <button 
                                            onClick={() => handleDeactivateUser(user._id)}
                                            className="btn btn-warning mr-2"
                                            disabled={user.status === 'inactive'}
                                        >
                                            Deactivate
                                        </button>
                                        <button className="btn btn-danger"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
