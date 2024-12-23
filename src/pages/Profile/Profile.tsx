import React, { useState, useEffect } from 'react';  
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonImg,
  IonModal,
  IonIcon,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Import Capacitor Camera plugin
import { camera, images, person, pencil, helpCircle } from 'ionicons/icons'; // Import icons for sections
import './Profile.css';

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>({});
  const [editableField, setEditableField] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false); // For image picker modal
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Load saved profile image from local storage if any
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }

    // Load user details from JSON file in public folder
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const response = await fetch('/userDetails.json'); // Fetch from public folder
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error('Error loading user details:', error);
      // Default values in case of error
      setUserDetails({
        name: 'John Doe',
        email: 'johndoe@example.com',
        dob: '1990-01-01',
        eirCode: 'D02X285',
      });
    }
  };

  // Function to capture image using the camera
  const captureImage = async () => {
    try {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 100,
        resultType: CameraResultType.Uri,
        allowEditing: false,
      });
      const profileImage = image.webPath || image.path || '';
      setProfileImage(profileImage);
      localStorage.setItem('profileImage', profileImage);
      setShowImagePicker(false); // Close modal after image selection
    } catch (error) {
      console.error('Camera error:', error);
      setShowImagePicker(false); // Close modal on error
    }
  };

  // Function to pick image from gallery
  const pickImageFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 100,
        resultType: CameraResultType.Uri,
        allowEditing: false,
      });
      const profileImage = image.webPath || image.path || '';
      setProfileImage(profileImage);
      localStorage.setItem('profileImage', profileImage);
      setShowImagePicker(false); // Close modal after image selection
    } catch (error) {
      console.error('Error selecting image from gallery:', error);
      setShowImagePicker(false); // Close modal on error
    }
  };

  // Edit User Detail
  const handleEditDetail = (field: string) => {
    setEditableField(field);
  };

  const handleSaveDetail = (field: string, value: string) => {
    const updatedDetails = { ...userDetails, [field]: value };
    setUserDetails(updatedDetails);
    setEditableField(null); // Exit edit mode
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          {/* Profile Picture Section */}
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <div className="profile-picture-container">
                    <IonImg
                      src={profileImage || 'assets/default-profile.png'}
                      alt="Profile"
                      className="profile-picture"
                    />
                    <IonIcon
                      icon={camera}
                      className="camera-icon"
                      onClick={() => setShowImagePicker(true)}
                    />
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* User Details Section */}
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <IonLabel>
                    <h3>
                      <IonIcon icon={person} /> User Details
                    </h3>
                  </IonLabel>
                  {['name', 'email', 'dob', 'eirCode'].map((field, index) => (
                    <div key={index} className="editable-field">
                      <IonLabel className="field-label">{field.toUpperCase()}</IonLabel>
                      <div className="field-container">
                        {editableField === field ? (
                          <IonInput
                            value={userDetails[field]}
                            onIonChange={(e) =>
                              setUserDetails({ ...userDetails, [field]: e.detail.value! })
                            }
                            onBlur={() => handleSaveDetail(field, userDetails[field])}
                            autofocus
                          />
                        ) : (
                          <span>{userDetails[field]}</span>
                        )}
                        <IonIcon
                          icon={pencil}
                          className="edit-icon"
                          onClick={() => handleEditDetail(field)}
                        />
                      </div>
                    </div>
                  ))}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonModal isOpen={showImagePicker} onDidDismiss={() => setShowImagePicker(false)}>
          <IonContent>
            <h2>Change Profile Picture?</h2>
            <IonButton expand="full" onClick={captureImage}>Take Picture</IonButton>
            <IonButton expand="full" onClick={pickImageFromGallery}>Choose from Gallery</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
