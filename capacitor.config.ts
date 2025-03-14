
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bookit.app',
  appName: 'BOOKIT',
  webDir: 'dist',
  server: {
    url: "https://fa36e57f-be81-4dac-883b-71f41fd0eb28.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
