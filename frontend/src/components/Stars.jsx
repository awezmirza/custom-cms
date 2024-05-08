import React, { useState } from "react";
import "../styles/stars.css";

const Stars = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    return [...Array(5)].map((_, index) => {
        return (
            <span
                key={index}
                className={`${
                    index + 1 <= rating
                        ? "material-symbols-rounded selectedRating"
                        : "material-symbols-rounded"
                }
                    ${index + 1 <= hoverRating ? "selectedRating" : ""}`}
                onClick={() => setRating(index + 1)}
                onMouseOver={() => setHoverRating(index + 1)}
                onMouseOut={() => setHoverRating(0)}
            >
                star
            </span>
        );
    });
};

export default Stars;
