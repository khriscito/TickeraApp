import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, PanResponder, Animated } from 'react-native';
import { PinchGestureHandler, State, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const ZoomableScrollView = ({ children }) => {
  const [scale, setScale] = useState(1);
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scaleValue = useRef(1);
  const pan = useRef(new Animated.ValueXY()).current;
  const [doubleTapDetected, setDoubleTapDetected] = useState(false);

  useEffect(() => {
    let timer;
    if (doubleTapDetected) {
      timer = setTimeout(() => {
        setDoubleTapDetected(false);
      }, 100); 
    }
    return () => clearTimeout(timer);
  }, [doubleTapDetected]);

  const onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: { scale: pinchScale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      scaleValue.current *= event.nativeEvent.scale;
      baseScale.setValue(scaleValue.current);
      pinchScale.setValue(1);
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const { dx, dy } = gestureState;
      // Check if the movement is large enough to be considered a valid pan gesture
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        // Update a temporary variable
        const newPan = { x: pan.x._value + dx, y: pan.y._value + dy };
        // Apply the changes to the pan value
        pan.setValue(newPan);
      }
    },
    onPanResponderRelease: () => {
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    },
  });
  

  const scrollRef = useRef(null);

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchGestureEvent}
      onHandlerStateChange={onPinchHandlerStateChange}
      scale={scale}
      simultaneousHandlers={panResponder}
    >
      <Animated.View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={Animated.event([{ nativeEvent: { translationX: pan.x, translationY: pan.y } }], { useNativeDriver: false })}
        >
          <Animated.View style={styles.container}>
            <TapGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                  setDoubleTapDetected(true);
                }
              }}
              numberOfTaps={2}
            >
              <Animated.View style={styles.container}>
                <Animated.ScrollView
                  ref={scrollRef}
                  contentContainerStyle={styles.contentContainer}
                  maximumZoomScale={5}
                  minimumZoomScale={1}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  bouncesZoom={true}
                  pinchGestureEnabled={true}
                  scrollEnabled={true}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Animated.View
                    style={[
                      styles.imageContainer,
                      {
                        transform: [
                          { scale: baseScale },
                          { translateX: pan.x },
                          { translateY: pan.y },
                        ],
                      },
                    ]}
                  >
                    {children}
                  </Animated.View>
                </Animated.ScrollView>
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default gestureHandlerRootHOC(ZoomableScrollView);



