import HttpClient from "./HttpClient.js";
import ApiUrl from "./ApiUrlBuilder.js";

class ResourceApiClient {
  constructor(baseUrl, resourceKind) {
    this.resourceKind = resourceKind;
    this.baseUrl = baseUrl;
    this.apiClient = new HttpClient(this.baseUrl);
  }

  list() {
    const path = this.resourceKind;
    return new ApiUrl(this.baseUrl + path, this.apiClient);
  }
  getById(id, prop = undefined) {
    let path = `${this.resourceKind}/${id}`;
    if (prop && prop !== "") {
      path += `/${prop}`;
    }
    return this.apiClient.get(path).then(r => r.data);
  }
  add(resource) {
    const path = this.resourceKind;
    return this.apiClient
      .post(path, JSON.stringify(resource))
      .then(r => r.data);
  }
  update(id, resource) {
    const path = `${this.resourceKind}/${id}`;
    return this.apiClient.put(path, JSON.stringify(resource)).then(r => r.data);
  }
  remove(id) {
    const path = `${this.resourceKind}/${id}`;
    return this.apiClient.delete(path).then(r => r.data);
  }
  patch(body) {
    const id = body.id;
    const path = `${this.resourceKind}/${id}`;
    return this.apiClient.patch(path, JSON.stringify(body)).then(r => r.data);
  }
}

export default ResourceApiClient;
