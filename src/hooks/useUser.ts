"use client";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { UserType } from "@/types/user";

export default function useUser() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const setupUser = async () => {
      if (session?.user.id) {
        const response = await fetch(`/api/user/${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      }
    };
    setupUser();
  }, [session]);

  function signUp({ email, password }: { email: string; password: string }) {
    supabase.auth.signUp({ email, password });
  }

  function signIn({ email, password }: { email: string; password: string }) {
    supabase.auth.signInWithPassword({ email, password });
  }

  function signOut() {
    supabase.auth.signOut();
  }

  return { session, user, signUp, signIn, signOut };
}
