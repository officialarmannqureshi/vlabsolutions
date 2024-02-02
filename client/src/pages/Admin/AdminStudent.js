import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Client, Storage, ID } from "appwrite";
import { baseUrl } from "../../private";
const AdminStudent = () => {
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(baseUrl+'/api/v1/auth/getall/').then((res) => setData(res.data));
  };



  useEffect(() => {
    fetchInfo();
  }, []);

  const [file, setFile] = useState(null);
  const [auth] = useAuth();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65bcc6ec62054d208033');

  const handleSubmit = async (event) => {

    const storage = new Storage(client);
    
      try {
        const result = await storage.createFile(
          '65bcc73d019025fba4b5',
          ID.unique(),
          file
        );
        console.log(result);

    
        const pathPromise = storage.getFileView('65bcc73d019025fba4b5', result.$id);
        let path;
        const response = await pathPromise;
        path = response.href;

     
       
    document.getElementById('students-file').value = '';
    document.getElementById('onsubmitted').innerHTML =
      'File has been uploaded successfully';

    setTimeout(() => {
      document.getElementById('onsubmitted').style.display = 'none';
    }, 2000);
    event.preventDefault();

    const formData = {
      'path': path,
      'uploadedby': auth?.user?.name,
      'id': auth?.user?.id,
    };

    axios
      .post(baseUrl+'/api/v1/auth/uploadall/', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error in Axios POST request:', error);
      });
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <Layout>
      <div className='student-container'>
      <div className='container-fluid' >
        <div className='row mt-5'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div
            className='col-md-9 content-box '
            style={{ textAlign: 'center' }}
          >
            <div className='text-center'>
              {/* Student upload section */}
              <div
                className='student-bulk-upload'
                style={{
                  borderRadius: '10px',
                  border: '#4d385f dashed',
                  padding: '2rem 2rem',
                  paddingLeft: '15rem',
                  paddingRight: '15rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  gap: '1rem',
                }}
              >
                <p style={{ fontSize: '25px', fontWeight: 'bold',width:'100%' }}>
                  Drop files here
                </p>
                <p style={{ font: 'Poppins', fontSize: '13px' }}>
                  File format should be .csv
                </p>
                <input
                  name='student-file'
                  type='file'
                  onChange={handleFileChange}
                  required
                  id='students-file'
                  style={{ marginBottom: '1rem' }}
                  className='input-file'
                ></input>
                <button
                  type='button'
                  className='btn btn-primary student-button'
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
          </div>

         
        </div>
        <div className='col-md' style={{width:'100%'}}>
            <div className='row-students'>
            {data.studentsData && data.studentsData.map((student, index) => (
                <div className='col-' key={index}>
                  <div className='card grid-items'>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        {student['First Name']} {student['Last Name']}
                      </h5>
                      <p className='card-text'>
                        Roll no: {student['Roll no']}
                      </p>
                      <p className='card-text'>
                        Course: {student['Course opted']}
                      </p>
                      <p className='card-text'>
                        Email ID: {student['Email ID']}
                      </p>
                      <p className='card-text'>
                        Mobile No: {student['Mobile No']}
                      </p>
                      <p className='card-text'>
                        Mentor Name: {student['Mentor Name']}
                      </p>
                      <p className='card-text'>
                        Parent Number: {student['Parent Mobile No']}
                      </p>
                      <p className='card-text'>
                        Graduation Year: {student['Year of Graduation']}
                      </p>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>

          
          </div>
      </div>
      </div>
    </Layout>
  );
};

export default AdminStudent;
