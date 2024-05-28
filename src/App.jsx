import 'modern-normalize';
import './App.css';

import { useEffect, useState } from 'react';
// import { ImageGallery, SearchBar } from 'components/';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import Filters from './components/Filters/Filters';
// import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

import fetchPhotos from './apiService/unsplashApi';
import { useInView } from 'react-intersection-observer';

function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  //pagination

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  //filters
  const [orientation, setOrientation] = useState('');
  const [color, setColor] = useState('');
  const [content_filter, setContentFilter] = useState('low');
  const [order_by, setOrderBy] = useState('relevant');

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

        setLoading(true);

        setErr(false);
        const data = await fetchPhotos(query, page, orientation, color, content_filter, order_by);

        if(parseInt(data.total_pages) === parseInt(page) || parseInt(data.total_pages) === 0 || parseInt(data.total_pages) === 1) {
          setLoading(false);
        }

        if (page > 1) {
          setPhotos(prevItems => {
            return [...prevItems, ...data.results];
          });
        } else {
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

  function changeQuery(value) {
    setQuery(value);
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

  function handleOpenModal(currImg, currAlt) {
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
  function handleSetOrientation(evt) {
    setOrientation(evt.target.value);
    setPage(1);
  }
  function handleSetColor(evt) {
    setColor(evt.target.value);
    setPage(1);
  }
  function handleSetContentFilter(evt) {
    setContentFilter(evt.target.value);
    setPage(1);
  }
  function handleSetOrderBy(evt) {
    setOrderBy(evt.target.value);
    setPage(1);
  }

  return (
    <>
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
      {loading && <Loader ref={ref} visible={loading} />}
      {/* <Loader visible={loading} /> */}
      {imgSrc && (
        <ImageModal
          isOpen={isModalOpen}
          imgSrc={imgSrc}
          imgAlt={imgAlt}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default App;
