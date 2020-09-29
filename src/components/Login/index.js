import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames/bind';
import {Form, Input, Button} from 'antd';

import {login} from 'actionCreators/auth';
import {gotoRoute} from 'helpers/history';
import styles from './styles.css';

const cx = classNames.bind(styles);

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

const getAuthState = wholeState => wholeState.auth;
const getError = state => getAuthState(state).error;
const getIsInProgress = state => getAuthState(state).isInProgress;
const getIsAuthenticated = state => getAuthState(state).isAuthenticated;

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const isInProgress = useSelector(getIsInProgress);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleSubmit = useCallback(
    values => {
      const {username, password} = values;

      dispatch(login(username, password));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isAuthenticated) {
      gotoRoute('/', 'replace');
    }
  }, [isAuthenticated]);

  return (
    <div className={cx('container')}>
      <Form
        {...layout}
        name="login"
        initialValues={{}}
        onFinish={handleSubmit}
        className={cx('form')}>
        <Form.Item {...tailLayout}>
          <span className={cx('title')}>Welcome to the test</span>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{required: true, message: 'Please enter username'}]}>
          <Input autoFocus disabled={isInProgress} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please enter password'}]}>
          <Input.Password disabled={isInProgress} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isInProgress}
            className={cx('submit-button')}>
            Login
          </Button>
          {error && <div className={cx('error-msg')}>{error}</div>}
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(Login);
