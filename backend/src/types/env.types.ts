export interface AppEnv {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  apiPrefix: string;
  mongodbUri: string;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  jwtAccessExpiresIn: string;
  jwtRefreshExpiresIn: string;
  corsOrigin: string[];
  otpTtlMinutes: number;
  mockOtpFixedCode?: string;
}
