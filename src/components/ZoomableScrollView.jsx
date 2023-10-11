import React from 'react';
import PinchZoomView from 'react-native-pinch-zoom-view';

const ZoomableScrollView = ({ children }) => {
  return (
    <PinchZoomView>
      {children}
    </PinchZoomView>
  );
};

export default ZoomableScrollView;




