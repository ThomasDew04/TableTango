import { memo } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";

export default memo(function NotFound() {


    return (
        <div className="not-found">
            <BreadCrumb page="Not Found - 404" />
            <p className="nf-info">Sorry, the page you're looking for doesnt exist..</p>
        </div> 
    );
});