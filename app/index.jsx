import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import dgram from 'react-native-udp';

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraFrontBack, setCameraFrontBack] = useState('front');
  const [cameraOnOff, setCameraOnOff] = useState(false);
  const [message, setMessage] = useState('');

  const toggleCameraFrontBack = () => {
    setCameraFrontBack(cameraFrontBack === 'front' ? 'back' : 'front');
  };

  const toggleCameraOnOff = () => {
    setCameraOnOff(!cameraOnOff);
  };

  const sendMessage = () => {
    try {
      const socket = dgram.createSocket('udp4');
      const messageString = String(message);
      socket.send(messageString, undefined, undefined, 5000, '192.168.0.102', (err) => {
        if (err) console.log(err);
        else console.log('Message sent:', message);
        socket.close();
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cameraOnOff && <CameraView style={styles.camera} facing={cameraFrontBack} />}
      <Button onPress={toggleCameraOnOff} title="Toggle Camera" />
      <Button onPress={toggleCameraFrontBack} title="Switch Camera" />
      <TextInput
        style={styles.input}
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
      />
      <Button onPress={sendMessage} title="Send Message" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});