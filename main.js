let form = document.getElementById('form');
form.addEventListener('submit',store);
let itemList=document.getElementById('items');

itemList.addEventListener('click',removeExpense);
itemList.addEventListener('click',editExpense);

function store(e){
    e.preventDefault();
    let describe=document.getElementById('floatingInputValue').value;
    let category=document.getElementById('choose').value;
    let amount=document.getElementById('amount').value;
    let myObj={
        Category:category,
        Description:describe,
        Amount:amount,
    }
    let myObjNew=JSON.stringify(myObj);
    localStorage.setItem(describe,myObjNew);
    let myObjoriginal=JSON.parse(myObjNew);
    let li=document.createElement('li');
    li.className='item';
    li.appendChild(document.createTextNode('₹ '+amount+' '+category+' '+describe));
    let deleteBtn=document.createElement('button');
    let editBtn=document.createElement('button');
    deleteBtn.className='delete';
    editBtn.className='edit';
    editBtn.setAttribute('description', describe);
    deleteBtn.appendChild(document.createTextNode('Delete Expense'));
    editBtn.appendChild(document.createTextNode('Edit Expense'));
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    itemList.appendChild(li);
}


function removeExpense(e){
    if (e.target.classList.contains('delete')){
        var li=e.target.parentElement;
        itemList.removeChild(li)
        console.log(e.target)
        let describe = li.querySelector('.edit').getAttribute('description');
        localStorage.removeItem(describe)
}
}

function editExpense(e){
    if(e.target.classList.contains('edit')){
        var li=e.target.parentElement;
        let describe=li.querySelector('.edit').getAttribute('description');
        let itemData=JSON.parse(localStorage.getItem(describe));
        document.getElementById('floatingInputValue').value=itemData.Description;
        document.getElementById('choose').value=itemData.Category;
        document.getElementById('amount').value=itemData.Amount;
        itemList.removeChild(li);
        localStorage.removeItem(describe);
    }
    
}