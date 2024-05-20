import auth from '@react-native-firebase/auth';

interface AuthService {
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  signInWithPhoneNumber: (phoneNumber: string) => Promise<any>;
  confirmCode: (code: string) => Promise<void>;
  signOut: () => Promise<void>;
}

class AuthServiceImpl implements AuthService {
  async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in!');
    } catch (error) {
      console.error(error);
    }
  }

  async signInWithPhoneNumber(phoneNumber: string): Promise<any> {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return confirmation;
    } catch (error) {
      console.error(error);
    }
  }

  async confirmCode(code: string): Promise<void> {
    try {
      await confirm.confirm(code);
      console.log('Code confirmed!');
    } catch (error) {
      console.log('Invalid code.');
      console.error(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth().signOut();
      console.log('User signed out!');
    } catch (error) {
      console.error(error);
    }
  }
}

const authService: AuthService = new AuthServiceImpl();
export default authService;
