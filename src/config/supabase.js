// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseKey = 'YOUR_SUPABASE_KEY';

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     flowType: 'pkce',
//     autoRefreshToken: true,
//     detectSessionInUrl: true,
//     persistSession: true
//   }
// });
// import 'react-native-url-polyfill/auto';

// const supabaseUrl = 'https://xfmkkphsztbjgxgdvfto.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbWtrcGhzenRiamd4Z2R2ZnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDgzMDQsImV4cCI6MjA2MjkyNDMwNH0.iq8EaQxakE-tN8eSFgUsVDDm1a7hzyBUTXhjvsyYdXQ';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//     flowType: 'pkce'
//   },
//   db: {
//     schema: 'public'
//   }
// });
// import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://xfmkkphsztbjgxgdvfto.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbWtrcGhzenRiamd4Z2R2ZnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDgzMDQsImV4cCI6MjA2MjkyNDMwNH0.iq8EaQxakE-tN8eSFgUsVDDm1a7hzyBUTXhjvsyYdXQ';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true
  }
});