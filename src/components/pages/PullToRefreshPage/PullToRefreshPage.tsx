import * as React from 'react';
// import classNames from 'classnames';
import { Page, Navbar, List, ListItem, BlockFooter } from 'framework7-react';

import styles from './styles.less';
import useStyles from '@/hooks/useStyles';
import { useData } from './hooks';

function PullToRefreshPage(): JSX.Element {
  useStyles(styles);

  const [items, loadMore] = useData();

  return (
    <Page
      className={styles.locals.refresh}
      ptr
      onPtrRefresh={loadMore}
    >
      <Navbar
        title="Pull To Refresh"
        backLink="Back"
      />
      <List mediaList>
        {items.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            subtitle={item.author}
          >
            <img slot="media" src={item.cover} width="44" />
          </ListItem>
        ))}
        <BlockFooter>
          <p>Just pull page down to let the magic happen.<br />Note that pull-to-refresh feature is optimised for touch and native scrolling so it may not work on desktop browser.</p>
        </BlockFooter>
      </List>
    </Page>
  );
}

export default PullToRefreshPage;
