import React from 'react';
import { View, Text, Button } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Doctor's Dashboard</Text>
      <Button title="View Patient Details" onPress={() => navigation.navigate('PatientDetails')} />
    </View>
  );
};

export default DashboardScreen;
