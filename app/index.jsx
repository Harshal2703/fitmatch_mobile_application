import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dgram from 'react-native-udp'


export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraFrontBack, setCameraFrontBack] = useState('front')
  const [cameraOnOff, setCameraOnOff] = useState(false)

  const toggleCameraFrontBack = () => {
    if (cameraFrontBack == "front") {
      setCameraFrontBack('back')
    } else {
      setCameraFrontBack('front')
    }
  }

  const toggleCameraOnOff = () => {
    if (cameraOnOff == false) {
      setCameraOnOff(true)
    } else {
      setCameraOnOff(false)
    }
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cameraOnOff && (<CameraView style={styles.camera} facing={cameraFrontBack}>
      </CameraView>)}
      <Button onPress={toggleCameraOnOff} title="camera switchhhh" ></Button>
      <Button onPress={toggleCameraFrontBack} title="toggle camera" ></Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});