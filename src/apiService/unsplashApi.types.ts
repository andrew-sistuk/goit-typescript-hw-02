export type Orientation = '' | 'landscape' | 'portrait' | 'squarish';
export type ContentFilter = 'low' | 'high';
export type OrderBy = 'relevant' | 'latest';
export type Color =
  | ''
  | 'black_and_white'
  | 'black'
  | 'white'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'purple'
  | 'magenta'
  | 'green'
  | 'teal'
  | 'blue';

export type ObjPhoto = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  user: { username: string };
  likes: number;
  description: string;
};

export type fetchData = {
  total_pages: string;
  results: ObjPhoto[];
};

export type FetchPhotos = (
  query: string,
  page: number,
  orientation: Orientation,
  color: Color,
  content_filter: ContentFilter,
  order_by: OrderBy
) => Promise<fetchData>;

export type Options = {
  query: string;
  page: number;
  content_filter: ContentFilter;
  order_by: OrderBy;
  orientation?: Orientation;
  color?: Color;
};
