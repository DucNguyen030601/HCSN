class Employee {
    id;
    name;
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }
    onLoadData() {
        const table = document.querySelector('.content .table-section table');
        const ths = table.querySelectorAll('thead tr th');
        const tBody = table.querySelector('tBody');
        fetch('https://apidemo.laptrinhweb.edu.vn/api/v1/Employees')
            .then(res => res.json())
            .then(data => {
                for (const key in data) {
                    console.log(data[key]['EmployeeCode']);
                    console.log(key);
                }
                //Get all data from api and then use for
                data.forEach(element => {
                    //create each row of table
                    let tr = document.createElement('tr');
                    ths.forEach(item => {
                        //create each cell corresponding to the titel
                        let model = item.getAttribute('name');
                        let td = document.createElement('td');
                        if (model == "checkbox") {
                            let checkbox = document.createElement('input');
                            checkbox.setAttribute('type', 'checkbox');
                            td.append(checkbox);
                        }
                        else {
                            td.textContent = element[model];
                        }
                        tr.append(td);
                    });
                    tBody.append(tr)
                });
            });
    }

}
export default Employee