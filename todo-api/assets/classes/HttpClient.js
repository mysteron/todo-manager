import axios from "axios";

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.axios = axios.default.create({
      baseURL: baseUrl
    });
  }


  getHeaders() {
    return {
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`
      },
    };
  }

  async post(path, body) {
    return this.axios.post(path, body, this.getHeaders());
  }

  async get(path) {
    return this.axios.get(path, this.getHeaders());
  }

  async put(path, body) {
    return this.axios.put(path, body, this.getHeaders());
  }

  async delete(path) {
    return this.axios.delete(path, this.getHeaders());
  }

  async patch(path, body) {
    return this.axios.patch(path, body, this.getHeaders());
  }
}

export default HttpClient;
