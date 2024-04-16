import { MdErrorOutline } from "react-icons/md";

export default function Error({ error } : { error: Error | null}) {
    if (error) {
      return (
        <div className="error-container">
            <span>            
                <MdErrorOutline size={35}/>
                <h2>An error occured:</h2>
            </span>
            <p>{error.message}</p>
        </div>
      );
    }
  
    return null;
  }