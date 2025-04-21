// src/services/axiosBaseQuery.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpMethod } from '../types';
import { API_URL, REQUEST_TIMEOUT } from '../var.env';
import { getToken } from './token';

// Common Axios configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: Number(REQUEST_TIMEOUT),
});

// Transport layer on top of Axios
const axiosBaseQuery = () => async (args: { url: string; method: HttpMethod; body?: Record<string, unknown>; params?: Record<string, unknown>; signal?: AbortSignal }) => {
  try {
    // Headers configuration
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Add token if available
    const token = getToken();
    if (token) {
      headers['X-Token'] = token;
    }

    const result: AxiosResponse = await axiosInstance.request({
      url: args.url,
      method: args.method,
      data: args.body,
      params: args.params,
      signal: args.signal,
      headers,
    });

    return { data: result.data as Record<string, unknown> };
  } catch (axiosError) {
    const err = axiosError as AxiosError<{ message?: string; error?: string }>;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || { message: err.message },
      },
    };
  }
};

export default axiosBaseQuery;
