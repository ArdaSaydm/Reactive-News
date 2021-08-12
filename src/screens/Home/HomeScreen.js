import React, { useState, useEffect } from 'react';

import List from '../../components/list/List';
import classes from './HomeScreen.module.css';
import UsedFilterList from '../../components/filter/UsedFilterList';
import randomLightIcon from '../../assets/icons/random-light@2x.png';
import Filters from '../../components/filter/Filters';
import SearchBar from '../../components/search-bar/SearchBar';
import IconCard from '../../ui/card/IconCard';
import axios from 'axios';
import { css } from '@emotion/react';

import ClipLoader from 'react-spinners/ClipLoader';

const baseURL = 'https://files.revsrv.com/f6aqr01fM/dummy.json';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: 'var(--neon-blue)';
`;

function HomeScreen() {
  const [allDatas, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [authorFilter, setAuthorFilter] = useState(0);
  const [sortingFilter, setSortingFilter] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchedNews, setSearchedNews] = useState('');

  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(baseURL);

      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (!allDatas)
    return (
      <ClipLoader color={'black'} loading={loading} css={override} size={150} />
    );

  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <SearchBar
          searchedNews={searchedNews}
          setSearchedNews={setSearchedNews}
          allDatas={allDatas}
        />
        <UsedFilterList
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          sortingFilter={sortingFilter}
          setSortingFilter={setSortingFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          allDatas={allDatas}
        />
        <List
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          sortingFilter={sortingFilter}
          setSortingFilter={setSortingFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          allDatas={allDatas}
        />
      </div>

      <div className={classes.rightContainer}>
        <IconCard>
          <img
            src={randomLightIcon}
            onClick={(e) => {
              console.log("Shuffle Clicked")
            }}
            className={classes.icon}
            alt='icon'
          />
        </IconCard>
        <Filters
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          sortingFilter={sortingFilter}
          setSortingFilter={setSortingFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          allDatas={allDatas}
        />
        <div></div>
      </div>
    </div>
  );
}

export default HomeScreen;
