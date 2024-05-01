
import './App.css';
import React, { Component } from 'react';



class App extends Component {
constructor(props){
    super(props);
    this.state = {
      notes: []
    }
}

API_URL = "http://localhost:5038/";

componentDidMount(){
  this.refereshNotes();
}

async refereshNotes(){
  fetch(this.API_URL+"api/Dsc/GetNotes")
  .then(response =>response.json())
  .then(data=>{
    this.setState({notes:data});
  })
  .catch(error => {
    console.error('Error fetching notes:', error);
  });
}

async addclick() {
  var newNotesElement = document.getElementById("NewNotes");
  if (newNotesElement) {
    var newNotes = newNotesElement.value;
    const data = new FormData();
    data.append("newNotes", newNotes);
    fetch(this.API_URL + "api/Dsc/AddNotes", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes(); // Refresh notes after adding new note
        newNotesElement.value = ''; // Clear input after adding
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  } else {
    console.error("Element with ID 'NewNotes' not found.");
  }
}



async deleteclick(id) {
  fetch(this.API_URL + "api/Dsc/DeleteNotes?id=" + id, {
    method: "DELETE",
  })
  .then(res => res.json())
  .then((result) => {
    alert(result);
    this.refereshNotes();
  })
  .catch(error => {
    console.error('Error deleting note:', error);
  });
}

render() {
  const {notes}=this.state;
  return (
    <div className="App">
      <h2>To do</h2>
      <input id="NewNotes" />&nbsp;
      <button onClick={()=>this.addclick()}>Add</button>
      {notes.map(notes => (
  <p key={notes.id}>
    <b> {notes.desc}</b>&nbsp;
    <button onClick={()=>this.deleteclick(notes.id)}>Delete</button>
  </p>
))}
    </div>
  );
}
}

export default App;
