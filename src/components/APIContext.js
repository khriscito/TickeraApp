import React, { createContext, useState, useEffect, useNavigation } from 'react';
import { event } from 'react-native-reanimated';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [nameLastname, setNameLastname] = useState(null);
  const [events, setEvents] = useState([]);
  const [readyEvents, setReadyEvents] = useState(false);
  const [secondData, setSecondData] = useState([]);
  //const navigation = useNavigation();

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
          //setEvents([]);
          setReadyEvents(true);
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
    setNameLastname(null);
    setEvents([]);
    setSecondData([]);
  };
  console.log(token)

  const http = (controller='',params= {} , isAuth = false) => {
      return new Promise(async(resolve, reject) => {
          try{

            let url = `https://makeidsystems.com/makeid/index.php?r=${controller}`

            for(let key in params) {
              url += `&${key}=${params[key]}`
            }
              if(isAuth){
                if(!token){
                  //navigation.navigate('Main');
                }
                
                url += `&key=${token}`
              }
              const response = await fetch(url);
              const res = await response.json();

                
              resolve(res)
          }catch(e){
              reject(e)
          }
      })

  }
  return (
    <APIContext.Provider
      value={{
        token,
        setToken,
        nameLastname,
        setNameLastname,
        events,
        secondData,
        logout,
        http,
        readyEvents
      }}
    >
      {children}
    </APIContext.Provider>
  );
};



