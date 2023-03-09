import _ from "lodash";

class HttpClient {
  constructor() {
    this.requests = [];
  }

  add(request) {
    this.requests.push(request);
  }

  remove(request) {
    _.remove(this.requests, (n) => n.id == request.id);
  }

  clearRequests() {
    for (var request of this.requests) {
      request?.cancel?.();
      this.remove(request);
    }
  }
}

export const httpClient = new HttpClient();
