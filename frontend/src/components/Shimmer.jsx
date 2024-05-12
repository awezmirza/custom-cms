import "../styles/shimmer.css";

const Shimmer = ({ styleClass }) => {
    return (
        <div
            className={"shimmer " + (styleClass ? styleClass : "shimmer-size")}
        ></div>
    );
};

export default Shimmer;
