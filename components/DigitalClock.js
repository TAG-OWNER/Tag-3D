import React, { useState, useEffect } from "react";

const DigitalClock = () => {
    const [timeZones, setTimeZones] = useState({});
    
    useEffect(() => {
        const fetchTimeZones = () => {
            const now = new Date();
            const timeZonesList = {
                "UTC": now.toISOString(),
                "EST": new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"})).toISOString(),
                "CST": new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"})).toISOString(),
                "MST": new Date(now.toLocaleString("en-US", {timeZone: "America/Denver"})).toISOString(),
                "PST": new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})).toISOString(),
                // Add more time zones as needed
            };
            setTimeZones(timeZonesList);
        };

        fetchTimeZones();
        const interval = setInterval(fetchTimeZones, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {Object.entries(timeZones).map(([zone, time]) => (
                <div key={zone}>
                    <h2>{zone}: {new Date(time).toUTCString()}</h2>
                </div>
            ))}
        </div>
    );
};

export default DigitalClock;
