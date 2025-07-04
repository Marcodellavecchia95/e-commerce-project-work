export default function Card({ title, children, bottomMessage }) {
  return (
    <div className="website-card container">
      {/* TOP BAR */}
      <div className="website-card-top flex">
        <div className="card-name flex">
          <img
            src="src/assets/img/folders/folder-closed.png"
            alt="Folder chiuso"
          />
          <h4>{title}</h4>
        </div>
        <div className="card-icons">
          <img src="src/assets/img/buttons/btn-exit.png" alt="Chiudi" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="website-card-content">{children}</div>

      {/* BOTTOM BAR */}
      <div className="website-card-bottom flex">
        <p>{bottomMessage}</p>
        <img
          src="src/assets/img/menu_icons/menu-bottom-card-dots.png"
          alt="End card dots"
        />
      </div>
    </div>
  );
}
