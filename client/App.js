import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import AddVehicle from './components/AddVehicle/AddVehicle';

export default function App() {
return (
<View style={styles.container}>
    <AddVehicle />
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
nycBuildings: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
}

});