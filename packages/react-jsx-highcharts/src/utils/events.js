import forEach from 'lodash/forEach';
import lowerFirst from 'lodash/lowerFirst';
import pickBy from 'lodash/pickBy';
import omitBy from 'lodash/omitBy';
import mapKeys from 'lodash/mapKeys';
import isFunction from 'lodash/isFunction';

export const getEventHandlerProps  = props => {
  return pickBy(props, _isEventKey);
};

export const getNonEventHandlerProps = props => {
  return omitBy(props, _isEventKey);
};

export const addEventHandlersManually = (Highcharts, context, props) => {
  const eventProps = _getEventProps(props);

  forEach(eventProps, (handler, eventName) => {
    Highcharts.addEvent(context, eventName, handler);
  });
};

export const addEventHandlers = (updateFn, props) => {
  const events = _getEventProps(props);
  updateFn({ events });
};

const _isEventKey = (value, key) => (key.indexOf('on') === 0) && isFunction(value);

const _getEventProps = props => {
  const eventProps = getEventHandlerProps(props);

  return mapKeys(eventProps, (handler, eventName) => {
    return lowerFirst(eventName.replace(/^on/, ''));
  });
}

export default addEventHandlers;
