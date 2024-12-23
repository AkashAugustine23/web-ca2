import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FoodDeliveryApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 4000, 
      launchAutoHide: true, 
      backgroundColor: '#85ddff', 
      androidScaleType: 'CENTER_CROP',
      showSpinner: true, 
      spinnerStyle: 'large',
      spinnerColor: '#ffffff', 
    },
  },
};

export default config;
