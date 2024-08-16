import axios from 'axios';
import { store } from './store'; // Assuming you have a Redux store
import { updateProgress } from './progressSlice'; // Assuming you track download/upload progress in Redux
import CustomResponse from './CustomResponse';
import { handleError } from './errorHandler';
class ServerGate {
  constructor() {
    this.BASE_URL = 'http://webappkwidsoft.site/tanzeef/public/api/';
    this.apiService = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        Accept: 'application/json',
        lang: 'en', // You can dynamically set this based on user settings or i18n
      },
      timeout: 5000,
    });

    this.addInterceptors();
  }

  static instance = new ServerGate();

  addInterceptors() {
    this.apiService.interceptors.request.use(
      (config) => {
        console.log('Request:', config);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    this.apiService.interceptors.response.use(
      (response) => {
        console.log('Response:', response);
        return response;
      },
      (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
      }
    );
  }

  async _getBaseUrl() {
    if (this.BASE_URL) return this.BASE_URL;
    try {
      const response = await axios.get('http://webappkwidsoft.site/tanzeef/public/api/', {
        headers: { Accept: 'application/json' },
      });
      if (response.data) {
        this.BASE_URL = response.data;
        this.apiService.defaults.baseURL = this.BASE_URL;
        console.log(`Base URL set to: ${this.BASE_URL}`);
        return this.BASE_URL;
      } else {
        throw new Error('Failed to fetch base URL');
      }
    } catch (error) {
      console.error('Error fetching base URL:', error);
      throw error;
    }
  }

  async sendToServer({ url, data = {}, params = {}, headers = {}, withoutHeader = false }) {
    await this._getBaseUrl();
    if (!withoutHeader) headers = { ...this._defaultHeaders(), ...headers };

    try {
      const response = await this.apiService.post(url, data, {
        headers,
        params,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          store.dispatch(updateProgress(progress));
        },
      });
      return this._handleSuccessResponse(response);
    } catch (error) {
      return this._handleErrorResponse(error);
    }
  }

  async deleteFromServer({ url, data = {}, params = {}, headers = {} }) {
    await this._getBaseUrl();
    headers = { ...this._defaultHeaders(), ...headers };

    try {
      const response = await this.apiService.delete(url, {
        headers,
        params,
        data,
      });
      return this._handleSuccessResponse(response);
    } catch (error) {
      return this._handleErrorResponse(error);
    }
  }

  async putToServer({ url, data = {}, headers = {} }) {
    await this._getBaseUrl();
    headers = { ...this._defaultHeaders(), ...headers };

    try {
      const response = await this.apiService.put(url, data, { headers });
      return this._handleSuccessResponse(response);
    } catch (error) {
      return this._handleErrorResponse(error);
    }
  }

  async getFromServer({ url, params = {}, headers = {}, withoutHeader = false }) {
    await this._getBaseUrl();
    if (!withoutHeader) headers = { ...this._defaultHeaders(), ...headers };

    try {
      const finalUrl = url.startsWith("http") ? url : `${this.BASE_URL}${url}`;
      const response = await this.apiService.get(
        finalUrl, { headers, params });
      return this._handleSuccessResponse(response);
      // return new CustomResponse({
      //   success: true,
      //   statusCode: 200,
      //   msg: 'File downloaded successfully',
      //   response: response,
      // });
    } catch (error) {
      return this._handleErrorResponse(error);
    }
  }

  async downloadFromServer({ url, path, headers = {}, params = {} }) {
    await this._getBaseUrl();
    headers = { ...this._defaultHeaders(), ...headers };

    try {
      const response = await this.apiService.get(url, {
        headers,
        params,
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          store.dispatch(updateProgress(progress));
        },
      });

      // Use RNFS or any other file system module to save the file
      // await RNFS.writeFile(path, response.data, 'base64');

      return new CustomResponse({
        success: true,
        statusCode: 200,
        msg: 'File downloaded successfully',
        response,
      });
    } catch (error) {
      return this._handleErrorResponse(error);
    }
  }

  _defaultHeaders() {
    return {
      Accept: 'application/json',
      lang: 'ar', // This should be dynamic, based on user's language settings
    };
  }

  _handleSuccessResponse(response) {
    return new CustomResponse({
      success: true,
      statusCode: response.status,
      msg: response.data.message || 'Request completed successfully',
      response,
      data: response.data,
    });
  }

  _handleErrorResponse(error) {
    const errorMsg = handleError(error);
    return new CustomResponse({
      success: false,
      errType: errorMsg.errType,
      msg: errorMsg.msg,
      statusCode: errorMsg.statusCode,
      response: errorMsg.response,
    });
  }
}

export default ServerGate;
