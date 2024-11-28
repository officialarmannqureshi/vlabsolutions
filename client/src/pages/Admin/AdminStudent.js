import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Client, Storage, ID } from "appwrite";

const AdminStudent = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [auth] = useAuth();

  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

  useEffect(() => {
    const fetchInfo = () => {
      return axios.get(`api/v1/auth/getall/`).then((res) => setData(res.data));
    };
    fetchInfo();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const bucketId = process.env.REACT_APP_APPWRITE_STUDENT_BID; // Correct bucket ID for students


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Handling submission");

    if (!bucketId) {
      console.error("Bucket ID is missing");
      return;
    }

    const storage = new Storage(client);
    try {
      const result = await storage.createFile(process.env.REACT_APP_APPWRITE_STUDENT_BID, ID.unique(), file);
      const fileId = result.$id;
      const fileDownloadLink = storage.getFileDownload(process.env.REACT_APP_APPWRITE_STUDENT_BID, fileId);
     
      document.getElementById("students-file").value = "";
      document.getElementById("onsubmitted").innerHTML = "File has been uploaded successfully";

      setTimeout(() => {
        document.getElementById("onsubmitted").style.display = "none";
      }, 2000);

      // Create FormData object with file and path information
      const data = {
        "student-file": fileDownloadLink,  // URL of the uploaded file
        uploadedby: auth?.user?.name,      // Name of the user uploading the file
        id: auth?.user?.id,                // User ID
        path: fileDownloadLink             // Path (could be file URL or path)
      };

      axios
        .post(`api/v1/auth/uploadall/`, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error in Axios POST request:", error);
        });
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <Layout>
      <div className="student-container">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 content-box" style={{ textAlign: "center" }}>
              <div className="text-center">
                {/* Student upload section */}
                <div
                  className="student-bulk-upload"
                  style={{
                    borderRadius: "10px",
                    border: "#4d385f dashed",
                    padding: "2rem 2rem",
                    paddingLeft: "15rem",
                    paddingRight: "15rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    gap: "1rem",
                  }}
                >
                  <p style={{ fontSize: "25px", fontWeight: "bold", width: "100%" }}>Drop files here</p>
                  <p style={{ font: "Poppins", fontSize: "13px" }}>File format should be .csv</p>
                  <input
                    name="student-file"
                    type="file"
                    onChange={handleFileChange}
                    required
                    id="students-file"
                    style={{ marginBottom: "1rem" }}
                    className="input-file"
                  />
                  <button
                    type="button"
                    className="btn btn-primary student-button"
                    onClick={handleSubmit}
                  >
                    Upload
                  </button>
                  <p id="onsubmitted"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md" style={{ width: "100%" }}>
            <div className="row-students">
              {data.studentsData &&
                data.studentsData.map((student, index) => (
                  <div className="col-" key={index}>
                    <div className="card grid-items">
                      <div className="card-body">
                        <h5 className="card-title">{student["First Name"]} {student["Last Name"]}</h5>
                        <p className="card-text">Roll no: {student["Roll no"]}</p>
                        <p className="card-text">Course: {student["Course opted"]}</p>
                        <p className="card-text">Email ID: {student["Email ID"]}</p>
                        <p className="card-text">Mobile No: {student["Mobile No"]}</p>
                        <p className="card-text">Mentor Name: {student["Mentor Name"]}</p>
                        <p className="card-text">Parent Number: {student["Parent Mobile No"]}</p>
                        <p className="card-text">Graduation Year: {student["Year of Graduation"]}</p>
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
