import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    supabase
      .from('items')
      .select()
      .then(({ data }) => {
        if (data) {
          setItems(data as any[]);
        }
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={(item as any).id}>{(item as any).name}</li>
        ))}
      </ul>
    </div>
  );
}
