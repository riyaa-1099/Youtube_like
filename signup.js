import navbar from './components/navbar.js';

 let navbarDiv=document.getElementById("navbar1")
 navbarDiv.innerHTML = navbar();

 document.getElementById("regbtn").addEventListener("click",function(){
Register();
 })

 document.getElementById("logbtn").addEventListener("click",function(){
Logiin();
})
let p=localStorage.getItem("name_show")
document.getElementById("name_show").innerHTML="Hii "+p;


class User{

constructor(){
}

validateUsername(username){
return username.includes('@') ?false:true;
}
validatePassword(password){
return password.length < 8 ? false:true;
}

async signUP(n,e,u,p,m,d){

    let isValidated=this.validateUsername(u)&& this.validatePassword(p);
if(isValidated){
    this.name=n;
    this.email=e;
    this.username=u;
    this.password=p;
    this.mobile=m;
    this.description=d;

    let register_api = "https://masai-api-mocker.herokuapp.com/auth/register"

const response = await fetch(register_api,{
method: 'POST',
body: JSON.stringify(this),
headers: {
    'Content-Type':'application/json',
},
});
const data=await response.json();
console.log('data1:',data);
}
}

async Login(u,p){
    const login_data={
        username:u,
        password:p,
    };
    let login_api = `https://masai-api-mocker.herokuapp.com/auth/login`;
const response=await fetch(login_api,{
method:'POST',
body:JSON.stringify(login_data),
headers:{
'Content-Type':'application/json',
},
});
const data = await response.json();
console.log('data2:',data);
getProfile(u,data.token)
}
}



let user= new User();
const Register=()=>{
    const reg_form =document.getElementById('reg_form');

    const name = reg_form.name.value;
    const email = reg_form.email.value;
    const username  = reg_form.username.value;
    const password = reg_form.password.value;
    const mobile = reg_form.mobile.value;
    const description  = reg_form.description.value;

    user.signUP(name,email,username, password, mobile, description);
console.log('user3:',user);
};

const Logiin = async () => {
const username=document.getElementById('login-username').value;
const password=document.getElementById('login-password').value;

let data= await user.Login(username, password);
 //actual_data=await reson;
//console.log("data5",actual_data)
//getProfile(username,token)
};

const getProfile = async(username,token)=>{

    let api_link=`https://masai-api-mocker.herokuapp.com/user/${username}`
    let response =await fetch(api_link,{
    headers:{
    Authorization: `Bearer ${token}`,
    'Content-Type':'application/json',
    },
    
    });
    
    let data=await response.json();
    console.log('data4:',data);
    localStorage.setItem("name_show",data.name)
    }