import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CountryList from './CountryList'; // Import CountryList component

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateForm = () => {
    let errors = {}
    if (!email) errors.email = "Email is required"; 
    if (!password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoggedIn(true);
      setEmail(""); 
      setPassword("");
      setErrors({});
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <CountryList />
      ) : (
        <View style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text> 
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email} 
              onChangeText={setEmail} 
            />
            {errors.email ? (<Text style={styles.errorText}>{errors.email}</Text>) : null} 

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null}

            <Button title="login" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});