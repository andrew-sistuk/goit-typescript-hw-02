export type Props = {
  photos: {
    id: string;
    urls: {
      small: string;
      regular: string;
    };
    user: {
      username: string;
    };
    likes: number;
    description: string;
  }[];
  openModal: (currImg: string, currAlt: string) => void;
};
