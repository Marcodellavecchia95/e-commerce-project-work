import { Link } from "react-router";

export default function Card({
  title,
  children,
  bottomMessage,
  linkTo,
  onCloseClick,
}) {
  return (
    <div className="website-card">
      {/* TOP BAR */}
      <div className="website-card-top flex">
        <div className="card-name flex">
          <img
            src="/assets/img/folders/folder-closed.png"
            alt="Folder closed"
          />
          <h4>{title}</h4>
        </div>

        <div className="card-icons">
          <img
            src="/assets/img/buttons/btn-exit.png"
            alt="Chiudi"
            onClick={onCloseClick}
            style={{ cursor: onCloseClick ? "pointer" : "default" }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="website-card-content">
        {linkTo ? <Link to={linkTo}>{children}</Link> : children}
      </div>

      {/* BOTTOM BAR */}
      <div className="website-card-bottom flex">
        <p>{bottomMessage}</p>
        <img
          src="/assets/img/menu_icons/menu-bottom-card-dots.png"
          alt="End card dots"
        />
      </div>
    </div>
  );
}
