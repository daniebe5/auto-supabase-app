import type { NextPage, GetServerSideProps } from 'next';
import { createClient } from '@supabase/supabase-js';

// Define the shape of your data returned from Supabase
interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
}

// This function runs on the server side on each request
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let items: Item[] = [];

  // Read Supabase credentials from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    // Create Supabase client only if credentials are defined
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const { data, error } = await supabase.from('items').select('*');

      if (!error && data) {
        items = data as Item[];
      } else {
        console.error('Supabase fetch error:', error);
      }
    } catch (err) {
      // Gracefully handle unexpected errors
      console.error('Supabase request failed:', err);
    }
  } else {
    console.warn('Supabase environment variables are not set');
  }

  return {
    props: { items },
  };
};

const Home: NextPage<Props> = ({ items }) => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;