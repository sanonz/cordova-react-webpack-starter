import * as React from 'react';
import classNames from 'classnames';

import styles from './styles.less';
import useStyles from '@/hooks/useStyles';

export type Props = React.HTMLAttributes<HTMLDivElement>

function Spinner({ className, ...nextProps }: Props): JSX.Element {
  useStyles(styles);

  return (
    <div
      {...nextProps}
      className={classNames(styles.locals.spinner, className)}
    >
      <div className={styles.locals.ball} />
    </div>
  );
}

export default Spinner;
