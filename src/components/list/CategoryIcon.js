import React, { useState, useEffect } from 'react';
import {
  FcNews,
  FcMoneyTransfer,
  FcSportsMode,
  FcAndroidOs,
  FcExpired,
} from 'react-icons/fc';

const style = { color: 'white', fontSize: '3em' };

const categoryIcons = [
  {
    id: 1,
    title: 'Haber',
    icon: <FcNews key={1} style={style} />,
  },
  {
    id: 2,
    title: 'Ekonomi',
    icon: <FcMoneyTransfer key={2} style={style} />,
  },
  {
    id: 3,
    title: 'Uzay',
    icon: <FcAndroidOs key={3} style={style} />,
  },
  {
    id: 4,
    title: 'Spor',
    icon: <FcSportsMode key={3} style={style} />,
  },
  {
    id: 5,
    title: 'Tarih',
    icon: <FcExpired key={5} style={style} />,
  },
];

function CategoryIcon(props) {
  const [icons, setIcons] = useState([]);
  useEffect(() => {
    setIcons(
      categoryIcons.filter((category) => {
        if (props.categories.includes(category.id)) {
          return true;
        }
      })
    );
  }, []);

  return (
    <div>
      {icons.map((icon) => {
        return icon.icon;
      })}
    </div>
  );
}

export default CategoryIcon;
