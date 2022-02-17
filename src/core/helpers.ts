import { RequestError } from '@Core/Errors';

export const requestErrorHandler = e => {
  if (e.code === 'unauthorized') {
    return Promise.reject(e);
  }

  if (e instanceof RequestError) {
    console.log(e.message);
  } else {
    console.error(e);
  }

  return Promise.reject(e);
};

