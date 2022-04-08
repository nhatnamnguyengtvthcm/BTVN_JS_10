
function Employee(bankAccount, fullName, email, passWord, workDate, baseSalary, position, workTime ){
    this.bankAccount = bankAccount;
    this.fullName = fullName;
    this.email = email;
    this.passWord = passWord;
    this.workDate = workDate;
    this.baseSalary = baseSalary;
    this.position = position;
    this.workTime = workTime;
    this.totalSalary = 0;
    this.rate = "";
    this.calTotalSalary = function(){
        console.log("vl");
        var total = 0;
        if (this.position == "Director"){
            // console.log("here");
            this.totalSalary  = this.baseSalary * 3;
        }
        else if (this.position == "Manager") {
            this.totalSalary = this.baseSalary * 2;
        }
        else{
            this.totalSalary  = this.baseSalary;
        }
    };
    this.ratingStudent = function(){
        if(this.workTime >=192){
            this.rate = "exellent";
        }
        else if(this.workTime < 192 && this.workTime >=176){
            this.rate = "VerryGood";
        }
        else if(this.workTime < 176 && this.workTime >= 160){
            this.rate = "Good";
        }
        else{
            this.rate = "Average";
        }
    };
}

