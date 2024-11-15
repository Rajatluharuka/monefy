import React from "react";
import styles from "./SingleExpense.module.css";

const SingleExpense = (props) => {
  return (
    <div className={styles.expenseItem}>
      <li>
        <i className={styles.expenseDetails}>
          {props.category} - {props.amount} - {props.desc} -
        </i>
        <button
          onClick={() => props.editHandler(props.id)}
          className={styles.editBtn}
        >
          Edit
        </button>
        <button
          onClick={() => props.deleteHandler(props.id)}
          className={styles.deleteBtn}
        >
          Delete
        </button>
      </li>
    </div>
  );
};

export default SingleExpense;
