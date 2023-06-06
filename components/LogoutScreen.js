import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = ({ setUserLoggedIn }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    setUserLoggedIn(false); // Déconnexion de l'utilisateur

    // Vous pouvez ajouter d'autres étapes ici, par exemple, supprimer les jetons d'accès ou les informations de session

    // Naviguer vers l'écran de connexion
    navigation.navigate('Connexion');
  };

  return (
    <View>
      <Text>Voulez-vous vraiment vous déconnecter ?</Text>
      <Button title="Déconnexion" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;
