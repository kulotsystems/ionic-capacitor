import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'tech.kulotsystems.ioniccapacitor',
    appName: 'ionic-capacitor',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    }
};

export default config;
