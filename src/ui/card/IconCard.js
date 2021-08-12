import classes from './IconCard.module.css';

function IconCard(props) {
  return <div className={classes.iconWrapper}>{props.children}</div>;
}

export default IconCard;
