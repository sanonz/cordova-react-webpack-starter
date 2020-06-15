import { useState, useCallback } from 'react';

interface Item {
  title: string;
  author: string;
  cover: string;
}

const initialItems: Item[] = [
  {
    title: 'Yellow Submarine',
    author: 'Beatles',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-1.jpg',
  },
  {
    title: 'Don\'t Stop Me Now',
    author: 'Queen',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-2.jpg',
  },
  {
    title: 'Billie Jean',
    author: 'Michael Jackson',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
  },
];

function useData(): [Item[], (done: any) => void] {
  const [items, setItems] = useState(initialItems);
  const loadMore = useCallback((done) => {
    setTimeout(() => {
      const picURL = `https://cdn.framework7.io/placeholder/abstract-88x88-${(Math.floor(Math.random() * 10) + 1)}.jpg`;
      const song = initialItems[Math.floor(Math.random() * initialItems.length)].title;
      const author = initialItems[Math.floor(Math.random() * initialItems.length)].author;
      const rows = [...items];
      rows.push({
        title: song,
        author,
        cover: picURL,
      });
      setItems(rows);
      done();
    }, 1000);
  }, [items]);

  return [items, loadMore];
}

export { useData };
