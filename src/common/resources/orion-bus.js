// const basePath = '/v2/entities';
const basePath =
  (process && process.env && process.env.NODE_ENV === 'development') ?
    '/v2/buslog' :
    'http://buzapp.com.br:1337';

const orionBusActions = {
  get: { method: 'GET', url: `${basePath}{/id}` },
};

export const orionBusResource = resource => resource('', {}, orionBusActions);

export default orionBusResource;
