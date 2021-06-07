
import { get, responseResult, cleanPayload } from '../api'
/**
 * 
 * @param {*} filters 
 * @returns 
 */
export const getList = (filters) => get(`users?${new URLSearchParams(cleanPayload(filters))}`,).then(responseResult)