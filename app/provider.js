'use client';
import { Provider } from "react-redux";
import { store } from "./store";
import { SessionProvider } from "next-auth/react";

export function AuthProvider({children}){
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
export function Providers({children}) {
  return <Provider store={store}>{children}</Provider>;
}