import { useState, useEffect } from 'react';
import { supabase } from '../../supabase.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

 const signUp = async (name, email, password, imageFile) => {
  let avatar_url = null;

  if (imageFile) {
    const fileExt = imageFile.name.split('.').pop();          
    const fileName = `${Date.now()}.${fileExt}`;             
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('pfps')                                     
      .upload(filePath, imageFile);

    if (uploadError) {
      return { data: null, error: uploadError };          
    }

   
    const { data: urlData } = supabase.storage
      .from('pfps')
      .getPublicUrl(filePath);

    avatar_url = urlData.publicUrl;
  }


  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar_url,  
      },
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  return { data, error };
};

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    setUser(null);

    return { error: error && error.status !== 403 ? error : null };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
}
