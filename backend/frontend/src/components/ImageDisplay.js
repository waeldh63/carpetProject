// TODO THERE IS AN ERROR WHILE DISPLAYING THE IMG NEED TO RESOLVE IT

import React, { useEffect, useState } from "react";
const ImageDisplay = ({ blobData }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // this function will display the image
    if (blobData && blobData.type === "Buffer" && blobData.data) {
      const uint8Array = new Uint8Array(blobData.data);
      const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    }
  }, [blobData]);
  return (
    <div>
      <img src={imageSrc} alt="Blob Image" />
    </div>
  );
};

export default ImageDisplay;
