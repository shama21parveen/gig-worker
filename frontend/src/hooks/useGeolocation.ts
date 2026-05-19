import { useEffect, useState } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        error: 'Geolocation is unavailable on this device.',
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      () => {
        setState({
          latitude: null,
          longitude: null,
          error: 'Location permission was denied or timed out.',
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      },
    );
  }, []);

  return state;
}
