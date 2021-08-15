import classes from './UsedFilterItem.module.css';
import timesLightIcon from '../../assets/icons/times-light-1@2x.png';

function UsedFilterItem(props) {
  return (
    <div className={classes.badge}>
      <div className={classes.centerItems}>
        <img src={props.icon} className={classes.icon} alt='filter-icon' />
        <span>{props.title}</span>
        <img src={timesLightIcon} className={classes.closeButton} onClick={()=>props.setFilter(props.initialData)} alt='close-icon' />
      </div>
    </div>
  );
}

export default UsedFilterItem;
