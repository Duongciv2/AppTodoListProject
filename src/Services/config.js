// config.js
import localhost from '../Utils/LocalHost';

// Địa chỉ API backend
export const API_BASE_URL = `http://${localhost}`;

// Tên các màn hình điều hướng
export const SCREEN_NAMES = {
  HOME_SCREEN: 'HomeScreen',
  SIGN_UP_SCREEN: 'SignUp',
  LOGIN_SCREEN: 'Login',
};

// Người dùng mặc định (có thể thay đổi sau khi đăng nhập thành công)
export const DEFAULT_USER_ID = '6621e243b3aa8d1281a160d1';