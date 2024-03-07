import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const UserDataContext = createContext();

// Create a provider component
export const UserDataProvider = (props) => {
    // Define the state variables
    const [userData, setUserData] = useState({});
    let [announcements, setAnnouncements] = useState([]);
    let [events, setEvents] = useState([]);

    // Define the useEffect hook to make the API request
    useEffect(() => {
        const fetchData = async () => {
            const eventsRes = await axios.get('http://localhost:3000/api/announcements');
            console.log(eventsRes);
            setEvents(eventsRes.data.data);


            const announcementsres = await axios.get('http://localhost:3000/api/announcements');
                setAnnouncements(announcementsres.data.data);

            if (!localStorage.getItem('X-auth-token')) return;
                // console.log(localStorage.getItem('X-auth-token'));
            try {

                
                // Make the API request
                const response = await axios.get('http://localhost:3000/api/student/me', {
                    headers: {
                        'X-auth-token': localStorage.getItem('X-auth-token')
                    }
                });

                // Save the response in userData
                setUserData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    // Define any functions or methods you need

    // Return the provider component with the context value
    return (
        <UserDataContext.Provider value={{ userData, announcements, events }}>
            {props.children}
        </UserDataContext.Provider>
    );
};