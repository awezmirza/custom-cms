import "../styles/shimmer.css";

const Shimmer = ({ styleClass }) => {
    return <div className={"shimmer " + (styleClass ? styleClass : "")}></div>;
};

export default Shimmer;
