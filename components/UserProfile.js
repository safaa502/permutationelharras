import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserProfile = ({ email }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
        const data = await response.json();

        const user = data.find(professeur => professeur.email === email);

        if (user) {
          setUserData(user);
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur.", error);
      }
    };

    fetchUserData();
  }, [email]);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.value}>{userData.nom}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.label}>Prénom:</Text>
        <Text style={styles.value}>{userData.prenom}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="call" size={24} color="black" />
        <Text style={styles.label}>Téléphone:</Text>
        <Text style={styles.value}>{userData.tel}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="ribbon" size={24} color="black" />
        <Text style={styles.label}>Grade:</Text>
        <Text style={styles.value}>{userData.grade}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="school" size={24} color="black" />
        <Text style={styles.label}>Spécialité:</Text>
        <Text style={styles.value}>{userData.specialite}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="location" size={24} color="black" />
        <Text style={styles.label}>Ville Faculté Actuelle:</Text>
        <Text style={styles.value}>{userData.villeFaculteActuelle}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="location" size={24} color="black" />
        <Text style={styles.label}>Ville Désirée:</Text>
        <Text style={styles.value}>{userData.villeDesiree}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 8,
  },
});

export default UserProfile;
