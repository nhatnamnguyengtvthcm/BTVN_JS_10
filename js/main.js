
function getEleId(id){
    return document.getElementById(id);
};
var employeeManager = new EmployeeManager();
getLocalStograge();

var bankAccountdeleted = "";

// function ValidateInfomation(){

// }

function getEmployeeInfo(){
    var alert = getEleId("alert-validated");
    var alertContent = getEleId("alert-content");
    var bankAccount = getEleId("tknv").value * 1;
    if(bankAccount< 1000 || bankAccount >= 999999){
      
        alertContent.innerHTML = "bankAccount must be greater than 4 number and less than 6 number";
        alert.style.display = "block";
        return;
    }
    var fullName = getEleId("name").value;
    if(typeof(fullName) != "string"){
        alertContent.innerHTML = "FullName must be string";
        alert.style.display = "block";
        return
    }
    const passWordRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,10}$/g;
    
    var passWord = getEleId("password").value;
    isPassWordMatch = passWord.match(passWordRegex);
    if (isPassWordMatch == null) {
        alertContent.innerHTML = "PassWord must be include Digit, Upercase, special character";
        alert.style.display = "block";
        return
    }
    var email = getEleId("email").value;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(emailRegex) == null){
        alertContent.innerHTML = "Email is invalid";
        alert.style.display = "block";
        return;
    }
    var workDate = getEleId("datepicker").value;

    var baseSalary = getEleId("luongCB").value * 1;
    if(baseSalary < 9000000 || baseSalary > 20000000){
        alertContent.innerHTML = "Base Salary in rang 9 milion -> 20 milon";
        alert.style.display = "block";
        return; 
    }
    var position = getEleId("chucvu").value;
    if (chucvu == ""){
        alertContent.innerHTML = "Position in : Director - Manager - Employee";
        alert.style.display = "block";
        return; 
    }

    var workTime = getEleId("gioLam").value * 1;
    if (workTime< 80 || workTime > 200){
        alertContent.innerHTML = "Base Salary in range 80 -> 20 hours";
        alert.style.display = "block";
        return; 
    }
    var employee = new Employee(bankAccount, fullName, email, passWord, workDate, baseSalary, position, workTime);
    return employee;

};


function CreateEmployeeList()
{
    getEleId("tableDanhSach").innerHTML = "";
    // var employees = employeeManager.employee_list;
    // console.log(employees);
    var content = "";
    var employees = employeeManager.employee_list;
    if(employees){
        for(var i =0; i < employees.length; i ++) {
            // console.log(i);
           
            // console.log(typeof(employeeManager));
            employees[i].calTotalSalary;
            // employees.totalSalary = 100;
            // console.log(employee.totalSalary);
            // var salary = employees.calTotalSalary(employees.totalSalary);
            // console.log(salary);
            //  console.log(employeeManager.employee_list[i].totalSalary);
            employees[i].ratingStudent;
            content += `
                <tr>
                    <td> ${employees[i].bankAccount} </td>
                    <td> ${employees[i].fullName} </td>
                    <td> ${employees[i].email} </td>
                    <td> ${employees[i].workDate} </td>
                    <td> ${employees[i].position} </td>
                    <td> ${employees[i].totalSalary} </td>
                    <td> ${employees[i].rate} </td>
                    <td colspan="1"><button  type="button" class="btn btn-danger" onclick="deleteEmployee(${employeeManager.employee_list[i].bankAccount}) data-toggle="modal"
                    data-target="#myModal">Delete</button></td>
                </tr>
            
            `;
        }  
    };
   
    getEleId("tableDanhSach").innerHTML = content;
}




getEleId("btnThemNV").addEventListener("click", function(){
    var employee = getEmployeeInfo();
    if (employee){
        employeeManager.addEmployee(employee);
        CreateEmployeeList();
        setLocalStograge();
    }
   
})

function setLocalStograge(){
    var employees = employeeManager.employee_list;
    var employees_str = JSON.stringify(employees);
    localStorage.setItem("employees", employees_str);
}

function getLocalStograge(){
    var employees = localStorage.getItem("employees");
    var employees_json = JSON.parse(employees);
    // console.log(employees );
   
    if(employees_json){
        employeeManager.employee_list = employees_json;
        // console.log("nmss");
        CreateEmployeeList();
    }
   
    
}

function deleteEmployee(bankAccount){
    bankAccountdeleted = bankAccount;
}