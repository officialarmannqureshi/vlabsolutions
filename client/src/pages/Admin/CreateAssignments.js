import React, { useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';

const CreateAssignments = () => {
  const [auth] = useAuth();
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleText = (event) => {
    setAssignment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById('onsubmitted').innerHTML='File uploaded successfully';
    setTimeout(()=>{
      document.getElementById('onsubmitted').style.display='none';
    },2000);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadedby', auth?.user?.name);
    formData.append('assignment', assignment);
    formData.append('id', auth?.user?.id);

    axios
      .post('/api/v1/auth/create-assignment/', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error in Axios POST request:', error);
      });
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
