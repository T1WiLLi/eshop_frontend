import { useEffect, useState } from "react"
import { Auth } from "./api/auth";
import { User } from "./interface/user";

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const auth = new Auth();
        const loginResponse = await auth.loginUser('kminchelle', '0lelplR');
        if (loginResponse.success) {
          const currentUser = await auth.getCurrentUser();

          setUser(currentUser);
        } else {
          console.error('Login failed:', loginResponse.response);
        }
      } catch (error: any) {
        console.error('Error: ', error.message);
      }
    }
    getUserInfo();
  }, []);

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Age: {user.age}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App
