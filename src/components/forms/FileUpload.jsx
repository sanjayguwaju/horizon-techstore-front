import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

const fileUploadAndResize = async (e) => {
  let files = e.target.files;
  let allUploadedFiles = values.images;

  if (files) {
    setLoading(true);
    for (let i = 0; i < files.length; i++) {
      try {
        const uri = await new Promise((resolve, reject) => {
          Resizer.imageFileResizer(
            files[i],
            720,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
              resolve(uri);
            },
            (err) => {
              reject(err);
            },
            "base64"
          );
        });

        const res = await axios.post(
          `${process.env.REACT_APP_API}/uploadimages`,
          { image: uri },
          {
            headers: {
              authtoken: user ? user.token : "",
            },
          }
        );
        // console.log("IMAGE UPLOAD RES DATA", res);
        allUploadedFiles.push(res.data);
        setValues({ ...values, images: allUploadedFiles });
        setLoading(false);
      } catch (err) {
        console.log("CLOUDINARY UPLOAD ERR", err);
        setLoading(false);
      }
    }
  }
};

  return (
    <div className="row">
      <label className="btn btn-primary">
        Choose File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
