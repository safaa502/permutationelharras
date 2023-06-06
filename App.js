import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen';
import Inscription from './components/Inscription';
import Apropos from './components/apropos';
import LoginScreen from './components/LoginScreen';
import Recherche from './components/Recherche';
import UserProfile from './components/UserProfile';
import LogoutScreen from './components/LogoutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({ email: '' });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Inscription') {
              iconName = 'person-add';
            } else if (route.name === 'À propos') {
              iconName = 'information-circle';
            } else if (route.name === 'Connexion') {
              iconName = focused ? 'log-in' : 'log-in-outline';
            } else if (route.name === 'Recherche') {
              iconName = 'search';
            } else if (route.name === 'Profil') {
              iconName = 'person';
            } else if (route.name === 'Déconnexion') {
              iconName = focused ? 'log-out' : 'log-out-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
          tabBarStyle: { borderTopWidth: 1, borderTopColor: 'lightgray' },
        })}
      >
        {userLoggedIn.email ? (
          <>
            <Tab.Screen
              name="Accueil"
              component={HomeScreen}
              options={{ tabBarLabel: 'Accueil' }}
            />
            <Tab.Screen
              name="Recherche"
              component={Recherche}
              options={{ tabBarLabel: 'Recherche' }}
            />
            <Tab.Screen
              name="Profil"
              component={() => <UserProfile email={userLoggedIn.email} />}
              options={{ tabBarLabel: 'Profil' }}
            />
            <Tab.Screen
              name="Déconnexion"
              component={() => <LogoutScreen setUserLoggedIn={setUserLoggedIn} />}
              options={{ tabBarLabel: 'Déconnexion', tabBarBadge: true }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Accueil"
              component={HomeScreen}
              options={{ tabBarLabel: 'Accueil' }}
            />
            <Tab.Screen
              name="Inscription"
              component={Inscription}
              options={{ tabBarLabel: 'Inscription' }}
            />
            <Tab.Screen
              name="Connexion"
              component={() => <LoginScreen setUserLoggedIn={setUserLoggedIn} />}
              options={{ tabBarLabel: 'Connexion' }}
            />
            <Tab.Screen
              name="À propos"
              component={Apropos}
              options={{ tabBarLabel: 'À propos' }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
