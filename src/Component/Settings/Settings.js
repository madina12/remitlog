import React from 'react';
import Content from '../Content/Content';
import Button from '../Buttons';
import './Settings.css';
function Settings(props)
{
  const handleSubmit = function (event)
  {
    event.preventDefault()
    let saaja = event.target.elements.saaja.value;
    props.onFormSubmit(saaja);
    event.target.elements.saaja.value = "";
  }

  return (
    <Content>
      <div className="settings">
        <h2>Settings</h2>

        {props.selectList.map(item => <div key={item}>{item}</div>)}

        <h3>Saaja</h3>
        <div className="settings__items">
          <form onSubmit={handleSubmit}>
            <div className="settingsForm">
              <input type="text" name="saaja" />
              <Button type="submit" primary>lisää</Button>
            </div>
          </form>
        </div>
      </div>
    </Content>
  );
}
export default Settings;