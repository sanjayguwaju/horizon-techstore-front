import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import CSS styles

const MyGallery = () => {
  const images = [
    {
      original:
        "https://res.cloudinary.com/dz3facqgc/image/upload/v1710342430/tny2vwftcqlmbn4cphrx.jpg",
      thumbnail:
        "https://res.cloudinary.com/dz3facqgc/image/upload/v1710342430/tny2vwftcqlmbn4cphrx.jpg",
      originalHeight: 600, // Specify the height of the original image
      originalWidth: 1000, // Specify the width of the original image
      thumbnailHeight: 100, // Specify the height of the thumbnail
      thumbnailWidth: 100, // Specify the width of the thumbnail
    },
    {
      original:
        "https://res.cloudinary.com/dz3facqgc/image/upload/v1710342484/skppqjtcalwpqrqzzxxp.jpg",
      thumbnail:
        "https://res.cloudinary.com/dz3facqgc/image/upload/v1710342484/skppqjtcalwpqrqzzxxp.jpg",
      originalHeight: 600,
      originalWidth: 1000,
      thumbnailHeight: 100, // Specify the height of the thumbnail
      thumbnailWidth: 100, // Specify the width of the thumbnail
    },
  ];

  return (
    <>
      <div>
        <ImageGallery
          items={images}
          showThumbnails={true}
          showNav={false}
          autoPlay={false}
          slideInterval={5000}
          showFullscreenButton={false} // Hide fullscreen button
          showPlayButton={false} // Hide pause/play button
        />
      </div>
    </>
  );
};

export default MyGallery;
