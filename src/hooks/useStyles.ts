import { useLayoutEffect } from 'react';

export default function useStyles (styles: SStyleUseable): void {
  if (!styles.locals) {
    styles.locals = {};
  }

  useLayoutEffect(() => {
    styles.use();

    return () => {
      styles.unuse();
    };
  }, [styles]);
}
