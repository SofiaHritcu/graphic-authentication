"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[830],{247:function(t,e,r){r.d(e,{Z:function(){return i}});r(7327),r(1539),r(7941),r(6755),r(2222),r(7273),r(3210),r(9600);var a=r(144);function n(t){return a.Z.extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,r){var a=r.props,n=r.data,s=r.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var i=n.attrs;if(i){n.attrs={};var l=Object.keys(i).filter((function(t){if("slot"===t)return!1;var e=i[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));l.length&&(n.staticClass+=" ".concat(l.join(" ")))}return a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),e(a.tag,n,s)}})}var s=r(6290),i=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var r,a=e.props,n=e.data,i=e.children,l=n.attrs;return l&&(n.attrs={},r=Object.keys(l).filter((function(t){if("slot"===t)return!1;var e=l[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),t(a.tag,(0,s.ZP)(n,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(r||[])}),i)}})},9830:function(t,e,r){r.r(e),r.d(e,{default:function(){return g}});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-form",{ref:"gaRegisterForm",on:{submit:function(e){return e.preventDefault(),t.submitLogin.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:t.userNameRules,counter:10,label:"Username",required:""},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:t.userNameRules,counter:10,label:"Name",required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:t.emailRules,label:"E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:t.passwordRules,label:"Password",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{rules:t.passwordRules,label:"Confirm Password",required:""},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}})],1)],1)],1),r("v-row",{attrs:{"align-content":"center",justify:"center"}},[r("v-btn",{staticClass:"mr-4 ml-15",attrs:{color:"success",type:"submit",disabled:!t.valid}},[t._v(" Login ")])],1),r("v-row",{attrs:{"align-content":"center",justify:"center"}},[r("v-btn",{staticClass:"mt-3 mb-3",attrs:{outlined:"",color:"teal lighten-2","x-large":""}},[r("router-link",{attrs:{to:"/ga/login"}},[t._v("Already have an account?")])],1)],1)],1)],1)},n=[],s=(r(4916),r(7601),{name:"GASignupView",data:function(){return{valid:!0,userName:"",name:"",userNameRules:[function(t){return!!t||"Name is required"},function(t){return t.length<=10||"Name must be less than 10 characters"}],password:"",confirmPassword:"",passwordRules:[function(t){return!!t||"Password is required"}],email:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+/.test(t)||"E-mail must be valid"}]}},methods:{}}),i=s,l=r(1001),o=r(3453),u=r.n(o),c=r(680),d=r(2102),m=r(247),f=r(6232),v=r(2877),p=r(5978),b=(0,l.Z)(i,a,n,!1,null,"9186943c",null),g=b.exports;u()(b,{VBtn:c.Z,VCol:d.Z,VContainer:m.Z,VForm:f.Z,VRow:v.Z,VTextField:p.Z})}}]);
//# sourceMappingURL=830-legacy.bb6f8d55.js.map