import axios from 'axios';
import { FetchPhotos, Options, fetchData } from './unsplashApi.types';

const apiKey = import.meta.env.VITE_API_KEY;

console.log(apiKey);

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Accept-Version'] = 'v1';
// axios.defaults.headers.common['Authorization'] =
//   'Client-ID 8nQ0M-aBYfkEhBu7oUnQmCJnSQcd3XyKBPTmc-X9Czg';

axios.defaults.headers.common['Authorization'] = apiKey;

axios.defaults.params = { per_page: 15 };

const fetchPhotos: FetchPhotos = async (
  query,
  page,
  orientation,
  color,
  content_filter,
  order_by
) => {
  const options: Options = {
    query,
    page,
    content_filter,
    order_by,
  };

  if (orientation) {
    options['orientation'] = orientation;
  }

  if (color) {
    options['color'] = color;
  }

  const response = await axios.get<fetchData>('/search/photos', {
    params: options,
  });

  // це залишаю чисто показати що іноді сервер повертає менше 15 фото (Наприклад при запиті cats 2 сторінка в мене повертає 14)
  console.log(query, page, orientation, color, content_filter, order_by);
  console.log(response.data);

  return response.data;
};

export default fetchPhotos;
