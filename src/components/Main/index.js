import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames/bind';
import {Button} from 'antd';

import errorImg from 'IMAGES/error-page-icon.png';
import {logout} from 'actionCreators/auth';
import styles from './styles.css';

const cx = classNames.bind(styles);

const getUsernameSelector = state => state.auth.user?.name;

const Main = () => {
  const dispatch = useDispatch();
  const username = useSelector(getUsernameSelector);

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <div className={cx('container')}>
      <header>
        <img className={cx('logo')} src={errorImg} alt="logo" />
        {username && (
          <span className={cx('greeting')}>
            <span>Hello </span>
            <span className={cx('username')}>{username}</span>
          </span>
        )}
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <aside>Sidebar</aside>
      <main>Main</main>
      <footer />
    </div>
  );
};

export default React.memo(Main);
