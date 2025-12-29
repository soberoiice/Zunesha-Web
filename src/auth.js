import { supabase } from "./client";

export async function signUp(email, password, username) {
  try {
    console.log("creds: ", email, password, username);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });
    alert("check your email");
  } catch (error) {
    alert(error);
  }
}

export async function signIn({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}
