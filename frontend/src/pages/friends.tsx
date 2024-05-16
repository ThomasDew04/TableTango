import { memo } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";

export default memo(function Friends() {


    return (
        <div className="friends-page">
            <BreadCrumb page="Friends" />
        </div> 
    );
});