export type Props = {
  urls: {
    small: string,
    regular: string
  }
  user: { username: string };
  likes: number;
  description: string;
  openModal: (currImg: string, currAlt: string) => void
}