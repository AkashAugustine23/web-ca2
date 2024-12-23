import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix Leaflet Icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './Order.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Order: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [restaurantLocation, setRestaurantLocation] = useState<[number, number] | null>(null);

  // Load Cart from Local Storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      setCart(cartData);

      // Extract Restaurant Location from first item
      if (cartData.length > 0) {
        setRestaurantLocation([cartData[0].latitude, cartData[0].longitude]);
      }
    }
  }, []);

  // Get User Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error('Error fetching user location:', error)
    );
  }, []);

  useEffect(() => {
    if (userLocation && restaurantLocation) {
      const map = L.map('map').setView(restaurantLocation, 13);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Add routing machine
      L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(restaurantLocation[0], restaurantLocation[1]),
        ],
        routeWhileDragging: true,
      }).addTo(map);
    }
  }, [userLocation, restaurantLocation]);

  // Calculate Total Price
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Remove Item
  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Orders</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {cart.length > 0 ? (
          <>
            <IonList>
              {cart.map((item, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    {item.dish} - €{item.price.toFixed(2)}
                  </IonLabel>
                  <IonButton color="danger" onClick={() => removeItem(index)}>
                    <IonIcon icon={trashBinOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>

            <div id="map" style={{ height: '300px', width: '100%' }}></div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </IonContent>
      {cart.length > 0 && (
        <IonFooter>
          <IonToolbar>
            <IonTitle>Total: €{calculateTotal()}</IonTitle>
            <IonButton expand="block" color="success">Checkout</IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default Order;
