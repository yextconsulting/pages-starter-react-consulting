import { ReactElement } from "react";

type ColumnsProps = {
  className: string,
  column1?: ReactElement,
  column2?: ReactElement,
  column3?: ReactElement,
  column4?: ReactElement,
};

const Columns = (props: ColumnsProps) => {
  const amountOfColumns = [props.column1, props.column2, props.column3, props.column4]
    .filter(colEl => colEl !== undefined)
    .length;
  const colClassName = `w-full md:w-1/${amountOfColumns}`;

  return (
    <div className={props.className}>
      <div className="centered-container flex flex-col md:flex-row">
        {props.column1 && (
          <div className={colClassName}>
            {props.column1}
          </div>
        )}
        {props.column2 && (
          <div className={colClassName}>
            {props.column2}
          </div>
        )}
        {props.column3 && (
          <div className={colClassName}>
            {props.column3}
          </div>
        )}
        {props.column4 && (
          <div className={colClassName}>
            {props.column4}
          </div>
        )}
      </div>
    </div>
  )
};

export {
  Columns,
};