function EmployeeManager(){
    this.employee_list = [];
    this.addEmployee = function(employee){
        this.employee_list.push(employee);
    }
}