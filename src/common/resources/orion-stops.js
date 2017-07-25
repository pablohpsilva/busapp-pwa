// const basePath = '/v2/entities';
const basePath =
  (process && process.env && process.env.NODE_ENV === 'development') ?
    '/v2/busstop' :
    'http://buzapp.com.br:1337';

const orionStopActions = {
  get: { method: 'GET', url: `${basePath}{/id}` },
};

export const orionStopResource = resource => resource(`${basePath}`, {}, orionStopActions);

export default orionStopResource;
