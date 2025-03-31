import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { captureRef } from "react-native-view-shot";

export default function Index() {
  const device = useCameraDevice("front");
  const cameraRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [receivedImage, setReceivedImage] = useState("data:image/jpg;base64,");

  useEffect(() => {
    if (cameraRef.current) {
      console.log("Camera is ready!");
    } else {
      console.log("Waiting for camera...");
    }
  }, [cameraOn]);

  const startCamera = () => setCameraOn(true);
  const stopCamera = () => setCameraOn(false);

  const captureFrame = async () => {
    try {
      const rawFrame = await captureRef(cameraRef.current, { format: "jpg", quality: 0.1, result: "base64" });
      setReceivedImage(`data:image/webp;base64,${rawFrame}`);
    } catch (error) { }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>testing</Text>
      {device ? (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={cameraOn}
        />
      ) : (
        <Text style={styles.text}>No Camera Found</Text>
      )}
      <Image source={{ uri: receivedImage }} style={styles.image} />
      <Button style={styles.button} onPress={startCamera} title="Start Camera" />
      <Button style={styles.button} onPress={stopCamera} title="Stop Camera" />
      <Button style={styles.button} onPress={captureFrame} title="Capture Frame" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" }, // Ensure background is transparent
  image: { flex: 1 },
  placeholder: { flex: 1, backgroundColor: "gray" }, // Show a placeholder instead of black screen
  camera: { width: "80%", height: "40%", margin: 5 },
  image: { width: "80%", height: "40%", margin: 5 },
});
