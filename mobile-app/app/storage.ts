import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = new Storage({
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    defaultExpires: null,

    enableCache: true,
});
