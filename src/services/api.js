import { supabase } from '../config/supabase';

// Auth services
const authService = {
    signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'yourapp://auth/confirm'
            }
        });
    
        if (error) {
            throw error;
        }
        return data;
    },
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
    
        if (error?.message.includes('email not confirmed')) {
            await supabase.auth.resend({
                type: 'signup',
                email
            });
            throw new Error('Confirmation email resent. Please check your email.');
        }
    
        return { data, error };
    },
    signOut: async () => {
        return await supabase.auth.signOut();
    },
    getCurrentUser: async () => {
        return await supabase.auth.getUser();
    }
};

// Remove soundService, sessionService, and journalService

export { authService };

