import React from 'react';
import NavBar from './NavBar';
import useViewFile from '../hooks/useViewFile';

const ViewFile = () => {
  const { fileLink } = useViewFile();  
  console.log(fileLink);

  return (
    <>
      <NavBar />
      <h1>Welcome to view Page</h1>
      <h1>File Link is {fileLink}</h1>
    </>
  );
};

export default ViewFile;
