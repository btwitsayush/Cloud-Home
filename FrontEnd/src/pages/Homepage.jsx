import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import userCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolder from "../hooks/useGetFileFolder";
import { useRef } from "react";
import useUploadFile from "../hooks/useUploadFile";
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
    } else {
      alert("Uploading is already in progress. Please wait...");
    }
  };

  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [folderStructure]);
  return (
    <>
      <NavBar />
      <div className="homepage-main-container">
        <h1>Welocme to home page</h1>
        <h4>Cloud Home</h4>
        <button onClick={handleAllowCreateFolder}>Create Folder</button>
        <input
          className="file-upload-input"
          ref={inputRef}
          type="file"
          onChange={handleFileUpload}
        />
        <ul style={{ display: "flex", padding: "24px", gap: "24px" }}>
          {folderStructure.map((elem, idx) => {
            return <li onClick={() => handleBackClick(idx)}>{elem.name}</li>;
          })}
        </ul>
        <div>
          {showCreateFolder && (
            <div>
              <input
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />
              <button onClick={handleCreateFolder}>Yes</button>
              <button>No</button>
            </div>
          )}
        </div>
        <div>
          {fileFolders.map((elem) => {
            return (
              <div onDoubleClick={() => handleDoubleClick(elem)}>
                {elem.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
