import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView  } from 'react-native';
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
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchArticulosData = async () => {
      setLoading(true); // Iniciar la carga

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
      setLoading(false);
    };

    fetchArticulosData();
  }, [events, token]);

  const handleEventChange = (eventValue) => {
    setSelectedEvent(eventValue);
    setSelectedArticle(null);
    setShowArticleDropdown(true);
  };

  const handleArticleChange = (articleValue) => {
    setSelectedArticle(articleValue);
  };

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

  useEffect(() => {
    if (selectedArticle) {
      const fetchSillasData = async () => {
        const sillasApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/EspacioSillas&key=${token}&id_article=${selectedArticle}`;
        try {
          const response = await fetch(sillasApiUrl);
          const sillasData = await response.json();
          setSillasImageUrl(sillasData.image);
          console.log(sillasApiUrl)
        } catch (error) {
          console.error('Error fetching sillas data:', error);
        }
      };

      fetchSillasData();
    }
  }, [selectedEvent, selectedArticle, token]);

  return (
    <>
      {/* Mostrar pantalla de carga si articulosData está cargando */}
      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.loading}>Estamos cargando los datos de la aplicación por favor espere...</Text>
        <Image
          style={{ width: 400, height: 400 }}
          source={require("../../assets/defaultImage.png")}
        />
        <ActivityIndicator size={120} />
      </View>
      )}

      {/* Renderizar el contenido si articulosData ha cargado */}
      {!loading && (
        <View style={styles.container}>
          {/* DropdownPicker for Event */}
          <View style={styles.dropdownEvento}>
            <Text style={styles.label}>Eventos:</Text>
            <DropDownPicker
              open={eventDropdownOpen}
              value={selectedEvent}
              items={dropdownEventItems}
              setOpen={setEventDropdownOpen}
              setValue={handleEventChange}
              placeholder="Seleccione su evento"
            />
          </View>

          {/* DropdownPicker for Article */}
          {showArticleDropdown && (
            <View style={styles.dropdownArticulo}>
              <Text style={styles.label}>Artículos:</Text>
              <DropDownPicker
                open={articleDropdownOpen}
                value={selectedArticle}
                items={dropdownArticleItems}
                setOpen={setArticleDropdownOpen}
                setValue={handleArticleChange}
                placeholder="Seleccione un artículo"
              />
            </View>
            
          )}
        </View>
      )}

<ScrollView style={styles.container}> 
{sillasImageUrl === "https://makeidsystems.com/makeid/images/espacios/" ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Este artículo no tiene espacio asignado</Text>
          </View>
        ) : sillasImageUrl && (
          // Show the image if sillasImageUrl exists and is not the specific URL
          <View style={styles.imageContainer}>
            <Image source={{ uri: sillasImageUrl }} style={styles.image} />
          </View>
        )}
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 10,
  },
  dropdownEvento: {
    zIndex: 1100, 
    marginBottom: 20, 
    backgroundColor: '#fff', 
    paddingVertical: 10,
    paddingHorizontal: 15, 
    borderRadius: 8, 
    elevation: 5, 
  },
  dropdownArticulo: {
    zIndex: 1001, 
    marginBottom: 40,
    backgroundColor: '#fff', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  image: {
    width: 400,
    height: 500,
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50
  },
  loading: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Sillas;








