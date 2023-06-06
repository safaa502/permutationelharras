import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, ScrollView , StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

const Recherche = () => {
  const [specialities, setSpecialities] = useState([]);
  const [currentCities, setCurrentCities] = useState([]);
  const [previousCities, setPreviousCities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedCurrentCity, setSelectedCurrentCity] = useState('');
  const [selectedPreviousCity, setSelectedPreviousCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]); // Ajout du state pour les résultats d'origine
  const [showResults, setShowResults] = useState(false);
  const [filterResetKey, setFilterResetKey] = useState(0); // Ajout du state pour réinitialiser les filtres

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        const uniqueSpecialities = Array.from(
          new Set(data.map((prof) => prof.specialite))
        );
        const uniqueCurrentCities = Array.from(
          new Set(data.map((prof) => prof.villeFaculteActuelle))
        );
        const uniquePreviousCities = Array.from(
          new Set(data.flatMap((prof) => prof.villeDesiree.split(';')))
        );

        setSpecialities(uniqueSpecialities);
        setCurrentCities(uniqueCurrentCities);
        setPreviousCities(uniquePreviousCities);
        setSearchResults(data);
        setOriginalResults(data); // Sauvegarder les résultats d'origine
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const performSearch = () => {
    let results = [...originalResults]; // Utiliser les résultats d'origine pour la recherche

    if (selectedSpeciality) {
      results = results.filter((prof) => prof.specialite === selectedSpeciality);
    }
    if (selectedCurrentCity) {
      results = results.filter((prof) => prof.villeFaculteActuelle === selectedCurrentCity);
    }
    if (selectedPreviousCity) {
      results = results.filter((prof) =>
        prof.villeDesiree.includes(selectedPreviousCity)
      );
    }

    setSearchResults(results);
    setShowResults(true);
  };

  const handleSearch = () => {
    performSearch();
  };

  const handleSpecialityChange = (itemValue) => {
    setSelectedSpeciality(itemValue);
  };

  const handleCurrentCityChange = (itemValue) => {
    setSelectedCurrentCity(itemValue);
  };

  const handlePreviousCityChange = (itemValue) => {
    setSelectedPreviousCity(itemValue);
  };

  const resetFilters = () => {
    setSelectedSpeciality('');
    setSelectedCurrentCity('');
    setSelectedPreviousCity('');
    setFilterResetKey((prevKey) => prevKey + 1); // Mettre à jour le state filterResetKey pour déclencher le rafraîchissement
    setSearchResults(originalResults); // Restaurer les résultats d'origine
    setShowResults(false); // Cacher les résultats réinitialisés
  };

  useEffect(() => {
    performSearch();
  }, [selectedSpeciality, selectedCurrentCity, selectedPreviousCity, filterResetKey]); // Ajouter filterResetKey à la liste des dépendances

  return (
    <ScrollView>
      <Card>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Spécialité:</Text>
          <Picker
            selectedValue={selectedSpeciality}
            onValueChange={handleSpecialityChange}
          >
            <Picker.Item label="Toutes les spécialités" value="" />
            {specialities.map((speciality) => (
              <Picker.Item key={speciality} label={speciality} value={speciality} />
            ))}
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Ville actuelle:</Text>
          <Picker
            selectedValue={selectedCurrentCity}
            onValueChange={handleCurrentCityChange}
          >
            <Picker.Item label="Toutes les villes actuelles" value="" />
            {currentCities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Ville désirée:</Text>
          <Picker
            selectedValue={selectedPreviousCity}
            onValueChange={handlePreviousCityChange}
          >
            <Picker.Item label="Toutes les villes désirées" value="" />
            {previousCities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
        </View>

        <Button title="Réinitialiser" onPress={resetFilters} />
      </Card>

      {showResults && (
        <View>
          {searchResults.map((prof) => (
            <Card key={prof.id}>
              <Text>Nom: {prof.nom}</Text>
              <Text>Prénom: {prof.prenom}</Text>
              <Text>Grade: {prof.grade}</Text>
              <Text>Spécialité: {prof.specialite}</Text>
              <Text>Téléphone: {prof.tel}</Text>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18, // Modifier la taille du texte du titre
    marginBottom: 5,
  },
  picker: {
    // Ajouter des styles supplémentaires au besoin
  },
});
export default Recherche;
