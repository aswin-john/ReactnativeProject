import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Login from './components/Login';
import Registration from './components/Register';
import CountryList from './components/CountryList';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const handleToggleScreen = () => {
    setIsLogin(!isLogin);
  };

  const handleRegistrationSuccess = () => {
    setIsLogin(true); // Redirect to login screen
  };

  return (
    <View style={styles.container}>
      {isLogin ? <Login /> : <Registration onRegistrationSuccess={handleRegistrationSuccess} />}
      <Button
        title={isLogin ? 'Go to Registration' : 'Go to Login'}
        onPress={handleToggleScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});