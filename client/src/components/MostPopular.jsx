import React from 'react';
import PropTypes from "prop-types";

function MostPopular({ data }) {
  return (
    <>
      <h4>Most Popular</h4>
    </>
    )
}


MostPopular.propTypes = {
  data: PropTypes.object,
};

export default MostPopular;
