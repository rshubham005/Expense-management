
    // get the heading element
    const headingEl = document.querySelector("#headingTotal");

    // get the refrence to description
    const inputDescEl = document.querySelector("#inputDesc");

    // ref to input amount

    const inputElement = document.querySelector("#Input");


    // get the ref to table
    const expenseTableEl = document.querySelector("#expenseTable");


    //init value of expenses to zero
    let totalExpense = 0;

    //Set the heading element to total expense
    headingEl.textContent = totalExpense;
    // on button click add expense to total

    // all expenses at one place

    const allExpenses = [];

    function addExpenseToTotal() {
        const expenseItem = {};

        //read value from input
        const textAmount = inputElement.value;

        // read description from input
        const textDesc = inputDescEl.value;

        //convert it to number
        const expense = parseInt(textAmount, 10);

        //put it in an object
        expenseItem.desc = textDesc;
        expenseItem.amount = expense;
        expenseItem.moment = new Date();

        allExpenses.push(expenseItem);


        //add that value to total expense
        totalExpense = totalExpense + expense;

        //heading element to total expense
        const someText = `Total : ${totalExpense}`;
        headingEl.textContent = someText;

        // show the table
        renderList(allExpenses);
    }
    //get the button element

    const element = document.querySelector("#addExpense");



    //listen to click event
    element.addEventListener("click", addExpenseToTotal, false);
    // controller functions

    //get date string
    function getDateString(momento) {
        return momento.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    // Delte Items
    function deleteItem(dateValue) {
        // const newArr=[];
        // for(let i=0;i<allExpenses.length;i++)
        // {

        //     if(allExpenses[i].moment.valueOf() !== dateValue)
        //     {
        //         newArr.push(allExpenses[i])
        //     }
        // }

        const newArr = allExpenses.filter(expense => expense.moment.valueOf() !== dateValue)

        renderList(newArr);
        const t = allExpenses.length;
        for (let i = 0; i < t; i++) {
            allExpenses.pop();
        }
        for (let i = 0; i < newArr.length; i++) {
            allExpenses.push(newArr[i]);
        }
    }

    //view layer
    function renderList(arrOfList) {
        const allExpenseHTML = arrOfList.map(expense => creatListItem(expense));
        const joinedAllExpenseHTML = allExpenseHTML.join('');
        expenseTableEl.innerHTML = joinedAllExpenseHTML;
    }

    function creatListItem({ desc, amount, moment }) {
        return `
            <li class="list-group-item d-flex justify-content-between">
            <div class="d-flex flex-column">
                ${desc}
                <small class="text-muted">${getDateString(moment)}</small>
            </div>
            <div>
                <span class="px-5">
                    ${amount}
                </span>
                <button 
                type="button" class="btn btn-outline-danger btn-sm"
                onclick="deleteItem(${moment.valueOf()})"
                >
                    <i class="fa fa-trash"></i>
                </button>
            </div>
            </li>
            `
    }
