import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames/bind';
import {Button} from 'antd';
import dayjs from 'dayjs';

import {logout} from 'actionCreators/auth';
import styles from './styles.css';

const cx = classNames.bind(styles);

const getSocketConnectionSelector = state => state.socketConnection;
const getStatusSelector = state => getSocketConnectionSelector(state).status;
const getTimeSelector = state => getSocketConnectionSelector(state).time;

const Main = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatusSelector);
  const unixTimestamp = useSelector(getTimeSelector);
  const timeString = unixTimestamp
    ? dayjs.unix(unixTimestamp).format('DD.MM.YY HH:mm:ss')
    : '';

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <div className={cx('container')}>
      <main>
        <div className={cx('status-container')}>
          <strong>Status:</strong>
          <span className={cx('connection-status', {[status]: true})}>
            {status}
          </span>
        </div>
        <div className={cx('time-container')}>
          <strong>Time:&nbsp;&nbsp;</strong>
          <span>{timeString}</span>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </main>
    </div>
  );
};

export default React.memo(Main);
