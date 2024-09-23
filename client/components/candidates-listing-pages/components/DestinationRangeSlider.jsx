import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { addDestination } from "../../../features/filter/candidateFilterSlice";

const DestinationRangeSlider = () => {
    const { destination } = useSelector((state) => state.candidateFilter);
    const [getDestination, setDestination] = useState({
        min: destination.min,
        max: destination.max,
    });

    const dispatch = useDispatch();

    // Handle changes to the slider
    const handleOnChange = (value) => {
        setDestination(value); // Update local state
        dispatch(addDestination(value)); // Dispatch to Redux
    };

    // Update local state when destination from Redux changes
    useEffect(() => {
        setDestination(destination); // Sync local state with Redux state
    }, [destination]); // Add destination as a dependency

    return (
        <div className="range-slider-one">
            <InputRange
                formatLabel={() => ``} // Custom label formatting
                minValue={0}
                maxValue={100}
                value={getDestination} // Controlled input
                onChange={handleOnChange} // Handle changes
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="area-amount">{getDestination.max}</span>
                    km
                </div>
            </div>
        </div>
    );
};

export default DestinationRangeSlider;
