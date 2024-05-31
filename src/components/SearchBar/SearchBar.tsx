import toast, { Toaster } from 'react-hot-toast';
import { IoSearchOutline } from "react-icons/io5";


import { Props } from './SearchBar.types';

import css from './SearchBar.module.css';
import { FormEvent } from 'react';


const SearchBar = ({changeFilter}: Props ) => {
    function handleSubmit(evt: FormEvent<HTMLFormElement>) { 
        evt.preventDefault();
        const evtForm = evt.target as HTMLFormElement;
        const elements = evtForm.elements as HTMLFormControlsCollection;
        const searchBar = elements.namedItem('searchBar') as HTMLInputElement;

        if(!searchBar.value.trim()){
            toast.error('You must write some text!');
            return;
        }
        changeFilter(searchBar.value.trim());
        evtForm.reset();
    }
    
  return (
    <header className={css['search-form']}>
      <form onSubmit={handleSubmit}>
        <input className={css["search-bar"]} name="searchBar" type="text" autoComplete="off" autoFocus placeholder="Search images and photos" />
        <button className={css["search-btn"]} name="submitBtn" type="submit"><IoSearchOutline /></button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
