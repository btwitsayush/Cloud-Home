import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const useViewFile = () => {
  const { token } = useSelector((e) => e.auth);
  const [fileLink, setFileLink] = useState("");

  const viewFile = async ({ name, parentId }) => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file/${parentId}`, {
        method: "POST",
        body: JSON.stringify({ name, parentId }),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      const link = data.data.isfileLinkExist.link;
      console.log("link=", link);
      setFileLink(link);
    } catch (err) {
      console.log(err);
    }
  };

//   using useEffect b/c value of fileLink isn't updating in 1st time when i click on it instead updating in second time
  useEffect(() => {
    console.log("fileLink updated!!!!!=", fileLink);
  }, [fileLink]);

  return { viewFile, fileLink };
};

export default useViewFile;
