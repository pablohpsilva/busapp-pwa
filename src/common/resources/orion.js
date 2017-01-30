const basePath = '/v2/entities';

const orionActions = {
  list: { method: 'GET', url: `${basePath}` },
  post: { method: 'POST', url: `${basePath}` },
  get: { method: 'GET', url: `${basePath}{/id}` },
  update: { method: 'PUT', url: `${basePath}{/id}` },
};

export const orionResource = resource => resource(`${basePath}`, {}, orionActions);

export default orionResource;
