import css from './LoadMoreBtn.module.css';

import { Props } from './LoadMoreBtn.types';

const LoadMoreBtn = ({ loadMore }: Props) => {
  return (
    <button className={css.button} type="button" onClick={loadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
