import ResourceApiClient from "../classes/ResourceApiClient";
import config from "../config";


export default {
  data() {
    return {
      todoApiClient: new ResourceApiClient(
        config.API_URLS.BASE_URL,
        "todo_notes"
      )
    };
  }
};
