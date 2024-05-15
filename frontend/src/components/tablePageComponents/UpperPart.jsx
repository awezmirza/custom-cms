import "../../styles/tablePageStyles/upperPart.css";
import TableIdContainer from "./TableIdContainer";
import TableNameContainer from "./TableNameContainer";
const UpperPart = () => {
    return (
        <div className="upper-part-container">
            <div className="upper-part-left-part">
                <TableNameContainer />
                <TableIdContainer />
            </div>
            <div className="upper-part-right-part">Right</div>
        </div>
    );
};

export default UpperPart;
