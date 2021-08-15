import React, { useState, useEffect,useRef } from 'react';

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
  const [shuffle, setShuffle] = useState(0);

  const [searchedNews, setSearchedNews] = useState('');
  const [isFakeLoading, setFakeLoading] = useState(true);

  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(baseURL);

      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevShuffle = usePreviousValue(shuffle);

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
          setFakeLoading={setFakeLoading}
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
          searchedNews={searchedNews}
          setSearchedNews={setSearchedNews}
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
          searchedNews={searchedNews}
          setSearchedNews={setSearchedNews}
          setFakeLoading={setFakeLoading}
          isFakeLoading={isFakeLoading}
          setShuffle={setShuffle}
          shuffle={shuffle}
          prevShuffle={prevShuffle}
        />
      </div>

      <div className={classes.rightContainer}>
        <IconCard>
          <img
            src={randomLightIcon}
            onClick = {()=>setShuffle(shuffle+1)}
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
          setFakeLoading={setFakeLoading}
        />
        <div></div>
      </div>
    </div>
  );
}

export default HomeScreen;
