import { useState } from "react";

export default function FolderImage() {
  const [hover, setHover] = useState(false);

  return (
    <img
      src={
        hover
          ? "/assets/img/folders/folder-open.png"
          : "/assets/img/folders/folder-closed.png"
      }
      alt="Folder"
      className="image-border image-hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
}
