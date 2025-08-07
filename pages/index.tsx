import { createClient } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';

interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let items: Item[] = [];

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    try {
      const { data, error } = await supabase.from<Item>('items').select('*');
      if (!error && data) {
        items = data;
      }
    } catch (err) {
      console.error('Supabase fetch error:', err);
    }
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
