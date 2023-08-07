import React, { createContext, useState, useEffect } from 'react';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [nameLastname, setNameLastname] = useState(null);
  const [events, setEvents] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [thirdData, setThirdData] = useState([]);
  const [fourthData, setFourthData] = useState([]);
  const [fifthDataArray, setFifthDataArray] = useState([]);
  

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

          const restOfApisPromises = data.events.map(async (event) => {
            const thirdApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ventaresumen&key=${token}&id_event=${event.id_event}`;
            const fourthApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/incomesresumen&key=${token}&id_event=${event.id_event}`;
            const fifthApiUrl = `https://www.makeidsystems.com/makeid/index.php?r=site/reporteriagraficaApi&id_event=${event.id_event}&key=${token}`;
            

            const [thirdResponse, fourthResponse, fifthResponse] = await Promise.all([
              fetch(thirdApiUrl),
              fetch(fourthApiUrl),
              fetch(fifthApiUrl),

            ]);

            const thirdData = await thirdResponse.json();
            const fourthData = await fourthResponse.json();
            const fifthData = await fifthResponse.json();


            return { thirdData, fourthData, fifthData, };
          });

          const restOfApisData = await Promise.all(restOfApisPromises);

          const thirdDataArray = [];
          const fourthDataArray = [];
          const fifthDataArray = [];


          restOfApisData.forEach(({ thirdData, fourthData, fifthData,  }) => { // Update the destructuring here
            thirdDataArray.push(thirdData);
            fourthDataArray.push(fourthData);
            fifthDataArray.push(fifthData);
          });

          setThirdData(thirdDataArray);
          setFourthData(fourthDataArray);
          setFifthDataArray(fifthDataArray);
          
        }
      } catch (error) {
        // Handle the error here
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [token]);

  console.log(token)


  const logout = () => {
    setToken(null);
    setNameLastname(null);
    setEvents([]);
    setSecondData([]);
    setThirdData([]);
    setFourthData([]);
    setFifthDataArray([]);
    
  };

  return (
    <APIContext.Provider
      value={{
        token,
        setToken,
        nameLastname,
        setNameLastname,
        events,
        secondData,
        thirdData,
        fourthData,
        fifthDataArray,
        logout,
        setThirdData
      }}
    >
      {children}
    </APIContext.Provider>
  );
};


