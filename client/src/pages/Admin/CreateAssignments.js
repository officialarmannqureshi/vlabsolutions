import React, { useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Client, Storage, ID } from "appwrite";

const CreateAssignments = () => {
  const [auth] = useAuth();
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState('');

  // Initialize Appwrite Client
  const client = new Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) 
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); 
    
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleText = (event) => {
    setAssignment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storage = new Storage(client);
    const bucketId = process.env.REACT_APP_APPWRITE_BUCKET_ID; // Bucket ID from .env

    try {
      // Upload file to Appwrite Storage
      const result = await storage.createFile(bucketId, ID.unique(), file);

      const filename = result.name;
      const fileId = result.$id;
      const fileDownloadLink = storage.getFileDownload(bucketId, fileId);
      
    

      // Prepare form data to send to the backend
      const formData = {
        path: fileDownloadLink,
        filename: filename,
        uploadedBy: auth?.user?.name || 'Anonymous',
        assignment: assignment,
        id: auth?.user?.id || 'Unknown',
        status:'Pending'
      };

     

      // Send data to the backend API
      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/create-assignment`, formData);

      // Display success message
      document.getElementById('onsubmitted').innerHTML = 'File uploaded successfully';
      setTimeout(() => {
        document.getElementById('onsubmitted').style.display = 'none';
      }, 2000);

      // Clear the form
      setFile(null);
      setAssignment('');
    } catch (error) {
      console.error('Error uploading file:', error);
      document.getElementById('onsubmitted').innerHTML = 'Error uploading file';
    }
  };


  return (
    <Layout>
      <div className='' >
        <div className='assign-title center '>
          <div className='text-center'>
            <div className='assign-title-name '>
              <div className='item1 assign-title-item text-center'>
                Total Uploaded <span className='assign-span'>0</span>
              </div>
              <div className='item2 assign-title-item text-center'>
                Total Assigned <span className='assign-span'>0</span>
              </div>
              <div className='item3 assign-title-item text-center'>
                Total Marked <span className='assign-span'>0</span>
              </div>
            </div>
          </div>
        </div>

        <form className='' encType='multipart/form-data'>
          <div>
            <label className='assign-label-1'>
              Write or Upload the questions here!
            </label>
            <input
              type='file'
              className='form-control assign-label-1'
              id='customFile'
              name='file'
              onChange={handleFileChange}
            />
            <p className='text-center' style={{ fontSize: '17px' }}>
              or
            </p>
            <div className='assign-form-div-1'>
              <textarea
                cols={150}
                rows={10}
                placeholder='Write here'
                autoComplete='on'
                className='assign-textarea'
                onChange={handleText}
                value={assignment}
                name='assignment'
              ></textarea>
              <button
                type='button'
                className='btn btn-primary assign-button'
                data-toggle='button'
                aria-pressed='false'
                autoComplete='off'
                onClick={handleSubmit}
              >
                Upload
              </button>
              <p id='onsubmitted'></p>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAssignments;
