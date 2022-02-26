import ResourceApiClient from "../classes/ResourceApiClient";
import config from "../config";


export default {
  data() {
    return {
      categoryApiClient: new ResourceApiClient(
        config.API_URLS.BASE_URL,
        "categories"
      )
    };
  }
};
