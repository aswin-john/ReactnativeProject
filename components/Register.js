import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registration({ onRegistrationSuccess }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!email) errors.email = "Email is required";
    if (!mobile) errors.mobile = "Mobile is required";
    if (!address) errors.address = "Address is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      const userData = { name, lastName, email, mobile, address };
      AsyncStorage.setItem('userData', JSON.stringify(userData));
      onRegistrationSuccess();

      setName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setAddress("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            value={mobile}
            onChangeText={setMobile}
          />
          {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Enter your address"
            multiline
            value={address}
            onChangeText={setAddress}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <Button title="Sign Up" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
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