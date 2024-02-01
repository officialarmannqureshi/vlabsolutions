import axios from 'axios';
import React, {useEffect, useState} from 'react'

import Layout from '../../components/Layouts/Layout';

// import { NavLink } from 'react-router-dom';
const Assignment = () => {
    const [assignmentData, setAssignmentData] = useState(null);
    const [loading,setLoading] = useState(true);

    const fetchData1 = async () => {
      try {
        const response = await axios.get('/api/v1/auth/getallassignments');
        setAssignmentData(response.data);
        console.log(assignmentData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignment data:', error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        await fetchData1();
      };
    
      fetchData();
    }, []);
    
    
    let count = 0;
    let submitcount=0;
//dummy

// const onButtonClick = () => {
     
//   // using Java Script method to get PDF file
//   fetch(`${assignmentData.result[0].path}`).then((response) => {
//       response.blob().then((blob) => {
       
//           // Creating new object of PDF file
//           const fileURL =
//               window.URL.createObjectURL(blob);
//               console.log(fileURL)
               
//           // Setting various property values
//           let alink = document.createElement("a");
//           alink.href = fileURL;
//           alink.download = "SamplePDF.pdf";
//           alink.click();
//       });
//   });
// };



    function countPendingObjects(AssignmentDetails) {
      
        
      for (let i = 0; i < totalAssigned; i++) {
        if (AssignmentDetails[i].status === 'Pending') {
          count++;
        }
        if(AssignmentDetails[i].status === 'Submitted')
        submitcount++;
      }
  
    }
    console.log(count,submitcount);
    
    const totalAssigned = assignmentData?.result?.length || 0;
    const AssignmentDetails = assignmentData?.result || [];
    
    countPendingObjects(AssignmentDetails);
    const totalPending = count;
    const totalSubmitted=submitcount;
    /* Handle Status button */
    // const handleStatus= (event)=>{

    // }

    /* Date format to DD/MM/YYYY */

    function formatDate(isoDate){
        const options= {day:'numeric',month:'long',year:'numeric'};
        return new Date(isoDate).toLocaleString(undefined, options);
    }

    function handleDownload(e) {
      const filename = e.target.name;
      const fileURL = `${process.env.PUBLIC_URL}/assignments/${filename}`;
      console.log(e.target.href)
      // const link = document.createElement('a');
      // link.href = fileURL;
      // link.download = filename;
      // link.click();
    }

    

  return (
    <Layout title={"Assignment - Vlab Solutions"}>
    <div className='assignment-container-main'>
        <div className='assignment-container mt-3'>
        <div className='assign-dashboard'>
            <p className='assignment-title'>Total Assigned</p>
            <p className='assignment-total'>{totalAssigned}</p>
            <p className='assignment-status'>Last updated today</p>

        </div>
        <div className='assign-dashboard'>
            <p className='assignment-title'>Total Pending</p>
            <p className='assignment-total'>{totalPending}</p>
            <p className='assignment-status'>Last updated today</p>

        </div>
        <div className='assign-dashboard-3 '>
            <p className='assignment-title'>Total Submitted</p>
            <p className='assignment-total'>{totalSubmitted}</p>
            <p className='assignment-status'>Last updated today</p>

        </div>
        </div>

        <div className='assignments-detail-container'>
          
            <div className='col'>
            {loading ? (
              <p className='loading'>Loading...</p>
            ) : (
                assignmentData?.result?.map((assignment, index) => (
                  
                <div className='row' key={index}  >

                  <div className='assignment-small-container-1'>
                    {/* <NavLink className="" activeClassName="is-active" to="/Workspace"> */}
                    <a href='/assignments/C1_W1.pdf' target='_blank'>
                      
                    <p className='assignment-name'>{assignment['filename']}</p>
                    </a>
                    {/* </NavLink> */}
                    {/* Display formatted date here */}
                    <p className='assignment-date'>uploaded on {formatDate(assignment['updatedAt'])}</p>
                  </div>
                  <div className='assignment-small-container-2'>
                    <button className='assignment-status' id='status' onClick={null} >
                      {assignment['status']}
                    </button>
                    <a className='assignment-download' name={assignment['filename']} href={`/assignments/${assignment['filename']}`} download={`/assignments/${assignment['filename']}`} onClick={handleDownload}>
                      Download
                    </a>
                
                  </div>
                </div>
              ))
            )}
                
               
            </div>
        </div>
    </div>

    </Layout>
  )
}

export default Assignment;
