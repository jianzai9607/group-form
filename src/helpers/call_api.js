import { uuid } from "vue-uuid";
import axios from "axios";
import store from "@/store/store";
import { apiHost } from "@/constants/strings/hosts";
import { httpClient } from "@/extensions/http-client";
import { hideLoading } from "./loader";

// Enum
export const CallApiMethod = Object.freeze({
  get: "get",
  post: "post"
});

export const callApi = async ({
  // String
  path,
  // CallApiMethod
  method,
  // String
  host = apiHost,
  // FormData
  formData = null,
  // Map<String, String>?
  body = null,
  // Duration?
  timeout = null,
  //  Map<String, String>?
  headers = null
}) => {
  const secureToken = store.getters["auth/secureToken"];
  const language = store.getters["settings/language"];

  var methodHeader = {
    // Empty string for hide game setting feature (gamePlatformOptionsByGameCategory & premiumGamePlatformOption)
    Authorization: secureToken?.length > 0 ? secureToken : "",
    "Accept-Language": language.locale,
    "Content-Type": formData != null ? "multipart/form-data" : "application/x-www-form-urlencoded",
    ...headers
  };

  var methodBody;

  if (formData != null) {
    if (body != null) {
      Object.keys(body).forEach((key) => formData.append(key, body[key]));
    }
    methodBody = formData;
  } else if (body != null) {
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => params.append(key, body[key]));
    methodBody = params;
  }

  var request = null;
  try {
    const cancelSource = axios.CancelToken.source();
    request = { id: uuid.v4(), cancel: cancelSource.cancel };
    httpClient.add(request);

    const response = await axios({
      method: method,
      headers: methodHeader,
      url: path,
      baseURL: host,
      data: methodBody,
      timeout: timeout,
      cancelToken: cancelSource.token
    });

    return response;
  } catch (error) {
    const response = error.response; // null when cors error
    const isLogin = store.getters["auth/isLogin"];

    if (response.status == 401 && isLogin) {
      hideLoading();
      httpClient.clearRequests();

      throw "";
    }

    return response;
  } finally {
    if (request != null) httpClient.remove(request);
  }
};
