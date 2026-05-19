const readBooleanEnv = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) return fallback;
  return value === 'true';
};

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  mapTileUrl:
    import.meta.env.VITE_MAP_TILE_URL ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  enableVoiceInput: readBooleanEnv(import.meta.env.VITE_ENABLE_VOICE_INPUT, true),
  enableMockApi: readBooleanEnv(import.meta.env.VITE_ENABLE_MOCK_API, true),
};
