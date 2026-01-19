import {
  getFileExtension,
  getFileType,
  formatFileSize,
  formatDate,
} from "../services/everythingApi";
import "./FileItem.css";

function FileItem({ item, onOpen }) {
  const isFolder = item.type === "folder";
  const extension = isFolder ? "" : getFileExtension(item.name);
  const fileType = isFolder ? "folder" : getFileType(extension);

  const handleClick = () => {
    if (onOpen) {
      onOpen(item);
    }
  };

  return (
    <tr className="file-item" onClick={handleClick}>
      <td className="file-name">
        <div className="file-name-content">
          <span className={`file-icon file-icon-${fileType}`}>
            {getIcon(fileType)}
          </span>
          <span className="file-name-text">{item.name}</span>
        </div>
      </td>
      <td className="file-path" title={item.path}>
        {item.path || "--"}
      </td>
      <td className="file-size">{formatFileSize(item.size)}</td>
      <td className="file-date">{formatDate(item.date_modified)}</td>
    </tr>
  );
}

function getIcon(type) {
  const icons = {
    folder: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2Z" />
      </svg>
    ),
    pdf: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
        <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="7" y="17" fontSize="6" fill="white" fontWeight="bold">
          PDF
        </text>
      </svg>
    ),
    document: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
        <path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    ),
    image: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
        <path
          d="M21 15l-5-5L5 21"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    ),
    video: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <polygon points="10,8 16,12 10,16" fill="white" />
      </svg>
    ),
    audio: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" fill="white" />
      </svg>
    ),
    archive: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16v16H4z" />
        <path
          d="M8 4v16M12 8h4M12 12h4M12 16h4"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
        <path
          d="M9 13l-2 2 2 2M15 13l2 2-2 2"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    ),
    executable: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
        <path
          d="M12 11v6M9 14l3-3 3 3"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M12 2v3M12 19v3M2 12h3M19 12h3"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    ),
    file: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
        <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  };

  return icons[type] || icons.file;
}

export default FileItem;
