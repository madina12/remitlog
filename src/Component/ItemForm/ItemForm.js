import React from "react";
import { withRouter } from "react-router";
import uuid from "uuid";

import Button from "../Buttons";

import "./ItemForm.css";

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        vastaanottaja: "",
        summa: 0,
        lahetyspaiva: null
      },
      name: "",
      names: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("lähetä lomake");
    let data = Object.assign({}, this.state.data);
    data.summa = parseFloat(data.summa);
    data.id = uuid.v4();

    this.props.onFormSubmit(data);
    this.props.history.push("/");
  }

  handleAddNewName = e => {
    const name = this.state.name;
    if (name) {
      const names = this.state.names.concat(name);
      this.setState({
        names: names,
        name: "",
        data: {
          ...this.state.data,
          saaja: names[0]
        }
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="itemform">
          <div className="itemform__row">
            <div>
              <label htmlfor="vastaanottaja">Vastaanottaja</label>
              <input
                type="text"
                name="vastaanottaja"
                size="10"
                value={this.state.data.vastaanottaja}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="btn">
            <div>
              <Button type="submit" primary>
                LISÄÄ
              </Button>
            </div>
          </div>
          <div className="itemform__row">
            <div>
              <label htmlfor="summa">Summa</label>
              <input
                type="number"
                name="summa"
                step="0.01"
                size="10"
                value={this.state.data.summa}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div>
            <label htmlfor="lahetyspaiva">Lahetyspäivä</label>
            <input
              type="date"
              name="lahetyspaiva"
              size="10"
              value={this.state.data.lahetyspaiva}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="itemform__row">
          <div>
            <Button onClick={this.handleCancel}>PERUUTA</Button>
          </div>
          <div>
            <Button type="submit" primary>
              LISÄÄ
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(ItemForm);
