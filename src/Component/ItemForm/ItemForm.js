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
        saaja: "",
        summa: 0,
        lahetyspaiva: null,
      },
      name: "",
      virhe: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInputChange(event) {
    console.log("handleInputChange")
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log(name, value)
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
    let data = Object.assign({}, this.state.data);
    if(data.saaja && data.summa && data.lahetyspaiva) {
      data.summa = parseFloat(data.summa);
      data.id = uuid.v4();
      this.setState({virhe: false});
      this.props.onFormSubmit(data);
      this.props.history.push("/");
    } else {
      this.setState({virhe: true});
    }
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
              <label htmlFor="saaja">Saaja</label>
              <select
                name="saaja"
                value={this.state.data.saaja}
                onChange={this.handleInputChange}
                >
                <option value="">Valitse</option>
                {this.props.selectList.map(item => <option value={item} key={item}>{item}</option>)}

              </select>
            </div>
          </div>

          <div className="itemform__row">
            <div>
              <label htmlFor="summa">Summa</label>
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

          <div className="itemform__row">
            <div>
              <label htmlFor="lahetyspaiva">Lahetyspäivä</label>
              <input
                type="date"
                name="lahetyspaiva"
                size="10"
                value={this.state.data.lahetyspaiva}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          {this.state.virhe &&
            <div className="itemform__row">
              <div>
                <p className="itemform__virhe">Täytä kaikki kentät!</p>
              </div>
            </div>
          }
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

        </div>
      </form>
    );
  }
}

export default withRouter(ItemForm);
