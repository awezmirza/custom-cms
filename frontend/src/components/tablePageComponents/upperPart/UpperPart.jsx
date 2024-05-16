import "../../../styles/tablePageStyles/upperPart.css";
import TableButtonsContainer from "./TableButtonsContainer";
import TableIdContainer from "./TableIdContainer";
import TableNameContainer from "./TableNameContainer";
const UpperPart = () => {
    return (
        <div className="upper-part-container">
            <div className="upper-part-left-part">
                <TableNameContainer />
                <TableIdContainer />
            </div>
            <div className="upper-part-right-part">
                <TableButtonsContainer />
            </div>
        </div>
    );
};

export default UpperPart;
