import UsedFilterItem from './UsedFilterItem';
import classes from './UsedFilterList.module.css';
import categoriesIcon from '../../assets/icons/categories.png';
import userIcon from '../../assets/icons/user-circle-solid@2x.png';
import sortingConsts from '../../consts/sortingConsts';
import sortingIcon from '../../assets/icons/sorting.png';
import searchIcon from '../../assets/icons/search-light@2x.png';
import dateToTr from '../../consts/dateToTr';
import dateIcon from '../../assets/icons/Group-1163@2x.png';

function UsedFilterList(props) {
  return (
    <div className={classes.wrapper}>
      {props.allDatas.categories.map((category) => {
        if (props.categoryFilter === category.id && category.id !== 0) {
          return (
            <UsedFilterItem
              icon={categoriesIcon}
              filter={props.categoryFilter}
              setFilter={props.setCategoryFilter}
              key={category.id}
              title={category.title}
              initialData={0}
              id={category.id}
            />
          );
        }
      })}
      {props.allDatas.authors.map((author) => {
        if (props.authorFilter === author.id && author.id !== 0) {
          return (
            <UsedFilterItem
              icon={userIcon}
              filter={props.authorFilter}
              setFilter={props.setAuthorFilter}
              key={author.id}
              title={author.title}
              initialData={0}
              id={author.id}
            />
          );
        }
      })}
      {props.searchedNews.length !== 0 ? (
        <UsedFilterItem
          icon={searchIcon}
          filter={props.searchedNews}
          setFilter={props.setSearchedNews}
          key={props.searchedNews}
          title={`"${props.searchedNews}" ile başlayan arama önerileri`}
          initialData={""}
        />
      ) : (
        ''
      )}
      {sortingConsts.map((sorting) => {
        if (props.sortingFilter === sorting.id && sorting.id !== 0) {
          return (
            <UsedFilterItem
              icon={sortingIcon}
              filter={props.sortingFilter}
              setFilter={props.setSortingFilter}
              key={sorting.id}
              title={sorting.title}
              initialData={1}
              id={sorting.id}
            />
          );
        }
      })}
      {
        (props.startDate !== "") ?
          <UsedFilterItem icon={dateIcon} filter={props.startDate} setFilter={props.setStartDate} key={props.startDate} title={`${dateToTr(new Date(props.startDate).getTime() / 1000)}'den sonra`} initialData={""} />:''
     }
      {
        (props.endDate!=="") ?
          <UsedFilterItem icon={dateIcon} filter={props.endDate} setFilter={props.setEndDate} key={props.endDate} title={`${dateToTr(new Date(props.endDate).getTime() / 1000)}'den önce`} initialData={""} />:''
     }
    </div>
  );
}

export default UsedFilterList;
