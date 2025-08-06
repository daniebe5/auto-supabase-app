import { createClient } from '@supabase/supabase-js';

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const { data, error } = await supabase.from('items').select();
  return {
    props: {
      items: data ?? [],
    },
  };
}

export default function Home({ items }: { items: any[] }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Items</h1>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
