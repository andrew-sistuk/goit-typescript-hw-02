import 'modern-normalize';
import css from './App.module.css';
import './App.css';

import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ErrorMessage, SearchBar, ImageGallery, Loader, ImageModal, Filters } from 'components';
// import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

import { fetchPhotos, Orientation, ContentFilter, OrderBy, Color, ObjPhoto } from 'apiService';

function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<ObjPhoto[]>([]);
  //pagination

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(false);
  const [err, setErr] = useState(false);

  //filters
  const [orientation, setOrientation] = useState<Orientation>('');
  const [color, setColor] = useState<Color>('');
  const [content_filter, setContentFilter] = useState<ContentFilter>('low');
  const [order_by, setOrderBy] = useState<OrderBy>('relevant');

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //modal img
  const [imgSrc, setImgSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  // Infinity scroll
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    async function callFetchPhotos() {
      try {
        if (!query) {
          return;
        }

        if (page === 1) {
          setLoadingFirst(true);
        } else {
          setLoadingFirst(false);
        }

        setErr(false);
        const data = await fetchPhotos(query, page, orientation, color, content_filter, order_by);

        if (
          parseInt(data.total_pages) === page ||
          parseInt(data.total_pages) === 0 ||
          parseInt(data.total_pages) === 1
        ) {
          setLoading(false);
        }

        if (page > 1) {
          setPhotos(prevItems => {
            return [...prevItems, ...data.results];
          });
        } else {
          setLoading(true);
          setLoadingFirst(false);
          setPhotos(data.results);
        }
      } catch {
        setErr(true);
      }
    }
    callFetchPhotos();
  }, [query, page, orientation, color, content_filter, order_by]);

  useEffect(() => {
    if (inView) {
      setPage(prevPage => {
        return prevPage + 1;
      });
    }
  }, [inView]);

  function changeQuery(value: string) {
    setQuery(prevValue => {
      if (prevValue === value) {
        setPhotos([]);
      }
      return value;
    });
    // setQuery(value);
    setPage(1);
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleResetFilters() {
    setOrientation('');
    setColor('');
    setContentFilter('low');
    setOrderBy('relevant');
    setPage(1);
  }

  function handleOpenModal(currImg: string, currAlt: string) {
    setImgSrc(currImg);
    setImgAlt(currAlt);
    setIsModalOpen(prev => !prev);
  }

  // кнопка містить аналогічний функціонал
  // function loadMore() {

  //   setPage(prevPage => {
  //     return prevPage + 1;
  //   });
  // }

  // вірно фільтри реалізовувати як елементи форми було б. Але згідно з тз,
  // і так як це я додав їх від себе я виніс функціонал в окрему компоненту
  function evtValue<T>(evt: ChangeEvent<HTMLSelectElement>): T {
    const evtForm = evt.target as HTMLSelectElement;
    return evtForm.value as T;
  }

  function handleSetOrientation(evt: ChangeEvent<HTMLSelectElement>) {
    setOrientation(evtValue<Orientation>(evt));
    setPage(1);
  }
  function handleSetColor(evt: ChangeEvent<HTMLSelectElement>) {
    setColor(evtValue<Color>(evt));
    setPage(1);
  }
  function handleSetContentFilter(evt: ChangeEvent<HTMLSelectElement>) {
    setContentFilter(evtValue<ContentFilter>(evt));
    setPage(1);
  }
  function handleSetOrderBy(evt: ChangeEvent<HTMLSelectElement>) {
    setOrderBy(evtValue<OrderBy>(evt));
    setPage(1);
  }

  return (
    <div className={css.container}>
      <SearchBar changeFilter={changeQuery} />
      <Filters
        orientation={orientation}
        color={color}
        content_filter={content_filter}
        order_by={order_by}
        handleSetOrientation={handleSetOrientation}
        handleSetColor={handleSetColor}
        handleSetContentFilter={handleSetContentFilter}
        handleSetOrderBy={handleSetOrderBy}
        resetFilters={handleResetFilters}
      />

      {err && <ErrorMessage />}
      {/* щоб нуля не було */}
      {!!photos.length && <ImageGallery photos={photos} openModal={handleOpenModal} />}
      {/*loading && <LoadMoreBtn loadMore={loadMore} /> */}
      {loadingFirst && <Loader visible={loadingFirst} />}
      {loading && <Loader ref={ref} visible={loading} />}
      {imgSrc && (
        <ImageModal
          isOpen={isModalOpen}
          imgSrc={imgSrc}
          imgAlt={imgAlt}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
