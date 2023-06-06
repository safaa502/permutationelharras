import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';

const ChartExample = () => {
  const [specialitesData, setSpecialitesData] = useState([]);
  const [villesData, setVillesData] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const [totalProfCount, setTotalProfCount] = useState(0); // Nouveau état pour stocker le nombre total de professeurs
  const chartRefs = [useRef(null), useRef(null), useRef(null)]; // Utilisation d'un tableau pour les références des graphiques

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(jsonData => {
        // Nombre de profs par spécialité
        const specialites = {};
        jsonData.forEach(prof => {
          const specialite = prof.specialite;
          if (specialites[specialite]) {
            specialites[specialite]++;
          } else {
            specialites[specialite] = 1;
          }
        });
        const specialitesChartData = Object.entries(specialites)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map(([specialite, count]) => ({
            name: specialite,
            population: count,
            color: getRandomColor(),
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          }));
        setSpecialitesData(specialitesChartData);

        // Villes les plus demandées
        const villesDesirees = jsonData.flatMap(prof => prof.villeDesiree.split(';'));
        const villesDesireesCount = {};
        villesDesirees.forEach(villeDesiree => {
          if (villesDesireesCount[villeDesiree]) {
            villesDesireesCount[villeDesiree]++;
          } else {
            villesDesireesCount[villeDesiree] = 1;
          }
        });
        const villesDesireesChartData = Object.entries(villesDesireesCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map(([villeDesiree, count]) => ({
            name: villeDesiree,
            population: count,
            color: getRandomColor(),
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          }));
        setVillesData(villesDesireesChartData);

        // Nombre de profs par grade
        const grades = {};
        jsonData.forEach(prof => {
          const grade = prof.grade;
          if (grades[grade]) {
            grades[grade]++;
          } else {
            grades[grade] = 1;
          }
        });
        const gradesChartData = Object.entries(grades).map(([grade, count]) => ({
          name: grade,
          population: count,
          color: getRandomColor(),
          legendFontColor: '#7F7F7F',
          legendFontSize: 12,
        }));
        setGradesData(gradesChartData);

        // Nombre total de professeurs
        setTotalProfCount(jsonData.length);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    chartRefs.forEach(chartRef => {
      if (chartRef.current) {
        chartRef.current.fadeIn(); // Appliquer l'animation de fondu à chaque graphique
      }
    });
  }, [specialitesData, villesData, gradesData]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nombre total de profs : {totalProfCount}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nombre de profs par spécialité</Text>
          <Animatable.View ref={chartRefs[0]}>
            <PieChart
              data={specialitesData}
              width={Dimensions.get('window').width - 20}
              height={260}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hideLegend={true}
            />
          </Animatable.View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Villes les plus demandées</Text>
          <Animatable.View ref={chartRefs[1]}>
            <PieChart
              data={villesData}
              width={Dimensions.get('window').width - 20}
              height={260}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hideLegend={true}
            />
          </Animatable.View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nombre de profs par grade</Text>
          <Animatable.View ref={chartRefs[2]}>
            <PieChart
              data={gradesData}
              width={Dimensions.get('window').width - 20}
              height={260}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hideLegend={true}
            />
          </Animatable.View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default ChartExample;
