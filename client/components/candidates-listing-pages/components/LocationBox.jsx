import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../../features/filter/candidateFilterSlice";

const LocationBox = () => {
    const { location } = useSelector((state) => state.candidateFilter) || {};
    const [getLocation, setLocation] = useState(location);
    const dispatch = useDispatch(); // Fixed typo from 'dispath' to 'dispatch'

    // Location handler
    const locationHandler = (e) => {
        setLocation(e.target.value);
    };

    // Location dispatch
    useEffect(() => {
        dispatch(addLocation(getLocation)); // Update Redux state
    }, [dispatch, getLocation]); // Removed 'addLocation' from dependencies

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder="City or postcode"
                value={getLocation} // Bind to local state
                onChange={locationHandler} // Handle input change
            />
            <span className="icon flaticon-map-locator"></span>
        </>
    );
};

export default LocationBox;
