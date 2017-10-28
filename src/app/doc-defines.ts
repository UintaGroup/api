/**
 * @apiDefine AuthHeader
 * @apiHeader {String} authorization JWT Bearer Token
 * @apiHeaderExample {String} Bearer Token Example:
 *  {
 *    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJlbWFpbCI6InNjbGFya2xhc2xleUBnbWFpbC5jb20iLCJpYXQiOjE1MDg1NjAxNTgsImV4cCI6MTUwODU2Mzc1OH0.ytIw5l-lKlFsjq4pyGNAOEM8nsXvvwT4YcL5f4w6rVw"
 *  }
 */
/**
 * @apiDefine Unauthorized
 * @apiError Unauthorized Invalid token or Insufficient permissions
 * @apiErrorExample
 * HTTP/1.1 401 Unauthorized
 * {
 *   "statusCode": 401,
 *   "message": "Unauthorized"
 * }
 */