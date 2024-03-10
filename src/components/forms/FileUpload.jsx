import { useRef } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge, Flex, Button} from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileInput = useRef();

  const handleClick = () => {
    fileInput.current.click();
  };

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

  const handleImageRemove = async (public_id) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      );

      const { images } = values;
      let filteredImages = images.filter((item) => {
        return item.public_id !== public_id;
      });

      setValues({ ...values, images: filteredImages });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Flex align="center" gap="middle">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </Flex>
      <Flex>
        <Button type="dashed" onClick={handleClick}>
          Choose File
        </Button>
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
          ref={fileInput}
        />
        {/* <label className="btn btn-primary">Choose File</label> */}
      </Flex>
    </>
  );
};

export default FileUpload;
