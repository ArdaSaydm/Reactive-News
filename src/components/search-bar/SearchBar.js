import React, { useState, useRef } from 'react';

import classes from './SearcBar.module.css';
import searchIcon from '../../assets/icons/search-light@2x.png';
import closeIcon from '../../assets/icons/Group-1157@2x.png';

function SearchBar(props) {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchedNews, setSearchedNews] = useState('');

  let searchBarRef = useRef();

  const filtered = props.allDatas.content.filter((data) => {
    if (data.title.toLowerCase().startsWith(searchedNews.toLowerCase())) {
      return true;
    }
  });

  const sorted = props.allDatas.content
    .sort(function (a, b) {
      return new Date(b.date).getTime() / 1000 - new Date().getTime() / 1000;
    })
    .slice(0, 6);

  let customStyle = {
    color: 'var(--neon-blue)',
  };

  if (searchedNews.length < 3) {
    customStyle = {
      color: 'var(--sunny-red)',
    };
  }

  return (
    <div>
      <div className={classes.searchBarContainer}>
        <input
          type='text'
          ref={searchBarRef}
          value={searchedNews}
          autoComplete='off'
          placeholder={'Aranılacak başlığı giriniz'}
          className={classes.search}
          onChange={(e) => {
            setSearchedNews(e.target.value);
          }}
          name='search'
          id='search'
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <img
            src={closeIcon}
            className={classes.closeIcon}
            onClick={() => {
              setSearchedNews('');
              props.setSearchedNews('');
              setOpenSearch(false);
            }}
            alt='icon'
          />
          <div className={classes.iconWrapper}>
            <img
              src={searchIcon}
              className={classes.icon}
              onClick={() => setOpenSearch(!openSearch)}
              alt='icon'
            />
          </div>
        </div>
      </div>
      {searchedNews.length > 0 ? (
        <div className={classes.searchBarTitles}>
          <h4 className={classes.title} style={customStyle}>
            {searchedNews.length < 3
              ? 'Aramak için en az 3 harf girin.'
              : `"${searchedNews}" ile başlayan arama önerileri`}
          </h4>
          {searchedNews.length >= 3 ? (
            <div className={classes.searchList}>
              {filtered.map((data) => {
                return <p style={{ display: 'block' }}>{data.title}</p>;
              })}
            </div>
          ) : (
            ''
          )}
          {searchedNews.length >= 3 ? (
            <button
              className={classes.button}
              onClick={() => {
                setOpenSearch(false);
                setSearchedNews("");
                props.setFakeLoading(true);
                props.setSearchedNews(searchedNews);
              }}>
              <h3 style={{ color: 'white' }}>Filtrele</h3>
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {openSearch && searchedNews.length == 0 ? (
        <div className={classes.searchBarTitles}>
          <h4 className={classes.title}>Son Eklenenler</h4>
          <div className={classes.searchList}>
            {sorted.map((data) => {
              return <p style={{ display: 'block' }}>{data.title}</p>;
            })}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default SearchBar;
