import UsedFilterItem from './UsedFilterItem';
import classes from './UsedFilterList.module.css';
import categoriesIcon from '../../assets/icons/categories.png';
import userIcon from '../../assets/icons/user-circle-solid@2x.png';
import sortingConsts from '../../consts/sortingConsts';
import sortingIcon from '../../assets/icons/sorting.png';
import dateToTr from '../../consts/dateToTr';
import dateIcon from '../../assets/icons/Group-1163@2x.png';



function UsedFilterList(props) {
  return (
    <div className={classes.wrapper}>
      {props.allDatas.categories.map((category) => {
        if(props.categoryFilter === category.id && category.id!=0){
          return <UsedFilterItem icon={categoriesIcon} filter={props.categoryFilter} setFilter={props.setCategoryFilter} key={category.id} title={category.title} id={category.id} />
        }
      })}
      {props.allDatas.authors.map((author) => {
        if(props.authorFilter === author.id && author.id!=0){
          return <UsedFilterItem icon={userIcon} filter={props.authorFilter} setFilter={props.setAuthorFilter} key={author.id} title={author.title} id={author.id} />
        }
      })}
      {
        sortingConsts.map((sorting) => {
        if(props.sortingFilter === sorting.id && sorting.id!=0){
          return <UsedFilterItem icon={sortingIcon} filter={props.sortingFilter} setFilter={props.setSortingFilter} key={sorting.id} title={sorting.title} id={sorting.id} />
        }
      })
     }
      {
        (props.startDate != "" && props.endDate!="") ?
          <UsedFilterItem icon={dateIcon} key={props.startDate} title={`${dateToTr(new Date(props.startDate).getTime() / 1000)} - ${dateToTr(new Date(props.endDate).getTime() / 1000)}`}/>:''
     }
    </div>
  );
}

export default UsedFilterList;
