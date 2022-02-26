class ApiUrlBuilder {
  constructor(baseUrl, apiClient) {
    this.baseUrl = baseUrl;
    this.url = new URL(this.baseUrl);
    this.apiClient = apiClient;
  }

  page(page) {
    this.url.searchParams.set("page", page);
    return this;
  }

  perPage(pageSize) {
    this.url.searchParams.set("perPage", pageSize);
    return this;
  }

  sortBy(field, order = "asc") {
    this.url.searchParams.set("sortBy", field);
    this.url.searchParams.set("sortDir", order);
    return this;
  }

  param(name, value) {
    this.url.searchParams.append(name, value);
    return this;
  }

  filterBy(phrase) {
    if (phrase && phrase !== "") {
      this.url.searchParams.set("q", phrase);
    } else {
      this.url.searchParams.delete("q");
    }
    return this;
  }

  value() {
    return this.url.toString();
  }

  exec() {
    if (this.apiClient) {
      return this.apiClient.get(this.value()).then(r => r.data);
    } else {
      return Promise.resolve({});
    }
  }
}

export default ApiUrlBuilder;
