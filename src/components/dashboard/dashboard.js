import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FileForm from '../image-form/image-form';
import createFileApiRequest from '../../actions/file';

const mapDispatchToProps = dispatch => ({
  createFile: file => dispatch(createFileApiRequest(file)),
});

class Dashboard extends React.Component {
  render() {
    const { createFile } = this.props;
    return (
      <div className="dashboard">
        <h1>Welcome to the Dashboard</h1>
        <FileForm onComplete={ createFile }/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  createFile: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Dashboard);
