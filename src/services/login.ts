import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthService {
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential | undefined>;
  signInWithPhoneNumber: (
    phoneNumber: string,
  ) => Promise<FirebaseAuthTypes.ConfirmationResult | undefined>;
  signOut: () => Promise<void>;
}

class AuthServiceImpl implements AuthService {
  async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential | undefined> {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async signInWithPhoneNumber(
    phoneNumber: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult | undefined> {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return confirmation;
    } catch (error) {
      console.error(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  }
}

const authService: AuthService = new AuthServiceImpl();
export default authService;
