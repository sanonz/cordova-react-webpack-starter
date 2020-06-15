import * as React from 'react';
// import classNames from 'classnames';
import { f7, Page, Navbar, NavRight, Link, BlockTitle, List, ListItem, LoginScreen, LoginScreenTitle, ListInput, ListButton, BlockFooter, Block, Button } from 'framework7-react';

import styles from './styles.less';
import useStyles from '@/hooks/useStyles';

function HomePage(): JSX.Element {
  useStyles(styles);

  const [toggle, setToggle] = React.useState(false);
  const [state, setState] = React.useState({username: '', password: ''});
  const handleSign = React.useCallback(() => {
    f7.dialog.alert(`Username: ${state.username}<br>Password: ${state.password}`, () => {
      f7.loginScreen.close();
    });
  }, [state]);

  return (
    <Page className={styles.locals.home}>
      <Navbar title="My App">
        <NavRight>
          <Link icon="icon-bars" panelOpen="right"></Link>
        </NavRight>
      </Navbar>

      <BlockTitle>Simple Links List</BlockTitle>
      <List>
        <ListItem title="List" link="/list"></ListItem>
        <ListItem title="About" link="/about"></ListItem>
        <ListItem title="Pull To Refresh" link="/pull-to-refresh"></ListItem>
      </List>

      <Block>
        <Button raised large fill loginScreenOpen=".demo-login-screen">As Overlay</Button>
      </Block>

      <LoginScreen
        className="demo-login-screen"
        opened={toggle}
        onLoginScreenClosed={() => setToggle(false)}
      >
        <Page loginScreen>
          <LoginScreenTitle>Framework7</LoginScreenTitle>
          <List form>
            <ListInput
              label="Username"
              type="text"
              placeholder="Your username"
              value={state.username}
              onInput={(e) => setState({...state, username: e.target.value})}
            />
            <ListInput
              label="Password"
              type="password"
              placeholder="Your password"
              value={state.password}
              onInput={(e) => setState({...state, password: e.target.value})}
            />
          </List>
          <List>
            <ListButton onClick={handleSign}>Sign In</ListButton>
            <BlockFooter>Some text about login information.<br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BlockFooter>
          </List>
        </Page>
      </LoginScreen>
    </Page>
  );
}

export default HomePage;
