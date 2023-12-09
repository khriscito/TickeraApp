import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView,TouchableOpacity, Modal } from 'react-native';
import { APIContext } from './APIContext';
import DropDownPicker from 'react-native-dropdown-picker';

const Mesas = () => {
  const { events, token } = useContext(APIContext);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [articleDropdownOpen, setArticleDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedIDEvent, setSelectedIDEvent] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articulosData, setArticulosData] = useState([]);
  const [showArticleDropdown, setShowArticleDropdown] = useState(false);
  const [mesasImageUrl, setMesasImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mesasData, setMesasData] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSilla, setSelectedSilla] = useState(null);


  useEffect(() => {

    
    const fetchArticulosData = async () => {
      if(events.length == 0){
        return
      }
      console.log('-----------------------')
      console.log('estoy en fetchArticulosData')
      console.log('-----------------------')
      setLoading(true);

      const data = await Promise.all(
        events.map(async (event) => {
          const articuloApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ArticleEventApi&key=${token}&id_event=${event.id_event}`;
          try {
            const response = await fetch(articuloApiUrl);
            const articulosData = await response.json();

            return { event: event.name, articulosData: articulosData.articulos, id_event: event.id_event };
          } catch (error) {
            console.log('Error fetching data for event:', event.name, error);
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
    setMesasImageUrl("")
  };

  const dropdownEventItems = events.map((event) => ({
    label: event.name,
    value: event.name,
  }));

  const dropdownArticleItems =
    articulosData.find((data) => data && data.event === selectedEvent)?.articulosData.map((articulo) => ({
      label: articulo.name,
      value: articulo.id_article.toString(),
    })) ?? [];

console.log(selectedArticle)

  useEffect(() => {
    if (selectedArticle) {
      console.log('-----------------------')
      console.log('if (selectedArticle)')
      console.log('-----------------------')
      const fetchMesasData = async () => {
        const mesasApiUrl = `https://www.makeidsystems.com/makeid/index.php?r=site/ZonaSillas&id_article=${selectedArticle}&key=${token}`;
        try {
          const response = await fetch(mesasApiUrl);
          const mesasData = await response.json();
          setMesasImageUrl(mesasData.image);
          setMesasData(mesasData.array);

        } catch (error) {
          console.log('Error fetching mesas data:', error);
        }
      };

      fetchMesasData();
    }
  }, [selectedEvent, selectedArticle, token]);



  const handleMesaPress = (mesa, silla) => {
    setSelectedMesa(mesa);
    setModalVisible(true);
    setSelectedSilla(silla);
  };

  return (
    <>
      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.loading}>Estamos cargando los datos de la aplicación por favor espere...</Text>
          <Image style={{ width: 400, height: 400 }} source={require('../../assets/defaultImage.png')} />
          <ActivityIndicator size={120} />
        </View>
      )}
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
  
  <View style={styles.container}>
  {!mesasImageUrl && selectedEvent && selectedArticle ? (
  <>
    <Text style={styles.loading}>Estamos cargando los datos de la aplicación por favor espere...</Text>
    <ActivityIndicator size={120} />
  </>
) : mesasImageUrl === 'https://www.makeidsystems.com/makeid/images/difusion/' ? (
  <View style={styles.messageContainer}>
    <Text style={styles.messageText}>Este artículo no tiene espacio asignado</Text>
  </View>
) : (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image source={{ uri: mesasImageUrl }} style={styles.image} />
      </View>
      <View style={styles.mesasContainer}>
        {mesasData.map((mesa, index) => (
          <View key={`mesa-${index}`} style={styles.tableContainer}>
            <View style={styles.chairsContainer}>
              <View style={styles.row}>
                {mesa.sillas.slice(0, 4).map((silla, sillaIndex) => (
                  <TouchableOpacity                   
                  key={`silla-${sillaIndex}`} style={{
                    width: 60,
                    height: 60,
                    backgroundColor: silla.status == "1" ? "green" : silla.status == "2" ? "red" : silla.status == "3" ? "blue" : "grey",
                  }}
                  onPress={() => handleMesaPress(mesa, silla)}                  
                  ><Text style={styles.chairText}>{silla.name_chair}</Text></TouchableOpacity>
                ))}
              </View>
              <View style={styles.chairLeft}>
                <TouchableOpacity>
                  {mesa.sillas.slice(8, 10).map((silla, sillaIndex) => (
                    <View key={`silla-${sillaIndex}`} style={{
                      width: 60,
                      height: 60,
                      backgroundColor: "grey"
                    }}>
                    </View>
                  ))}
                </TouchableOpacity>
                <Text style={styles.tableName}>{mesa.mesa}</Text>
                <View>
                  {mesa.sillas.slice(4, 6).map((silla, sillaIndex) => (
                    <TouchableOpacity key={`silla-${sillaIndex}`} style={{
                      width: 60,
                      height: 60,
                      backgroundColor: silla.status == "1" ? "green" : silla.status == "2" ? "red" : silla.status == "3" ? "blue" : "grey",
                    }}onPress={() => handleMesaPress(mesa, silla)}>
                      <Text style={styles.chairText}>{silla.name_chair}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.row}>
                {mesa.sillas.slice(6, 10).map((silla, sillaIndex) => (
                  <TouchableOpacity key={`silla-${sillaIndex}`} style={{
                    width: 60,
                    height: 60,
                    backgroundColor: silla.status == "1" ? "green" : silla.status == "2" ? "red" : silla.status == "3" ? "blue" : "grey",
                  }}
                  onPress={() => handleMesaPress(mesa, silla)} >
                    <Text style={styles.chairText}>{silla.name_chair}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )}
</View>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedMesa && selectedSilla && (
  <>
    <Text style={styles.modalTitle}>{selectedMesa.mesa}</Text>
    <Text>Status de la silla: {selectedSilla.name_chair}: {selectedSilla.status == "1" ? "Disponible" : selectedSilla.status == "2" ? "Ocupado" : "En validación"}</Text>
    <TouchableOpacity
      style={styles.modalCloseButton}
      onPress={() => setModalVisible(false)}
    >
      <Text style={styles.modalCloseButtonText}>Close</Text>
    </TouchableOpacity>
  </>
)}
          </View>
        </View>
      </Modal>
</>
)}



  


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
    color: 'white'
  },

  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: 'white'
  },
  mesasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  silla: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
  tableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  tableText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chairsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  chair: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  chairText: {
    color: 'white',
  },

  noChair: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },

  chairRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chairLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableName: {
    marginHorizontal:60,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  loading: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
});


export default Mesas;
