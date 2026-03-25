// src/api/customersApi.js
// Single source of truth for all customer HTTP calls.
// Components and hooks import from here — never call axios directly.

import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

export const getCustomers   = ()         => axios.get(`${BASE_URL}/customer`)
export const getCustomer    = (id)       => axios.get(`${BASE_URL}/customer/${id}`)
export const createCustomer = (data)     => axios.post(`${BASE_URL}/customer`, data)
export const updateCustomer = (id, data) => axios.put(`${BASE_URL}/customer/${id}`, data)
export const deleteCustomer = (id)       => axios.delete(`${BASE_URL}/customer/${id}`)
