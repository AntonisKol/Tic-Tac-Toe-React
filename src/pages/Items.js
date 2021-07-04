import { useState, useEffect } from 'react';
import Item from '../components/Item';
import { useHistory } from 'react-router';

function Items() {

  let history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/auth')
    }
  })
  
      const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token')
  }
  const [form, setForm] = useState({
  product: '',
  quantity:''
});
  
  const [items, setItems] = useState([
  ]);
 
  const fillForm = (e, field) => {
    let newForm = {...form};
    newForm[field] = e.target.value;
    setForm(newForm);
  }
 
 const formSubmitHandler = (e) => {
   e.preventDefault();

    const  url = 'https://tictactoe-auth.herokuapp.com/items/new';
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(form)
    }
     fetch(url, options).then(data => data.json().then(output => setItems([...items, output])))
 }

 useEffect(() => {
  const url ='https://tictactoe-auth.herokuapp.com/items/all';
  const options = {
    headers 
  }
  fetch(url, options).then(data => data.json().then(output => {
    if (output.status ==='success') {
    setItems(output.data);
    } else {
      console.log(output.message);
    }
  })); 
}, []
); 

const deleteItemHandler = (id) => {

  const url ='https://tictactoe-auth.herokuapp.com/items/'+ id;
  const options = {
    method: "DELETE",
    headers
  }

  fetch(url, options)
  .then(response => response.json().then(output => {

  if(output.status === 'success'){
    alert(output.message);
    let newList = items.filter(item => {
      if(item._id !== output.data){ 
        return item
      }
     });
     setItems(newList);
  } else {
      alert('ERROR')
      console.log(output.message);
   }
  }))
  .catch(err=>{
    alert(err)
  })
}

let products = [];
if(typeof(items) =='object' && items.length > 0){
  products = items.map(item => <Item  
    key={item['_id']}  
    item = {item}
    deleteItem = {deleteItemHandler.bind(this,item['_id'])}
   />);
}
  
 return (

    <div className="App">
      <h1>Shopping List</h1>
    <form className="form" 
          onSubmit={formSubmitHandler}>
    <input required 
          placeholder='Product'
          value={form.product} 
          onChange= {(e) => fillForm(e, 'product')}/>
    <input required 
          placeholder='Quantity'
          value={form.quantity} 
          onChange= {(e) => fillForm(e, 'quantity')}/>
    <button  
            type="submit" 
            className='create-button'>Add Item</button>
    </form>
    <section className='shopping-list'>
      {products} 
    </section>
    </div>
  );
}
export default Items;
