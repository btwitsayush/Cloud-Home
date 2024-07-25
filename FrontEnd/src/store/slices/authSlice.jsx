import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState:{                        //This is default value of state
        isAuthorized:localStorage.getItem("userInfo")?true:false,
        email:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user.email : null,
        name:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user.name : null,
        userId:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user._id : null,
        token:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")).token :null,
        isEmailVerifed:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")).user.isEmailVerifed :null,
    },
    reducers:{

        appLogIn:(state,action)=>{
            const {payload}=action;
            const{data}=payload
            const{token,user}=data;
            state.isAuthorized=true;   //updating state value


            state.email=user.email;
            state.name=user.name;
            state.token=token;
            state.userId=user._id;
            state.isEmailVerifed=user.isEmailVerifed;
            localStorage.setItem("userInfo",JSON.stringify(data));
            

        },
        appLogOut:(state)=>{
            state.isAuthorized=false    //updating state value

            state.email=null;
            state.name=null;
            state.token=null;
            state.isEmailVerifed=false;
            localStorage.removeItem("userInfo");
            
        },
        emailVerified:(state)=>{
            state.isEmailVerifed=true,
            localStorage.setItem("userInfo",JSON.stringify({
                user:{
                email:state.email,
                name:state.name,
                isEmailVerifed:state.isEmailVerifed,
                _id:state.userId,
                },
                token:state.token
            }))
        }
        
    }

});

export const {appLogIn,appLogOut,emailVerified}=authSlice.actions;

export default authSlice.reducer;  
//this is authReducer we can give any name to it(Kind of sub-shop inside mall) Now we will use it in appStore(mall). Just b/c it is a default export we are not giving any type of name to it 