import { useSelector } from "react-redux";
import Shimmer from "../Shimmer";

const TableCount = () => {
    const { userProfileDetails, userDataLoading } = useSelector(
        (state) => state.userDataSlice
    );

    return (
        <div className="table-count-container">
            <h1 className="label">Total Tables:</h1>
            <div className="table-count">
                {userDataLoading ? (
                    <Shimmer />
                ) : (
                    <>{userProfileDetails?.tables.length || 0}</>
                )}
            </div>
        </div>
    );
};

export default TableCount;
