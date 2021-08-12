import React, { useState, useEffect } from 'react';

import ListItem from './ListItem';
import classes from './List.module.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: 'var(--neon-blue)';
`;

function List(props) {
  const [isFakeLoading, setFakeLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    setTimeout(
      function () {
        //Start the timer
        setFakeLoading(false);
      }.bind(this),
      2000
    );
  }, [isFakeLoading]);

  if (isFakeLoading)
    return (
      <ClipLoader
        color={'var(--neon-blue)'}
        loading={isFakeLoading}
        css={override}
        size={150}
      />
    );

  const filtered = props.allDatas.content.filter((data) => {
    // Category Filtering
    if(props.categoryFilter == 0 )
    return true;
    if (
      data.category.includes(props.categoryFilter) && data.category.includes(props.authorFilter) && new Date(props.startDate).getTime() / 1000 < data.published && new Date(props.endDate).getTime() / 1000 > data.published
    ) {
      return true;
    }else{
      return false;
    }
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
