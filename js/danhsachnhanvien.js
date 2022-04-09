function EmployeeManager(){
    this.employee_list = [];
    this.addEmployee = function(employee){
        this.employee_list.push(employee);
    }
    this.findEmployee = function(keyWord){
        var new_arr = [];
        for (let index = 0; index < this.employee_list.length; index++) {
            if(this.employee_list[index].rate.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1){
                new_arr.push(this.employee_list[index]);
            }
            
        }
        return new_arr;
    }
}

