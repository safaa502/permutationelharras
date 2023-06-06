import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [grade, setGrade] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState([]);

  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [villeActuelleOptions, setVilleActuelleOptions] = useState([]);
  const [villeDesireeOptions, setVilleDesireeOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Récupérer les données depuis l'API
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const specialites = [...new Set(data.map(professeur => professeur.specialite))].map(specialite => ({
          label: specialite,
          value: specialite
        }));

        const villesActuelles = [...new Set(data.map(professeur => professeur.villeFaculteActuelle))].map(ville => ({
          label: ville,
          value: ville
        }));

        const villesDesirees = [...new Set(data.map(professeur => professeur.villeDesiree))].map(ville => ({
          label: ville,
          value: ville
        }));

        const grades = [...new Set(data.map(professeur => professeur.grade))].map(grade => ({
          label: grade,
          value: grade
        }));

        setSpecialiteOptions(specialites);
        setVilleActuelleOptions(villesActuelles);
        setVilleDesireeOptions(splitVilles(villesDesirees)); // Appel de la fonction splitVilles
        setGradeOptions(grades);
      });
  }, []);

  const splitVilles = (villes) => {
    const villeOptions = [];

    villes.forEach(ville => {
      const splitVille = ville.label.split(',');
      splitVille.forEach(v => {
        const trimmedVille = v.trim();
        if (trimmedVille) {
          villeOptions.push({
            label: trimmedVille,
            value: trimmedVille
          });
        }
      });
    });

    return villeOptions;
  };

  const handleSubmit = () => {
    if (
      nom.trim() === '' ||
      prenom.trim() === '' ||
      telephone.trim() === '' ||
      email.trim() === '' ||
      motDePasse.trim() === '' ||
      grade.trim() === '' ||
      etablissement.trim() === '' ||
      specialite.trim() === '' ||
      villeActuelle.trim() === '' ||
      villesDesirees.length === 0
    ) {
      // Afficher une fenêtre contextuelle (popup) indiquant de remplir tous les champs
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    } else {
      // Créer une chaîne de caractères avec les données du professeur

      // Afficher une fenêtre modale avec le message de succès
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    // Fermer la fenêtre modale et réinitialiser les champs de saisie
    setModalVisible(false);
    setNom('');
    setPrenom('');
    setTelephone('');
    setEmail('');
    setMotDePasse('');
    setGrade('');
    setEtablissement('');
    setSpecialite('');
    setVilleActuelle('');
    setVillesDesirees([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />
      <Text style={styles.label}>Prénom:</Text>
      <TextInput
        style={styles.input}
        value={prenom}
        onChangeText={setPrenom}
      />
      <Text style={styles.label}>Téléphone:</Text>
      <TextInput
        style={styles.input}
        value={telephone}
        onChangeText={setTelephone}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Mot de passe:</Text>
      <TextInput
        style={styles.input}
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry
      />
      <Text style={styles.label}>Grade:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={grade}
        onValueChange={setGrade}
        items={gradeOptions}
      />
      <Text style={styles.label}>Établissement:</Text>
      <TextInput
        style={styles.input}
        value={etablissement}
        onChangeText={setEtablissement}
      />
      <Text style={styles.label}>Spécialité:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={specialite}
        onValueChange={setSpecialite}
        items={specialiteOptions}
      />
      <Text style={styles.label}>Ville actuelle:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={villeActuelle}
        onValueChange={setVilleActuelle}
        items={villeActuelleOptions}
      />
      <Text style={styles.label}>Villes désirées:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={villesDesirees}
        onValueChange={setVillesDesirees}
        items={villeDesireeOptions}
        multiple={true} 
      />
      <Button title="Envoyer" onPress={handleSubmit} />
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Inscription effectuée avec succès!</Text>
            <Button title="OK" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({

});

export default Inscription;
