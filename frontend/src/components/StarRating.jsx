import React from "react";
import Stars from "./Stars";
import "../styles/star-rating.css";

const StarRating = () => {
    return (
        <div>
            <div className="rating-wrapper">
                <div className="ratings">
                    <h2 className="current-rating">Rating: 4.5</h2>
                    <h3>
                        <Stars />
                    </h3>
                </div>
                <div className="total-ratings">(Total {0} ratings)</div>
            </div>
        </div>
    );
};

export default StarRating;
