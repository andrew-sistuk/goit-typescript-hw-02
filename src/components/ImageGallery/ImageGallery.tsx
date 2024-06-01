import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { nanoid } from 'nanoid';
import { Props } from './ImageGallery.types';

const ImageGallery = ({ photos, openModal }: Props) => {
  const id = nanoid();
  return (
    <ul className={css.gallery}>
      {photos.map(photo => {
        // console.log(photo);
        return (
          <li className={css['gallery-item']} key={photo.id + id}>
            <ImageCard
              urls={photo.urls}
              user={photo.user}
              likes={photo.likes}
              description={photo.description}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
