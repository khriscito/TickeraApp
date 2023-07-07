import React, { createContext, useState, useEffect } from 'react';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [secondData, setSecondData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = `https://makeidsystems.com/makeid/index.php?r=site/EventUserApi&key=${token}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.success) {
          const secondDataPromise = data.events.map(async (event) => {
            const secondApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ventarordenn&key=${token}&id_event=${event.id_event}`;
            const res = await fetch(secondApiUrl);
            return res.json(); 
          });
          const secondData = await Promise.all(secondDataPromise); 
          setSecondData(secondData); 
          setEvents(data.events);
        } else {
        }
      } catch (error) {
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setEvents([]);
    setSecondData([]);
  };

  return (
    <APIContext.Provider value={{ token, setToken, events, secondData, logout }}>
      {children}
    </APIContext.Provider>
  );
};
