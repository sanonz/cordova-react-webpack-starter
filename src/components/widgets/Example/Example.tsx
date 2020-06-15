import * as React from 'react';
import classNames from 'classnames';
// import { Link } from 'react-router-dom';

import styles from './styles.less';
import useStyles from '@/hooks/useStyles';

export type Props = React.HTMLAttributes<HTMLDivElement>

function Example({ className, ...nextProps }: Props): JSX.Element {
  useStyles(styles);

  return (
    <div
      {...nextProps}
      className={classNames(styles.locals.menubar, className)}
    >
      Example
    </div>
  );
}

export default Example;
