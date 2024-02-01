import Editor from "@monaco-editor/react";
import axios from "axios";
import React, {useRef, useState} from "react";

import Layout from "../../components/Layouts/Layout";

const files = {
  "71" : {
    name : "program.py",
    language : "python",
    value : "Write your Python program here",
  },
  "54" : {
    name : "program.cpp",
    language : "cpp",
    value : "Write your C++ program here",
  },
  "50" : {
    name : "program.c",
    language : "c",
    value : "Write your C program here",
  },

  "62" : {
    name : "program.java",
    language : "java",
    value : "Write your Java program here",
  },

};

const Workspace = () => {
  const [fileID, setFileID] = useState(54); // Default to Python
  const [UserInput, setUserInput] = useState("");
  const [outputText, setOutputText] = useState(""); // State to store the output
  const [ExecutionTime, setExecutionTime] = useState(""); // State to store the output
  const [Memory, setMemory] = useState(""); // State to store the output
  
  const editorRef = useRef(null);


  async function handleSubmit() {
    try {
      const program = editorRef.current.getValue();
      if (program === "") {
        alert("Please write a program before submitting.");
        return;
      }
      
      const response = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions',
        {
          source_code: program,
          stdin: UserInput,
          language_id: fileID,
        },
        {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.REACT_APP_JUDGE0IDE_API, // Replace with your RapidAPI Key
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      if (response.status !== 201) {
        alert("Submission failed. Please try again later.");
        return;
      }

      const token = response.data.token;
      console.log(token);
      const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_JUDGE0IDE_API, // Replace with your RapidAPI Key
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      };

      let jsonGetSolution = {
        status: { description: "Queue" },
        stderr: null,
        compile_output: null,
      };
      while (
        jsonGetSolution.status?.description !== "Accepted" &&
        jsonGetSolution.stderr == null &&
        jsonGetSolution.compile_output == null
      ) {
        try {
          const getSolution = await axios.request(options);
          jsonGetSolution = getSolution.data;
          
        } catch (error) {
          console.error(error);
          alert("Error checking submission status.");
          break;
        }
      }
      console.log(jsonGetSolution);
      if (jsonGetSolution.stdout) {
        
        let result=jsonGetSolution.stdout;
        
        setExecutionTime(jsonGetSolution.time);
        setMemory(jsonGetSolution.memory+" Bytes");

        setOutputText(
          `\n${result}\n`
        );
        document.getElementById("status-in").innerHTML=jsonGetSolution.status.description;
       
      } else if (jsonGetSolution.stderr) {
        const error = jsonGetSolution.stderr;
        setOutputText(`Error: ${error}`);
      } else {
        const compilationError = jsonGetSolution.compile_output;
        setOutputText(`Error: ${compilationError}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during submission. Please try again later.");
    }
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <Layout title="Workspace - Vlab Solutions">
      <div className="Problem-Container">
        <div className="Problem-Statement">Problem Statement</div>
        <div className="Input">
          
          <div style={{ height: "85%" }}>
            <Editor
              theme="vs-dark"
              onMount={handleEditorDidMount}
              path={files[fileID].name}
              language={files[fileID].language}
              defaultValue={files[fileID].value}
            />
          </div>
          <div className="Input-in-down">
          <button type="button" class="btn btn-success submit-code" onClick={handleSubmit}>Execute</button>
          <button type="button" class="btn btn-success save-code" onClick={handleSubmit}>Save</button>
          <p className="status-code" id="status-in">Not submitted yet</p>
         
          
          <select className="language-code"onChange={(e) => setFileID(parseInt(e.target.value))}>
            <option value="54">C++</option>
            <option value="50">C</option>
            <option value="62">Java</option>
            <option value="71">Python</option>
          </select>
          </div>

        </div>
        <div className="Output">
          
            <div className="User-input">
              <p className="User-input-title">User Input</p>
            
      
            <textarea placeholder="Enter your input" className="User-input-textarea" onChange={(e) => setUserInput(e.target.value)}></textarea>
            </div>
        

            <div className="Output-in-right">
                <p className="Output-title">Output</p>
                  <div className="output-in-container" id="output-id">
                    {outputText} <br/>
                    <h6>Execution Time:</h6>
                    {ExecutionTime} 
                    <h6>Memory Used:</h6>
                    {Memory}<br/>
                    
                  </div>
            </div>
          
          </div>
      </div>
    </Layout>
  );
};

export default Workspace;
