import React from "react";
import Content from "../Content/Content";
import "./Additem.css";
import ItemForm from "../ItemForm/ItemForm";

function AddItem(props) {
  return (
    <Content>
      <div className="additen">
        <h2> Uuden lähetyksen lisääminen </h2>{" "}
        <ItemForm onFormSubmit={props.onFormSubmit} />{" "}
      </div>{" "}
    </Content>
  );
}
export default AddItem;
