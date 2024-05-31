import css from './ImageCard.module.css';
import { Props } from './ImageCard.types';

const ImageCard = ({ urls, user: { username }, likes, description, openModal }: Props) => {
  const alt = `${description}, photo by ${username}`;
  return (
    <div className={css.conteiner}>
      <img
        className={css.img}
        src={urls.small}
        alt={alt}
        onClick={() => {
          openModal(urls.regular, alt);
        }}
        loading="lazy"
      />
      <div className={css['img-card']}>
        <span>Likes: {likes} </span>
        <span>User: {username}</span>
      </div>
    </div>
  );
};

export default ImageCard;
