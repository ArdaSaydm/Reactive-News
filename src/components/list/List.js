import React, { useState, useEffect,useRef } from 'react';

import ListItem from './ListItem';
import classes from './List.module.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: 'var(--neon-blue)';
`;

const usePreviousValue = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};



function List(props) {
  useEffect(async () => {
    setTimeout(
      function () {
        props.setFakeLoading(false);
      }.bind(this),
      2000
    );
  }, [props.isFakeLoading, props.shuffle]);

  if (props.isFakeLoading)
    return (
      <ClipLoader
        color={'var(--neon-blue)'}
        loading={props.isFakeLoading}
        css={override}
        size={150}
      />
    );

  const filtered = props.allDatas.content
    .filter((data) => {
      // Category Filtering
      if (props.categoryFilter === 0) return true;

      if (data.category.includes(props.categoryFilter)) {
        return true;
      } else {
        return false;
      }
    })
    .filter((data) => {
      // Category Filter
      if (props.authorFilter === 0) return true;

      if (data.category.includes(props.authorFilter)) {
        return true;
      } else {
        return false;
      }
    })
    .filter((data) => {
      // Author Filter
      if (props.authorFilter === 0) return true;

      if (data.author === props.authorFilter) {
        return true;
      } else {
        return false;
      }
    })
    .filter((data) => {
      // Author Filter
      if (props.startDate === '') return true;

      if (data.published >= new Date(props.startDate).getTime() / 1000) {
        return true;
      } else {
        return false;
      }
    })
    .filter((data) => {
      // Author Filter
      if (props.endDate === '') return true;

      if (data.published <= new Date(props.endDate).getTime() / 1000) {
        return true;
      } else {
        return false;
      }
    })
    .filter((data) => {
      // SearchBar Filtering
      if (props.searchedNews === '') return true;

      if (
        data.title.toLowerCase().startsWith(props.searchedNews.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    })
    .sort((a, b) => {
      if (props.sortingFilter === 1) {
        return b.published - a.published;
      } else {
        return a.published - b.published;
      }
    })
    .sort((a, b) => {
      if(props.prevShuffle != props.shuffle)
        return 0.5 - Math.random();
    });

  return (
    <div>
      {' '}
      <h2 style={{ color: 'var(--neon-blue)' }}>{filtered.length} Sonuç:</h2>
      <div className={classes.list}>
        {filtered.map((data) => {
          return <ListItem key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
}

export default List;
