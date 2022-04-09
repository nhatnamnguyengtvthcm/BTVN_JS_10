
function getEleId(id){
    return document.getElementById(id);
};
var employeeManager = new EmployeeManager();
getLocalStograge();
var bankAccountdeleted = "";
var bankAccount = "";
var passWord = "";
var email = "";
var workDate = "";
var baseSalary = "";
var position = "";
var workTime = "";
var fullName = "";
var employeeIndex = "";
// function ValidateInfomation(){

// }

function validateEmplyeeInfo(){
    var alert = getEleId("alert-validated");
    var alertContent = getEleId("alert-content");
    flag = true;
    if(bankAccount< 1000 || bankAccount >= 999999){
      
        alertContent.innerHTML = "bankAccount must be greater than 4 number and less than 6 number";
        alert.style.display = "block";
        flag = false;
    }
   
    if(typeof(fullName) != "string"){
        console.log(typeof(fullName));
        alertContent.innerHTML = "FullName must be string";
        alert.style.display = "block";
        flag = false;
    }
    const passWordRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,10}$/g;
    
    isPassWordMatch = passWord.match(passWordRegex);
    if (isPassWordMatch == null) {
        alertContent.innerHTML = "PassWord must be include Digit, Upercase, special character";
        alert.style.display = "block";
        flag = false;
    }
  
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(emailRegex) == null){
        alertContent.innerHTML = "Email is invalid";
        alert.style.display = "block";
        flag = false;
    }

    if(baseSalary < 9000000 || baseSalary > 20000000){
        alertContent.innerHTML = "Base Salary in rang 9 milion -> 20 milon";
        alert.style.display = "block";
        flag = false;
    }
 
    if (chucvu == ""){
        alertContent.innerHTML = "Position in : Director - Manager - Employee";
        alert.style.display = "block";
        flag = false;; 
    }

    if (workTime< 80 || workTime > 200){
        alertContent.innerHTML = "Base Salary in range 80 -> 20 hours";
        alert.style.display = "block";
        flag = false;
    }
    
    return flag;
};

function getEmployeeInfo(){
    bankAccount = getEleId("tknv").value * 1;
    passWord = getEleId("password").value;
    email = getEleId("email").value;
    workDate = getEleId("datepicker").value;
    baseSalary = getEleId("luongCB").value * 1;
    position = getEleId("chucvu").value;
    workTime = getEleId("gioLam").value * 1;
    fullName = getEleId("name").value;
}

function createEmployee(){
    getEmployeeInfo();
    validateEmplyeeInfo();
    var is_valid = validateEmplyeeInfo();
    if (is_valid == false){
        return;
    } 

    var employee = new Employee(bankAccount, fullName, email, passWord, workDate, baseSalary, position, workTime);
    employee.calTotalSalary();
    employee.ratingStudent();
    return employee;
}


function CreateEmployeeList()
{
    getEleId("tableDanhSach").innerHTML = "";
    // var employees = employeeManager.employee_list;
    // console.log(employees);
    var content = "";
    var employees = employeeManager.employee_list;
    if(employees){
        for(var i =0; i < employees.length; i ++) {
            content += `
                <tr>
                    <td> ${employees[i].bankAccount} </td>
                    <td> ${employees[i].fullName} </td>
                    <td colspan="1"> ${employees[i].email} </td>
                    <td> ${employees[i].workDate} </td>
                    <td> ${employees[i].position} </td>
                    <td> ${employees[i].totalSalary} </td>
                    <td> ${employees[i].rate} </td>
                    <td ><button type="button" class="btn btn-danger" data-toggle="modal"
                    data-target="#deleteModalId" onclick="deleteEmployee(${employees[i].bankAccount})">Delete</button></td>
                    <td ><button type="button" class="btn btn-danger" data-toggle="modal"
                    data-target="#myModal" onclick="loadInfoEmployee(${i})">Update</button></td>
                </tr>
            
            `;
        }  
    };
   
    getEleId("tableDanhSach").innerHTML = content;
}




getEleId("btnThemNV").addEventListener("click", function(){
    var employee = createEmployee();
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
    console.log("jj");
    bankAccountdeleted = bankAccount;
    console.log(bankAccountdeleted);
}

// getEleId("confirmDeleteId").addEventListener("click", function(){
//     var employees = employeeManager.employee_list;
//     for(var i = 0; i<employees.length;i++){
//         if(employees.bankAccount == bankAccountdeleted){
//             employees.splice(i,1);
//         }
//     }
// })

function confirmDeleteEmp(){
    for(var i = 0; i<employeeManager.employee_list.length;i++){
        console.log(employeeManager.employee_list[i].bankAccount);
        if(employeeManager.employee_list[i].bankAccount == bankAccountdeleted){
            employeeManager.employee_list.splice(i,1);
        }
        setLocalStograge();
        getLocalStograge();
    }
}

function loadInfoEmployee(index){
    employeeIndex =  index;
    getEleId("tknv").value = employeeManager.employee_list[index].bankAccount;
    getEleId("name").value = employeeManager.employee_list[index].fullName;
    getEleId("password").value = employeeManager.employee_list[index].passWord;
    getEleId("email").value =employeeManager.employee_list[index].email;
    getEleId("datepicker").value = employeeManager.employee_list[index].workDate;
    getEleId("gioLam").value = employeeManager.employee_list[index].workTime;
    getEleId("luongCB").value = employeeManager.employee_list[index].baseSalary;
    getEleId("chucvu").value = employeeManager.employee_list[index].position;
    
}


getEleId("btnCapNhat").addEventListener("click", function(){
    getEmployeeInfo();
    validateEmplyeeInfo();
    var employee = createEmployee();
    employee.calTotalSalary();
    employee.ratingStudent();
    employeeManager.employee_list[employeeIndex] = employee;
    setLocalStograge();
    getLocalStograge();
});