import React, { useContext, useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { APIContext } from './APIContext.js';
import DropDownPicker from 'react-native-dropdown-picker';
import ZoomableScrollView from './ZoomableScrollView.jsx';
import { Button } from '@rneui/themed';

const VentasCortesia = () => {
  const { events, token } = useContext(APIContext);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [articleDropdownOpen, setArticleDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articulosData, setArticulosData] = useState([]);
  const [showArticleDropdown, setShowArticleDropdown] = useState(false);
  const [sillasImageUrl, setSillasImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sillasData, setSillasData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChair, setSelectedChair] = useState(null);
  const [pressedChairs, setPressedChairs] = useState([]);
  const { width, height } = Dimensions.get('window');
  const [cortesiaModal, setCortesiaModal] = useState(false);


  useEffect(() => {
    const fetchArticulosData = async () => {
      if (!token) {
        return
      }
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
    setSillasImageUrl("")
  };

  const dropdownEventItems = events.map((event) => ({
    label: event.name,
    value: event.name,
  }));

  const dropdownArticleItems = articulosData.find(
    (data) => data && data.event === selectedEvent
  )?.articulosData.map((articulo) => ({
    label: articulo.name,
    value: articulo.id_article.toString(),
  })) || [];

  useEffect(() => {
    if (!token) {
      return
    }
    if (selectedArticle) {
      const fetchSillasData = async () => {
        const sillasApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/EspacioSillas&key=${token}&id_article=${selectedArticle}`;
        try {
          const response = await fetch(sillasApiUrl);
          const sillasData = await response.json();
          setSillasImageUrl(sillasData.image);
          setSillasData(sillasData.array);
          console.log(sillasApiUrl)
          console.log(sillasImageUrl)
        } catch (error) {
          console.log('Error fetching sillas data:', error);
        }
      };
      fetchSillasData();
    }
  }, [selectedEvent, selectedArticle, token]);

  const handleChairPress = (chair) => {
    setSelectedChair(chair);
    setModalVisible(true);
  };

  const CortesiaModal = () => {
    setCortesiaModal(true);
  };

  const chairSize = Math.floor(width / (sillasData[0]?.length || 1)) - 2;

  const handleChairPressed = (chair) => {
    setPressedChairs([...pressedChairs, chair.name]);
    setSelectedChair(chair.name);
    setModalVisible(true);
    console.log(pressedChairs);
  };

  const handleDeselectChair = () => {
    setPressedChairs(pressedChairs.filter((c) => c !== selectedChair.name));
    setSelectedChair(null);
    setModalVisible(false);
    console.log(pressedChairs)
  };


  return (
    <>
      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.loading}>Estamos cargando los datos de la aplicación por favor espere...</Text>
          <Image
            style={{ width: 400, height: 400 }}
            source={require("../../assets/defaultImage.png")}
          />
        </View>
      )}

      {!loading && (
        <View style={styles.container}>
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

      {sillasImageUrl === "https://makeidsystems.com/makeid/images/espacios/" ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Este artículo no tiene espacio asignado</Text>
        </View>
      ) : !sillasImageUrl && selectedEvent && selectedArticle ? (
        <>
          <Text style={styles.loading}>Estamos cargando los datos de la aplicación por favor espere...</Text>
          <ActivityIndicator size={120} />
        </>
      ) : (
        <>
          <ZoomableScrollView style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: sillasImageUrl }} style={styles.image} />
            </View>
            <View style={styles.sillasContainer}>
              {sillasData.map((row, rowIndex) => (
                <View key={rowIndex} flexDirection="row">
                  {row.map((chair, chairIndex) => (
                    <TouchableOpacity
                      key={`${rowIndex}-${chairIndex}`}
                      style={{
                        width: chairSize,
                        height: chairSize,
                        backgroundColor: pressedChairs.includes(chair.name) ? 'yellow' : chair.status == "0" ? "transparent" : chair.sold == "0" ? "green" : chair.sold == "2" ? "blue" : "red",
                        margin: 1,
                      }}
                      onPress={() => handleChairPress(chair)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ZoomableScrollView>

          {pressedChairs.length > 0 && (
            <View style={{ height: 150 }}>
              <Text style={{ color: 'white', fontSize: 16, marginBottom: 10, alignContent: 'center' }}>Sillas seleccionadas:</Text>
              <Text style={{ color: 'white', fontSize: 13, marginBottom: 15}}>{pressedChairs.join(', ')}</Text>
              <Button
                title="Comprar Cortesia"
                titleStyle={{ fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: 'green',
                  width: 200,
                  height: 50,
                  padding: 10,
                  borderRadius: 30,
                  marginBottom: 10,
                }}
                containerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                loading={loading}
                onPress={() => CortesiaModal()}
              />
            </View>
          )}
        </>
      )}


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedChair && (
              <>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.modalTitle}>{selectedChair.name}</Text>
                </View>
                <Text style={{ fontSize: 17, marginBottom: 30 }}>
                  Status:{selectedChair.sold == 0 ? ' Disponible' : selectedChair.sold == 2 ? ' En validación' : ' Ocupado'}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity>
                    <Button
                      title="Cerrar"
                      buttonStyle={{
                        backgroundColor: 'red',
                        width: 130,
                        height: 50,
                        padding: 10,
                        borderRadius: 30,
                        marginBottom: 10,
                      }}
                      containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      loading={loading}
                      onPress={() => setModalVisible(false)}
                    />
                  </TouchableOpacity>
                  {pressedChairs.includes(selectedChair.name) && (
                    <Button
                      title="Deseleccionar Silla"
                      titleStyle={{ fontSize: 12 }}
                      buttonStyle={{
                        backgroundColor: 'orange',
                        width: 130,
                        height: 50,
                        padding: 10,
                        borderRadius: 30,
                        marginBottom: 10,
                      }}
                      containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      loading={loading}
                      onPress={handleDeselectChair}
                    />
                  )}
                  {!pressedChairs.includes(selectedChair.name) && selectedChair.sold == 0 && (
                    <Button
                      title="Seleccionar Silla"
                      titleStyle={{ fontSize: 14 }}
                      buttonStyle={{
                        backgroundColor: 'green',
                        width: 130,
                        height: 50,
                        padding: 10,
                        borderRadius: 30,
                        marginBottom: 10,
                      }}
                      containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      loading={loading}
                      onPress={() => { handleChairPressed(selectedChair); setModalVisible(false) }}
                    />
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={cortesiaModal}
        onRequestClose={() => setCortesiaModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Usted ha seleccionado las sillas:</Text>
            <Text style={{ fontSize: 17, marginBottom: 30 }}>{pressedChairs.join(', ')}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                title="Regresar"
                titleStyle={{ fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: 'red',
                  width: 130,
                  height: 50,
                  padding: 10,
                  borderRadius: 30,
                  marginBottom: 10,
                }}
                containerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                loading={loading}
                onPress={() => setCortesiaModal(false)}
              />
              <Button
                title="Generar entradas"
                titleStyle={{ fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: 'green',
                  width: 130,
                  height: 50,
                  padding: 10,
                  borderRadius: 30,
                  marginBottom: 10,
                }}
                containerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                loading={loading}
                onPress={() => { console.log('cortesia comprada con exito') }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {console.log('cortesia modal:', cortesiaModal)}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: 'relative',
    marginTop: 5,
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
    marginBottom: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white'
  },

  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50
  },
  sillasContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexGrow: 1
  },
  row: {
    flexDirection: 'column',
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
    marginBottom: 20,
    justifyContent: "center"
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
  loading: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },

});

export default VentasCortesia;








