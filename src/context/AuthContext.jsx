import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'groco_users';
const SESSION_KEY = 'groco_session';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  function signup({ name, email, password }) {
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const newUser = { name, email, password, provider: 'email' };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return { ok: true };
  }

  function login({ email, password }) {
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      // The exact scenario you asked for: logging in without signing up first.
      return { ok: false, message: 'Invalid user! Please sign up before logging in.' };
    }
    if (found.password !== password) {
      return { ok: false, message: 'Incorrect password. Please try again.' };
    }
    setUser({ name: found.name, email: found.email });
    return { ok: true };
  }

  // Simulated Google/Apple sign-in — auto-creates an account on first use,
  // logs straight in on repeat use. See README section 7 for wiring a real SDK.
  function loginWithProvider(provider) {
    const fakeEmail = `${provider}-user@groco.demo`;
    const users = loadUsers();
    let found = users.find((u) => u.email === fakeEmail);
    if (!found) {
      found = { name: provider === 'google' ? 'Google User' : 'Apple User', email: fakeEmail, password: null, provider };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, found]));
    }
    setUser({ name: found.name, email: found.email });
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, signup, login, loginWithProvider, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
