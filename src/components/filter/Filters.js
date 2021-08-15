import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import classes from './Filters.module.css';

import filterRegular from '../../assets/icons/filter-regular@2x.png';
import categoriesIcon from '../../assets/icons/categories.png';
import sortingIcon from '../../assets/icons/sorting.png';
import userIcon from '../../assets/icons/user-circle-solid@2x.png';
import dateIcon from '../../assets/icons/Group-1163@2x.png';

import Card from '../../ui/card/Card';
import sortingConsts from '../../consts/sortingConsts';
registerLocale('tr', tr);

function Filters(props) {
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [sortingFilter, setSortingFilter] = useState(1);
  const [authorFilter, setAuthorFilter] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = (
    categoryId,
    sortingId,
    editorId,
    startDate,
    endDate
  ) => {
    props.setCategoryFilter(parseInt(categoryId));
    props.setSortingFilter(parseInt(sortingId));
    props.setAuthorFilter(parseInt(editorId));
    props.setStartDate(startDate);
    props.setEndDate(endDate);
    props.setFakeLoading(true);
  };

  return (
    <Card style={{ marginTop: '80px' }}>
      <div className={classes.filterAlignment}>
        <img src={filterRegular} className={classes.icon} alt='icon' />
        <h3 className={classes.filterTitle}>
          Sonuçları Filtrele
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </h3>
      </div>
      <div>
        <div className={classes.formControl}>
          <img src={dateIcon} className={classes.icon} alt='icon' />
          <label className={classes.title}>Tarih Aralığı</label>
        </div>
        <div className={classes.flexListColumn}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className={classes.datePickerInputStyle}
            maxDate={new Date()}
            locale='tr'
            dateFormat='dd/MM/yyyy'
            placeholderText='Başlangıç'
          />
          <br />
          <DatePicker
            selected={endDate}
            className={classes.datePickerInputStyle}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            maxDate={new Date()}
            locale='tr'
            dateFormat='dd/MM/yyyy'
            placeholderText='Bugün'
          />{' '}
        </div>

        <div className={classes.formControl}>
          <img src={categoriesIcon} className={classes.icon} alt='icon' />
          <label className={classes.title}>Kategoriler</label>
        </div>
        <div className={classes.flexListColumn}>
          <select
            value={categoryFilter}
            name='categories'
            id='categories'
            onChange={(e) => setCategoryFilter(parseInt(e.target.value))}
            className={classes.inputStyle}>
            <option value='0'>Tümü</option>
            {props.allDatas.categories.map((category) => {
              return (
                <option key={category.id} value={category.id} defaultValue>
                  {category.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes.formControl}>
          <img src={sortingIcon} className={classes.icon} alt='icon' />
          <label className={classes.title}>Sıralama</label>
        </div>
        <div className={classes.flexListColumn}>
          <select
            value={sortingFilter}
            onChange={(e) => setSortingFilter(parseInt(e.target.value))}
            className={classes.inputStyle}>
            {sortingConsts.map((sorting) => {
              return (
                <option key={sorting.id} value={sorting.id}>
                  {sorting.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes.formControl}>
          <img src={userIcon} className={classes.icon} alt='icon' />
          <label className={classes.title}>Editör</label>
        </div>
        <div className={classes.flexListColumn}>
          <select
            value={authorFilter}
            className={classes.inputStyle}
            onChange={(e) => setAuthorFilter(parseInt(e.target.value))}>
            {' '}
            <option value='0'>Tümü</option>
            {props.allDatas.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}>
        <button
          className={classes.button}
          onClick={() =>
            handleFilter(
              categoryFilter,
              sortingFilter,
              authorFilter,
              startDate,
              endDate
            )
          }>
          <h3 style={{ color: 'white' }}>Filtrele</h3>
        </button>
      </div>
    </Card>
  );
}

export default Filters;
