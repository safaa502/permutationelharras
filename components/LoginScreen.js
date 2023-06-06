import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation, setUserLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();

      const isEmailPresent = data.some(professeur => professeur.email === email);

      if (isEmailPresent) {
        Alert.alert("Connecté avec succés", "Bienvenue sur votre compte professeur.");
        setUserLoggedIn({ email }); // Mettre à jour l'état de connexion de l'utilisateur avec l'e-mail
        // Naviguer vers la page de l'utilisateur connecté
        navigation.navigate('Profil');
      } else {
        Alert.alert("Coordonnées non valide");
      }

      // Réinitialiser les champs après la soumission
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Une erreur s'est produite lors de la vérification de l'adresse e-mail.", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
