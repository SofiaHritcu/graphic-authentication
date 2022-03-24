"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[830],{247:function(e,t,r){r.d(t,{Z:function(){return n}});r(7273);var s=r(144);function a(e){return s.Z.extend({name:`v-${e}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(t,{props:r,data:s,children:a}){s.staticClass=`${e} ${s.staticClass||""}`.trim();const{attrs:l}=s;if(l){s.attrs={};const e=Object.keys(l).filter((e=>{if("slot"===e)return!1;const t=l[e];return e.startsWith("data-")?(s.attrs[e]=t,!1):t||"string"===typeof t}));e.length&&(s.staticClass+=` ${e.join(" ")}`)}return r.id&&(s.domProps=s.domProps||{},s.domProps.id=r.id),t(r.tag,s,a)}})}var l=r(6290),n=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(e,{props:t,data:r,children:s}){let a;const{attrs:n}=r;return n&&(r.attrs={},a=Object.keys(n).filter((e=>{if("slot"===e)return!1;const t=n[e];return e.startsWith("data-")?(r.attrs[e]=t,!1):t||"string"===typeof t}))),t.id&&(r.domProps=r.domProps||{},r.domProps.id=t.id),e(t.tag,(0,l.ZP)(r,{staticClass:"container",class:Array({"container--fluid":t.fluid}).concat(a||[])}),s)}})},9830:function(e,t,r){r.r(t),r.d(t,{default:function(){return g}});var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-form",{ref:"gaRegisterForm",on:{submit:function(t){return t.preventDefault(),e.submitLogin.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:e.userNameRules,counter:10,label:"Username",required:""},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:e.userNameRules,counter:10,label:"Name",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:e.emailRules,label:"E-mail",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:e.passwordRules,label:"Password",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:e.passwordRules,label:"Confirm Password",required:""},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}})],1)],1)],1),r("v-row",{attrs:{"align-content":"center",justify:"center"}},[r("v-btn",{staticClass:"mr-4 ml-15",attrs:{color:"success",type:"submit",disabled:!e.valid}},[e._v(" Login ")])],1),r("v-row",{attrs:{"align-content":"center",justify:"center"}},[r("v-btn",{staticClass:"mt-3 mb-3",attrs:{outlined:"",color:"teal lighten-2","x-large":""}},[r("router-link",{attrs:{to:"/ga/login"}},[e._v("Already have an account?")])],1)],1)],1)],1)},a=[],l={name:"GASignupView",data(){return{valid:!0,userName:"",name:"",userNameRules:[e=>!!e||"Name is required",e=>e.length<=10||"Name must be less than 10 characters"],password:"",confirmPassword:"",passwordRules:[e=>!!e||"Password is required"],email:"",emailRules:[e=>!!e||"E-mail is required",e=>/.+@.+/.test(e)||"E-mail must be valid"]}},methods:{}},n=l,i=r(1001),o=r(3453),u=r.n(o),c=r(680),d=r(2102),m=r(247),f=r(6232),v=r(2877),p=r(5978),b=(0,i.Z)(n,s,a,!1,null,"9186943c",null),g=b.exports;u()(b,{VBtn:c.Z,VCol:d.Z,VContainer:m.Z,VForm:f.Z,VRow:v.Z,VTextField:p.Z})}}]);
//# sourceMappingURL=830.5182c0ff.js.map