import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { search } from 'ionicons/icons';
import { Geolocation } from '@ionic-native/geolocation';
import data from '../assets/data/data.json';
import './Home.css';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<any>(null);
  const history = useHistory();

  // Calculate distance using Haversine formula
  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filter data based on search query
  const filteredData = data.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get user location
  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then((position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        console.log('User Location:', location); // Debugging log
        setUserLocation(location);
      })
      .catch((error) => console.error('Error fetching location:', error));
  }, []);

  // Calculate distance from user to restaurant
  const calculateDistance = (restaurantLat: number, restaurantLon: number) => {
    if (!userLocation) return 'Calculating...';
    const distance = haversineDistance(
      userLocation.lat,
      userLocation.lon,
      restaurantLat,
      restaurantLon
    );
    return `${distance.toFixed(2)} km`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src="/assets/images/logo.png" alt="Eater Logo"className='eater-logo'/></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchQuery}
          onIonInput={(e: any) => setSearchQuery(e.target.value)}
          debounce={0}
          placeholder="Search restaurants"
          showClearButton="focus"
        >
          <IonIcon slot="end" icon={search} />
        </IonSearchbar>

        {/* Restaurant List */}
        {filteredData.map((restaurant) => {
          console.log('Restaurant Location:', restaurant.latitude, restaurant.longitude); // Debugging log
          return (
            <IonCard
              key={restaurant.id}
              onClick={() =>
                history.push(`/menu/${restaurant.id}`, {
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                })
              }
            >
              <IonCardHeader>
                <IonCardTitle className="restaurant-title">{restaurant.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <p>Cuisine: {restaurant.cuisine}</p>
                <IonLabel>
                  Distance: {calculateDistance(restaurant.latitude, restaurant.longitude)}
                </IonLabel>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Home;
