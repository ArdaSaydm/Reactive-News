import React, { useState, useEffect } from 'react';

import classes from './SearcBar.module.css';
import searchIcon from '../../assets/icons/search-light@2x.png';
import closeIcon from '../../assets/icons/Group-1157@2x.png';

function SearchBar(props) {
  const [openSearch, setOpenSearch] = useState(false);

  const filtered = props.allDatas.content.filter((data) => {
    if (data.title.toLowerCase().startsWith(props.searchedNews.toLowerCase())) {
      return true;
    }
  });

  const sorted = props.allDatas.content.sort(function(a,b){
    return new Date(b.date).getTime() / 1000 - new Date().getTime() / 1000;
  }).slice(0,6);

  let customStyle= {
    color:'var(--neon-blue)'
  }

  if(props.searchedNews.length < 3){
    customStyle= {
      color:'var(--sunny-red)'
    }
  }

  return (
    <div>
      <div className={classes.searchBarContainer}>
        <input
          type='text'
          value={props.searchedNews}
          autoComplete="off"
          placeholder={'Aranılacak başlığı giriniz'}
          className={classes.search}
          onChange={(e) => {
            props.setSearchedNews(e.target.value);
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
            onClick={(e) => props.setSearchedNews('')}
            alt='icon'
          />
          <div className={classes.iconWrapper}>
            <img src={searchIcon} className={classes.icon} onClick={(e)=>setOpenSearch(!openSearch)} alt='icon' />
          </div>
        </div>
      </div>
      {props.searchedNews.length > 0 ? (
        <div className={classes.searchBarTitles}>
          <h4 className={classes.title} style={customStyle}>
          {props.searchedNews.length < 3 ? 'Aramak için en az 3 harf girin.': `"${props.searchedNews}" ile başlayan arama önerileri` }
            
          </h4>
          {props.searchedNews.length >= 3 ?<div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'flex-start',
              justifySelf: 'flex-start',
            }}>
            {filtered.map((data) => {
              return <p style={{ display: 'block' }}>{data.title}</p>;
            })}
          </div>:''}
          {props.searchedNews.length >= 3 ?<button className={classes.button}>
            <h3 style={{ color: 'white' }}>Filtrele</h3>
          </button>:''}
        </div>
      ) : (
        ''
      )}
      {openSearch && props.searchedNews.length == 0 ? (
        <div className={classes.searchBarTitles}>
          <h4 className={classes.title}>
            Son Eklenenler
          </h4>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'flex-start',
              justifySelf: 'flex-start',
            }}>
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
