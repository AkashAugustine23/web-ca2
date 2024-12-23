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
  IonButton,
  IonToast,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import data from '../assets/data/data.json';
import './Menu.css';

const Menu: React.FC = () => {
  // Get restaurant ID from route params
  const { id } = useParams<{ id: string }>();

  // States for cart, restaurant data, and toast messages
  const [cart, setCart] = useState<any[]>([]);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const history = useHistory();

  // Load restaurant data and cart from local storage
  useEffect(() => {
    const restaurantData = data.find((r) => r.id === id);
    setRestaurant(restaurantData || null);

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [id]);

  // Add item to cart and save in local storage
  const addToCart = (item: any) => {
    try {
      const itemWithLocation = {
        ...item,
        latitude: restaurant?.latitude,
        longitude: restaurant?.longitude,
      };

      const updatedCart = [...cart, itemWithLocation];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      setToastMessage('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setToastMessage('An error occurred while adding to cart!');
    }
  };

  // Navigate to the order page
  const goToOrderPage = () => {
    history.push('/order');
  };

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>{restaurant?.name || 'Menu'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Render menu items */}
        {restaurant?.menu.map((item: any, index: number) => (
          <IonCard key={index}>
            {/* Dish image */}
            <img
              src={item.image}
              alt={item.dish}
              className="dish-image"
              onError={(e) => (e.currentTarget.src = '/assets/images/fallback.jpg')} // Fallback image
            />
            <IonCardHeader>
              <IonCardTitle className="dish-title">{item.dish}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Price: €{item.price.toFixed(2)}</p>
              <IonButton onClick={() => addToCart(item)}>Add to Cart</IonButton>
            </IonCardContent>
          </IonCard>
        ))}

        {/* View current order button */}
        <IonButton expand="block" onClick={goToOrderPage}>
          View Current Order
        </IonButton>
      </IonContent>

      {/* Toast notification */}
      <IonToast
        isOpen={!!toastMessage}
        onDidDismiss={() => setToastMessage(null)}
        message={toastMessage || ''}
        duration={1500}
        position="bottom"
        color={toastMessage?.includes('error') ? 'danger' : 'success'}
      />
    </IonPage>
  );
};

export default Menu;
