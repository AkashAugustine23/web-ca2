1. Overview
I developed a Food Delivery App using Ionic React and Capacitor to create a responsive and interactive platform for users. The app allows users to:
•	Browse restaurants based on their location.
•	View menus and add items to their cart.
•	Track delivery routes on an interactive map.
•	Manage profile details and upload images using the camera plugin.
Note on Splash Screen Integration:
I initially attempted to implement a custom splash screen using the Capacitor Splash Screen plugin, but it led to complex issues affecting the app’s build process and other functionalities. After multiple debugging attempts, I decided to remove the splash screen to ensure the app’s stability and core functionality.

2. Key Features
Home Page:
I designed the home page to display a list of restaurants along with their distance from the user’s location, calculated dynamically using the Geolocation Plugin. Users can also search for restaurants by name or cuisine, and a custom logo is displayed at the top for branding.
Menu Page:
The menu page showcases each restaurant’s menu items with images, prices, and an add-to-cart button. I implemented local storage to persist cart data and included toast notifications to provide feedback when items are added successfully.
Order Page:
For the order page, I integrated Leaflet Maps and Leaflet Routing Machine to display an interactive route between the user’s location and the restaurant. Users can also remove items from the cart and see a total price before proceeding to checkout.
Profile Page:
I built a profile page where users can edit their details and upload a profile picture using the Camera Plugin. User data is saved to local storage for persistence, and a help section links to a GitHub README for guidance.

3. Plugins and Technologies Used
I utilized the following Capacitor plugins to enhance functionality:
•	@capacitor/geolocation – For fetching and displaying the user’s location.
•	@capacitor/camera – Enables capturing and uploading profile pictures via the camera or gallery.
•	Leaflet and Leaflet Routing Machine – Displays interactive maps and delivery routes.
•	Ionic Toast and Storage – Provides notifications and persists cart and profile data locally.

4. Challenges and Resolutions
1. Splash Screen Errors:
•	Problem: Deprecated SplashScreen API caused build failures and plugin conflicts.
•	Resolution: After debugging attempts, I removed the custom splash screen implementation to maintain core functionality and app stability.
3. Keystore Path Errors:
•	Problem: Build failures occurred due to incorrect keystore paths in Gradle configurations.
•	Resolution: Fixed path formatting and ensured permissions for the keystore file.
4. Image Loading in Menu Page:
•	Problem: Dish images failed to load due to incorrect paths.
•	Resolution: Used absolute URLs for image sources and added fallback options for missing images.
5. Map Routing Errors in Order Page:
•	Problem: The map initially displayed straight lines instead of routes.
•	Resolution: Integrated Leaflet Routing Machine for dynamic navigation routes.


5. Build Process
I created a signed APK by following these steps:
1.	Keystore Setup: Generated and configured signing keys in build.gradle for release builds.
2.	Output Path for APK:
android/app/build/outputs/apk/release/app-release.apk
6. Design and Style
I adopted a modern design with a white, light blue (#85ddff), and black color scheme.
•	Used the Poppins font for clean typography.
•	Ensured responsive layouts for mobile and tablet views.
•	Styled buttons with rounded edges, shadows, and consistent sizes across all pages.

7. Future Enhancements
While the app is fully functional, I identified several enhancements for future updates:
•	Payment Integration: Secure checkout process with payment gateways.
•	User Authentication: Add login/signup functionality using Firebase or OAuth.
•	Push Notifications: Enable real-time updates for order tracking.
•	Ratings and Reviews: Allow users to rate restaurants and dishes.
•	Multi-language Support: Improve accessibility by adding language options.

8. Conclusion
This project demonstrates my ability to build a feature-rich mobile application using Ionic React and Capacitor plugins.
By leveraging geolocation, camera features, and interactive maps, I created an engaging and user-friendly experience. Despite initial attempts to implement a custom splash screen, I prioritized functionality and resolved issues effectively to ensure the app performed as intended.
The app has been successfully packaged as a signed APK and is ready for deployment, providing a solid foundation for future enhancements and scalability.

