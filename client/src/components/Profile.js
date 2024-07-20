import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [year, setYear] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [editPhone, setEditPhone] = useState(false);
  const [editYear, setEditYear] = useState(false);
  const [editLinkedin, setEditLinkedin] = useState(false);
  const [editGithub, setEditGithub] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail);
    setName(localStorage.getItem('userName'));
    fetchUserAdditionalDetails(storedEmail);
  };

  const fetchUserAdditionalDetails = async (storedEmail) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/profile/details/${storedEmail}`);
      const userData = response.data; 
      setPhone(userData.phone || '');
      setYear(userData.year || '');
      setLinkedin(userData.linkedin || '');
      setGithub(userData.github || '');
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleInputChange = (setter, value) => {
    setter(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      phone,
      year,
      linkedin,
      github
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/profile/update/${email}`, userData);
      console.log('User details updated successfully:', response.data);
      setEditPhone(false);
      setEditYear(false);
      setEditLinkedin(false);
      setEditGithub(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <p className="text-lg text-gray-700">{email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <p className="text-lg text-gray-700">{name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              Phone:
              {editPhone ? (
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={phone}
                  onChange={(e) => handleInputChange(setPhone, e.target.value)}
                />
              ) : (
                <span className="ml-2 text-lg text-gray-700">{phone}</span>
              )}
              <span className="ml-2 text-gray-500 cursor-pointer" onClick={() => setEditPhone(!editPhone)}>
                <FontAwesomeIcon icon={editPhone ? faSave : faPencilAlt} />
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              Year:
              {editYear ? (
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={year}
                  onChange={(e) => handleInputChange(setYear, e.target.value)}
                />
              ) : (
                <span className="ml-2 text-lg text-gray-700">{year}</span>
              )}
              <span className="ml-2 text-gray-500 cursor-pointer" onClick={() => setEditYear(!editYear)}>
                <FontAwesomeIcon icon={editYear ? faSave : faPencilAlt} />
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              LinkedIn:
              {editLinkedin ? (
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={linkedin}
                  onChange={(e) => handleInputChange(setLinkedin, e.target.value)}
                />
              ) : (
                <span className="ml-2 text-lg text-gray-700">{linkedin}</span>
              )}
              <span className="ml-2 text-gray-500 cursor-pointer" onClick={() => setEditLinkedin(!editLinkedin)}>
                <FontAwesomeIcon icon={editLinkedin ? faSave : faPencilAlt} />
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              GitHub:
              {editGithub ? (
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={github}
                  onChange={(e) => handleInputChange(setGithub, e.target.value)}
                />
              ) : (
                <span className="ml-2 text-lg text-gray-700">{github}</span>
              )}
              <span className="ml-2 text-gray-500 cursor-pointer" onClick={() => setEditGithub(!editGithub)}>
                <FontAwesomeIcon icon={editGithub ? faSave : faPencilAlt} />
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
