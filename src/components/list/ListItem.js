import classes from './ListItem.module.css';
import Card from '../../ui/card/Card';
import CategoryIcon from './CategoryIcon';

import dateToTr from '../../consts/dateToTr';
function ListItem(props) {
  const item = props.data;



  const splittedSrc = item.thumb.src.split("/");
  const splitFromMimeType = splittedSrc[5].split('.');
  const altText = splitFromMimeType[0];

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <div>
          <img
            className={classes.image}
            src={item.thumb.src}
            alt={altText}
          />
          <h3>
            {item.title.length >= 80
              ? item.title.substring(0, 80) + '...'
              : item.title}
          </h3>
        </div>
        <div className={classes.infos}>
          <CategoryIcon categories={props.data.category} />
          <p className={classes.dateParagraph}>{dateToTr(item.published)}</p>
        </div>
      </div>
    </Card>
  );
}

export default ListItem;
