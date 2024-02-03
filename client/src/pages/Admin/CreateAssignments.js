/**
 * The above code is a React component that allows users to create assignments by either uploading a
 * file or writing the assignment text directly.
 * @returns The CreateAssignments component is being returned.
 */
import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Client, Storage, ID } from "appwrite";
import { baseUrl } from "../../private";
import "../../styles/responsive css/create_assignment.css";
const CreateAssignments = () => {
  const [auth] = useAuth();
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleText = (event) => {
    setAssignment(event.target.value);
  };

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65bcc6ec62054d208033");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storage = new Storage(client);

    try {
      let filename="";
      let pathPromise;
      let path="";
      if (file) {
        const result = await storage.createFile(
          "65bcc751b7e1e479a0e7",
          ID.unique(),
          file
        );

        filename = result.name;

        pathPromise = storage.getFileView("65bcc751b7e1e479a0e7", result.$id);
      }

      try {
        const response = await pathPromise;
        path = response ? response.href : null;
        document.getElementById("onsubmitted").innerHTML =
          "File uploaded successfully";
        setTimeout(() => {
          document.getElementById("onsubmitted").style.display = "none";
        }, 2000);

        const formData = {
          path: path,
          filename: filename,
          uploadedby: auth?.user?.name,
          assignment: assignment,
          id: auth?.user?.id,
        };

        axios
          .post(baseUrl + "/api/v1/auth/create-assignment/", formData)
          .then((response) => {
            console.log("file uploaded with success");
          })
          .catch((error) => {
            console.error("Error in Axios POST request:", error);
          });
      } catch (error) {
        console.log(error); // Handle the error appropriately
      }
    } catch (error) {
      console.log(error); // Handle the error appropriately
      return;
    }
  };

  return (
    <Layout>
      <div className="">
        <div className="assign-title center ">
          <div className="text-center">
            <div className="assign-title-name ">
              <div className="item1 assign-title-item text-center">
                Total Uploaded{" "}
                <span className="assign-span">
                  <p className="assigned">0</p>
                </span>
              </div>
              <div className="item2 assign-title-item text-center">
                Total Assigned{" "}
                <span className="assign-span">
                  <p className="assigned">0</p>
                </span>
              </div>
              <div className="item3 assign-title-item text-center">
                Total Marked{" "}
                <span className="assign-span">
                  <p className="assigned">0</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        <form className="" encType="multipart/form-data">
          <div>
            <div className="input-container">
              <label className="assign-label-1">
                Write or Upload the questions here!
              </label>
              <input
                type="file"
                className="form-control assign-label-1"
                id="customFile"
                name="file"
                onChange={handleFileChange}
              />
              <p className="text-center question-bank">
                Write problems here if you don't want to upload a file.
              </p>
            </div>
            <div className="assign-form-div-1">
              <textarea
                cols={150}
                rows={10}
                placeholder="Write here"
                autoComplete="on"
                className="assign-textarea"
                onChange={handleText}
                value={assignment}
                name="assignment"
              ></textarea>
              <button
                type="button"
                className="btn btn-primary assign-button"
                data-toggle="button"
                aria-pressed="false"
                autoComplete="off"
                onClick={handleSubmit}
              >
                Upload
              </button>
              <p id="onsubmitted"></p>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAssignments;
