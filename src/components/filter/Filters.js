import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import classes from './Filters.module.css';
import filterRegular from '../../assets/icons/filter-regular@2x.png';
import dateIcon from '../../assets/icons/Group-1163@2x.png';
import categoriesIcon from '../../assets/icons/categories.png';
import sortingIcon from '../../assets/icons/sorting.png';
import userIcon from '../../assets/icons/user-circle-solid@2x.png';
import Card from '../../ui/card/Card';
import sortingConsts from '../../consts/sortingConsts';
registerLocale('tr', tr);

function Filters(props) {
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DatePicker
            selected={props.startDate}
            onChange={(date) => props.setStartDate(date)}
            className={classes.inputStyle}
            maxDate={new Date()}
            locale='tr'
            dateFormat="dd/MM/yyyy"
            placeholderText='Başlangıç'
          />
          <br />
          <DatePicker
            selected={props.endDate}
            onChange={(date) => props.setEndDate(date)}
            locale='tr'
            minDate={props.startDate}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className={classes.inputStyle}
            placeholderText='Bugün'
          />{' '}
        </div>

        <div className={classes.formControl}>
          <img src={categoriesIcon} className={classes.icon} alt='icon' />
          <label className={classes.title}>Kategoriler</label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            value={props.categoryFilter}
            name='categories'
            id='categories'
            className={classes.inputStyle}
            onChange={(e) => props.setCategoryFilter(parseInt(e.target.value))}>
            <option value='0'>Tümü</option>
            {props.allDatas.categories.map((category) => {
              return (
                <option value={category.id} selected>
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            value={props.sortingFilter}
            onChange={(e) => props.setSortingFilter(parseInt(e.target.value))}
            className={classes.inputStyle}>
            {sortingConsts.map((sorting) => {
              return <option value={sorting.id}>{sorting.title}</option>;
            })}
          </select>
        </div>

        <div className={classes.formControl}>
          <img src={userIcon} className={classes.icon} alt='icon' />
          <label className={classes.title}>Editör</label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            value={props.authorFilter}
            className={classes.inputStyle}
            onChange={(e) => props.setAuthorFilter(parseInt(e.target.value))}>
            <option value='0'>Tümü</option>
            {props.allDatas.authors.map((author) => {
              return <option value={author.id}>{author.title}</option>;
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
        <button className={classes.button}>
          <h3 style={{ color: 'white' }}>Filtrele</h3>
        </button>
      </div>
    </Card>
  );
}

export default Filters;
