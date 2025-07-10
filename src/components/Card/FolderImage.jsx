import { useState } from "react";

export default function FolderImage({ thumbnail }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="folder-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={
          hover
            ? "/assets/img/folders/folder-open.png"
            : "/assets/img/folders/folder-closed.png"
        }
        alt="Folder"
        className="folder-base"
      />

      {hover && (
        <img
          src={thumbnail}
          alt="Product Thumbnail"
          className="folder-thumbnail"
        />
      )}
    </div>
  );
}
