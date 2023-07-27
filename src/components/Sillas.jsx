import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { APIContext } from './APIContext';
import DropDownPicker from 'react-native-dropdown-picker';

const Sillas = () => {
  const { events, token } = useContext(APIContext);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [articleDropdownOpen, setArticleDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articulosData, setArticulosData] = useState([]);
  const [showArticleDropdown, setShowArticleDropdown] = useState(false);
  const [sillasImageUrl, setSillasImageUrl] = useState(null);

  useEffect(() => {
    const fetchArticulosData = async () => {
      const data = await Promise.all(
        events.map(async (event) => {
          const articuloApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ArticleEventApi&key=${token}&id_event=${event.id_event}`;
          try {
            const response = await fetch(articuloApiUrl);
            const articulosData = await response.json();
            return { event: event.name, articulosData: articulosData.articulos };
          } catch (error) {
            console.error('Error fetching data for event:', event.name, error);
            return null;
          }
        })
      );
      setArticulosData(data);
    };

    fetchArticulosData();
  }, [events, token]);

  const handleEventChange = (eventValue) => {
    setSelectedEvent(eventValue);
    setSelectedArticle(null); // Reset the selected article when a new event is chosen
    setShowArticleDropdown(true); // Show the article dropdown once an event is selected
  };

  const handleArticleChange = (articleValue) => {
    setSelectedArticle(articleValue);
  };

  const filteredEvents = selectedEvent
    ? events.filter((event) => event.name === selectedEvent)
    : events;

  const dropdownEventItems = events.map((event) => ({
    label: event.name,
    value: event.name,
  }));

  // Filter articles based on selected event
  const dropdownArticleItems = articulosData.find(
    (data) => data && data.event === selectedEvent
  )?.articulosData.map((articulo) => ({
    label: articulo.name,
    value: articulo.id_article.toString(),
  })) || [];

  // Handle the new apiUrl for sillas
  useEffect(() => {
    // Only fetch sillas data if an article is selected
    if (selectedArticle) {
      const fetchSillasData = async () => {
        const sillasApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/EspacioSillas&key=${token}&id_article=${selectedArticle}`;
        console.log(sillasApiUrl);
        try {
          const response = await fetch(sillasApiUrl);
          const sillasData = await response.json();
          console.log('Sillas data:', sillasData.image);

          // Update the image URL state with the fetched URL
          setSillasImageUrl(sillasData.image);
        } catch (error) {
          console.error('Error fetching sillas data:', error);
        }
      };

      fetchSillasData();
    }
  }, [selectedEvent, selectedArticle, token]);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownEvento}>
        <Text style={styles.label}>Seleccione su evento:</Text>
        <DropDownPicker
          open={eventDropdownOpen}
          value={selectedEvent}
          items={dropdownEventItems}
          setOpen={setEventDropdownOpen}
          setValue={handleEventChange}
          placeholder="Seleccione su evento"
          zIndex={1000} // Set a high zIndex for the event dropdown
        />
        <Text style={styles.label}>Seleccione su artículo:</Text>
        {showArticleDropdown && (
          <View style={styles.dropdownArticulo}>
            <DropDownPicker
              open={articleDropdownOpen}
              value={selectedArticle}
              items={dropdownArticleItems}
              setOpen={setArticleDropdownOpen}
              setValue={handleArticleChange}
              placeholder="Seleccione un artículo"
              zIndex={1000} // Set a high zIndex for the article dropdown
            />
          </View>
        )}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(event) => event.id_event.toString()}
        renderItem={({ item, index }) => (
          <View key={item.id_event} style={styles.cardContainer}>
            {/* Render the image if sillasImageUrl is available */}
            {sillasImageUrl && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: sillasImageUrl }} style={styles.image} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Make sure the container is positioned relative
  },
  dropdownEvento: {
    position: 'absolute',
    zIndex: 9999,
    marginBottom: 40,
  },
  dropdownArticulo: {
    zIndex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  },
  image: {
    width: 400,
    height: 500,
    resizeMode: 'contain',
  },
});

export default Sillas;








