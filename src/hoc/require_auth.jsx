import React, { Component } from 'react';
import { authorizer } from '../constants/constants';
import { history } from '../routers/AppRoutes';

export default ComposedComponent => {
  class Authentication extends Component {
    state = {
    };

    checkAuth = () => {
      let token = authorizer.getHeader();
      if (!token) {
        history.push('/auth/login')
      }
    };

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate(prevProps) {
      this.checkAuth();
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return Authentication
}
