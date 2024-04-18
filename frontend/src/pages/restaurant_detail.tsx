import { memo } from "react";

export default memo(function Restaurant() {

    return (
        <div className="restaurants-page">
            <div className="breadcrumb">
                <div className="bc-det">
                    <h1>Restaurant</h1>
                    <button className="fav-btn">Add to favorites</button>
                </div>
                <span />
            </div>
        </div>
    )
});