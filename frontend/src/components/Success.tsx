import { FaCheckCircle } from "react-icons/fa";

export default function Success({ success } : { success: null | string }) {
  if (success) {
    return (
      <div className="success-container">
          <span>            
              <FaCheckCircle  size={35}/>
              <h2>Success!</h2>
          </span>
          <p>{success}</p>
      </div>
    );
  }
  return null;
}