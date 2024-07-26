import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import userCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolder from "../hooks/useGetFileFolder";
import { useRef } from "react";
import useUploadFile from "../hooks/useUploadFile";
import { FaFolderClosed } from "react-icons/fa6";
import { TbFileFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import './CSS/HomePage.css'
import Footer from "./Footer";
import useDeleteFolder from "../hooks/useDeleteFolder";
import useViewFile from "../hooks/useViewFile";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
  const [newFolder, setNewFolder] = useState("");
  const [showCreateFolder, setshowCreateFolder] = useState(false);
  const { createFolder } = userCreateFolder();
  const { getFileFolders, fileFolders } = useGetFileFolder();

  const [folderStructure, setFolderStructure] = useState([
    { _id: null, name: "Cloud Home" },
  ]);
  const parentFolder = folderStructure[folderStructure.length - 1];

  const inputRef = useRef(null);

  const handleDoubleClick = (elem) => {
    // console.log("hiii");
    if(elem.type=='folder'){
    setFolderStructure([...folderStructure, elem]);
    }
    if(elem.type=='file'){
      handleViewFile(elem.name)
    }
  };

  const handleAllowCreateFolder = () => {
    setshowCreateFolder(true);
  };

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({ name: newFolder, parentId: parentFolder._id });
      getFileFolders(parentFolder._id);
      setshowCreateFolder(false);
      setNewFolder("");
    }
  };

  const{deleteFolder}=useDeleteFolder();

  const handleDeleteFolder=async(name)=>{
    // {console.log(name);}
   await deleteFolder({name, parentId: parentFolder._id});
   getFileFolders(parentFolder._id);
  }

  const hideCreateFolder=()=>{
    setshowCreateFolder(false);
    setNewFolder("");
  }

  const {isUploadAllowed,uploadFile}=useUploadFile();

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter(
      (elem, idx) => idx <= clickIdx
    );
    setFolderStructure(newFolderStructure);
  };

  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({
        file:file[0],
        parentId:parentFolder._id    
      });
      getFileFolders(parentFolder._id);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } else {
      alert("Uploading is already in progress. Please wait...");
    }
  };

  const {viewFile}=useViewFile();
  const navigate=useNavigate();

 const handleViewFile=async(name)=>{

  await viewFile({name, parentId: parentFolder._id})
  // console.log(name);
  // console.log( parentFolder._id);


 }


  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [folderStructure]);
  return (


<>
  <NavBar />
  <div className="home-page-main-container">
    <h1>Welcome to Cloud Home</h1>
    <h4>Cloud Home</h4>
    <button onClick={handleAllowCreateFolder}>Create Folder</button>
    <input
      className="file-upload-input"
      ref={inputRef}
      type="file"
      onChange={handleFileUpload}
    />
    <ul className="home-page-folder-list">
      {folderStructure.map((elem, idx) => (
        <li key={idx} onClick={() => handleBackClick(idx)}>
          {elem.name}
        </li>
      ))}
    </ul>
    {showCreateFolder && (
      <div className="home-page-create-folder-container">
        <input
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
        />
        <button onClick={handleCreateFolder}>Yes</button>
        <button onClick={hideCreateFolder}>No</button>
      </div>
    )}

    <div className="home-page-file-folders">
      {fileFolders.map((elem) => (

        <div
          key={elem.id}
          className={`home-page-file-folder ${elem.type}`}
          onDoubleClick={() => handleDoubleClick(elem)}
        >
          {elem.type === 'file' ? <TbFileFilled className="icon" /> : <FaFolderClosed className="icon" />}
          {/* {console.log(elem.type)} */}
          {elem.name}
          <MdDelete  className="icon"  onClick={()=>handleDeleteFolder(elem.name)}/>

        </div>
      ))}
    </div>
  </div>
  <Footer />
</>


  
  );
};

export default Homepage;
