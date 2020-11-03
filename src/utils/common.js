import _ from 'lodash';

export const buildObject = (props, value) => {
  if (props.length === 0) {
    return value;
  }

  const prop = _.head(props);
  const nextProps = _.drop(props, 1);

  return { [`${prop}`]: buildObject(nextProps, value) };
};
