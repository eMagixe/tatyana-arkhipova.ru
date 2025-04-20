import { c as useStrapiClient } from './server.mjs';

const useStrapi = () => {
  const client = useStrapiClient();
  const find = (contentType, params, fetchOptions) => {
    return client(`/${contentType}`, { method: "GET", params, ...fetchOptions });
  };
  const findOne = (contentType, documentId, params, fetchOptions) => {
    if (typeof documentId === "object") {
      params = documentId;
      documentId = void 0;
    }
    const path = [contentType, documentId].filter(Boolean).join("/");
    return client(path, { method: "GET", params, ...fetchOptions });
  };
  const create = (contentType, data, params = {}) => {
    return client(`/${contentType}`, { method: "POST", body: { data }, params });
  };
  const update = (contentType, documentId, data, params = {}) => {
    if (typeof documentId === "object") {
      data = documentId;
      documentId = void 0;
    }
    const path = [contentType, documentId].filter(Boolean).join("/");
    return client(path, { method: "PUT", body: { data }, params });
  };
  const _delete = (contentType, id) => {
    const path = [contentType, id].filter(Boolean).join("/");
    return client(path, { method: "DELETE" });
  };
  return {
    find,
    findOne,
    create,
    update,
    delete: _delete
  };
};

export { useStrapi as u };
//# sourceMappingURL=useStrapi.mjs.map
