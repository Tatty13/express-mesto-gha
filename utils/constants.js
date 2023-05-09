const httpConstants = require('http2').constants;

const {
  HTTP_STATUS_CREATED: CREATED_201,
  HTTP_STATUS_BAD_REQUEST: BAD_REQUEST_400,
  HTTP_STATUS_UNAUTHORIZED: UNAUTHORIZED_401,
  HTTP_STATUS_FORBIDDEN: FORBIDDEN_403,
  HTTP_STATUS_NOT_FOUND: NOT_FOUND_404,
  HTTP_STATUS_CONFLICT: CONFLICT_409,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_500,
} = httpConstants;

const urlPattern = /https?:\/\/[^\s"]+\.[^\s"]+$/;

module.exports = {
  CREATED_201,
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  FORBIDDEN_403,
  NOT_FOUND_404,
  INTERNAL_SERVER_ERROR_500,
  CONFLICT_409,
  urlPattern,
};
