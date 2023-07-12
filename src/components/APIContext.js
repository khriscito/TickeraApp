import React, { createContext, useState, useEffect } from 'react';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [thirdData, setThirdData] = useState([]);
  const [fourthData, setFourthData] = useState([]);

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

          const thirdFourthPromises = data.events.map(async (event) => {
            const thirdApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ventaresumen&key=${token}&id_event=${event.id_event}`;
            const fourthApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/incomesresumen&key=${token}&id_event=${event.id_event}`;

            const [thirdResponse, fourthResponse] = await Promise.all([
              fetch(thirdApiUrl),
              fetch(fourthApiUrl)
            ]);

            const thirdData = await thirdResponse.json();
            const fourthData = await fourthResponse.json();

            return { thirdData, fourthData };
          });

          const thirdFourthData = await Promise.all(thirdFourthPromises);

          const thirdDataArray = [];
          const fourthDataArray = [];

          thirdFourthData.forEach(({ thirdData, fourthData }) => {
            thirdDataArray.push(thirdData);
            fourthDataArray.push(fourthData);
          });

          setThirdData(thirdDataArray);
          setFourthData(fourthDataArray);
        }
      } catch (error) {
        // Manejar el error aquí
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
    setThirdData([]);
    setFourthData([]);
  };

  return (
    <APIContext.Provider
      value={{
        token,
        setToken,
        events,
        secondData,
        thirdData,
        fourthData,
        logout,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
