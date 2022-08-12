"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[335],{3306:function(e,t,s){s.d(t,{c:function(){return i}});const a=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?e.replace(".png",""):e.replace(".png","").concat("_")},i=e=>e.reduce(((e,t,s,i)=>s!==i.length-1?e.concat(a(t)):e.concat(a(t,!0))),"")},5495:function(e,t,s){s.d(t,{Z:function(){return d}});var a=s(6750),i=s(8846),r=s(7678),o=s(5352),n=(0,r.Z)(i.Z).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio(){return Number(this.aspectRatio)},aspectStyle(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},(0,o.z9)(this))}},render(e){return e("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),l=n,c=s(6669),g=s(1767),h=s(4101);const m="undefined"!==typeof window&&"IntersectionObserver"in window;var d=(0,r.Z)(l,c.Z).extend({name:"v-img",directives:{intersect:a.Z},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return this.src&&"object"===typeof this.src?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];const e=[],t=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&e.push(`linear-gradient(${this.gradient})`),t&&e.push(`url("${t}")`);const s=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:e.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[s]):s}},watch:{src(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(e,t,s){if(!m||s||this.eager){if(this.normalisedSrc.lazySrc){const e=new Image;e.src=this.normalisedSrc.lazySrc,this.pollForSize(e,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError(){this.hasError=!0,this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const e=new Image;this.image=e,e.onload=()=>{e.decode?e.decode().catch((e=>{(0,h.Kd)(`Failed to decode image, trying to render anyway\n\nsrc: ${this.normalisedSrc.src}`+(e.message?`\nOriginal error: ${e.message}`:""),this)})).then(this.onLoad):this.onLoad()},e.onerror=this.onError,this.hasError=!1,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),e.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;const s=()=>{const{naturalHeight:a,naturalWidth:i}=e;a||i?(this.naturalWidth=i,this.calculatedAspectRatio=i/a):e.complete||!this.isLoading||this.hasError||null==t||setTimeout(s,t)};s()},genContent(){const e=l.options.methods.genContent.call(this);return this.naturalWidth&&this._b(e.data,"div",{style:{width:`${this.naturalWidth}px`}}),e},__genPlaceholder(){const e=(0,o.z9)(this,"placeholder");if(e){const t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},e)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render(e){const t=l.options.render.call(this,e),s=(0,g.ZP)(t.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:m?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return t.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],e(t.tag,s,t.children)}})},5335:function(e,t,s){s.r(t),s.d(t,{default:function(){return L}});var a=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ga__login_face_recogn_view"},[t("v-row",{staticClass:"ga__login_face_recogn_view__title_row"},[t("v-btn",{attrs:{outlined:"",color:"indigo darken-2"},on:{click:e.handleBackBtnClick}},[e._v(" Go Back To Choose IPASS "),t("fa-icon",{staticClass:"ml-2",attrs:{icon:"fa-solid fa-arrow-rotate-left",color:"#303F9F",size:"lg"}})],1)],1),t("v-row",{staticClass:"ga__login_face_recogn_view__title",attrs:{"align-content":"center",justify:"center"}},[t("v-col",{attrs:{cols:12}},[t("div",{staticClass:"text-overline white--text text--darken-1 ga__login_face_recogn_view__title__text"},[e._v(" Login ")])])],1),t("v-row",{staticClass:"ga__login_face_recogn_view__content"},[t("v-col",{attrs:{cols:12,lg:6}},[t("v-form",{ref:e.loginFormRef,model:{value:e.validLoginForm,callback:function(t){e.validLoginForm=t},expression:"validLoginForm"}},[t("v-row",{staticClass:"ga__login_face_recogn_view__form_row",attrs:{justify:"center"}},[t("v-col",{staticClass:"ga__login_face_recogn_view__form_col",attrs:{cols:8}},[t("v-text-field",{staticClass:"ga__login_face_recogn_view__form_field",attrs:{rules:e.userNameRules,disabled:e.hasOwnImages,counter:10,color:"indigo",label:"user name",required:"",filled:"",dark:""},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1)],1),e.hasAnsweredOwnImages?e._e():t("v-row",{attrs:{justify:"center"}},[t("div",{staticClass:"grey--text text--darken-1 mb-2 ga__login_face_recogn_view__own_images"},[t("fa-icon",{staticClass:"fa-beat-fade mr-2",attrs:{icon:"fa-solid fa-id-badge",size:"2x"}}),t("span",{staticClass:"text-overline font-weight-light indigo--text text--darken-5 ga__login_face_recogn_view__qualifier"},[e._v(" Do you have your own images PASS? ")]),t("v-btn",{staticClass:"white--text mr-4 ml-2",attrs:{outlined:"","x-small":"",color:"red lighten-2"},on:{click:e.handleDoesNotHaveOwnImages}},[e._v(" no ")]),t("v-btn",{staticClass:"white--text",attrs:{outlined:"","x-small":"",color:"green lighten-2"},on:{click:e.handleHasOwnImages}},[e._v(" yes ")])],1)]),t("v-row",{staticClass:"ga__login_face_recogn_view__form_row",attrs:{justify:"center"}},[t("v-col",{staticClass:"ga__login_face_recogn_view__form_col",attrs:{cols:8}},[t("v-select",{attrs:{items:e.imageCategoriesItems,value:e.imageCategoriesItems[0],disabled:e.hasOwnImages,label:"face images category",color:"indigo","item-color":"indigo",hint:"Select the face images category in order to build up your pass","persistent-hint":"",required:"",filled:"",dark:""},on:{change:e.handleImageCategoryChange}})],1)],1),t("v-row",{class:[{hidden:e.logoVisible}]},[t("v-col",{staticClass:"ga__login_face_recogn_view__images_title",attrs:{cols:12}},[e.passIsComplete?e._e():t("div",{staticClass:"grey--text text--darken-1"},[e._v(" Choose faces for your "),t("span",{staticClass:"text-overline font-weight-light white--text ga__login_face_recogn_view__images_title__pass"},[e._v("IPASS")])]),e.passIsComplete?t("div",{staticClass:"grey--text text--darken-1"},[e._v(" Your "),t("span",{staticClass:"text-overline font-weight-light white--text ga__login_face_recogn_view__images_title__pass"},[e._v("IPASS")]),e._v(" is complete! ")]):e._e(),e.passIsComplete?t("div",{staticClass:"grey--text text--darken-1 mt-4"},[t("fa-icon",{staticClass:"fa-beat-fade mr-4",attrs:{icon:"fa-solid fa-shield-halved",color:e.imagePassStrengthInterval.color,size:"3x",pulsate:""}}),t("span",{class:`text-overline font-weight-light ${e.imagePassStrengthInterval.vColor}--text text--${e.imagePassStrengthInterval.vOpacity} ga__login_face_recogn_view__qualifier`},[e._v(" "+e._s(e.imagePassStrengthInterval.qualifying)+" ")])],1):e._e()])],1),t("v-row",{class:["ga__login_face_recogn_view__images_row",{hidden:e.logoVisible}]},e._l(e.imagePasses,(function(s,a){return t("v-col",{key:a,staticClass:"ga__login_face_recogn_view__image__content",attrs:{cols:2}},[s?t("v-avatar",{attrs:{size:e.getSelectableImagesSize,rounded:"lg"}},[t("v-img",{attrs:{src:e.getUrlByCurrentCategory(s)}})],1):e._e()],1)})),1)],1)],1),t("v-col",{staticClass:"ga__login_face_recogn_view__images",attrs:{cols:12,lg:6}},[e.passIsComplete?t("v-row",{staticClass:"ga__login_face_recogn_view__controls",attrs:{justify:"center"}},[e.onLargerViewPort?t("div",{staticClass:"text-overline font-weight-light white--text break"},[e._v(" What next ? ")]):e._e(),t("v-btn",{ref:"loginFormBtn",staticClass:"mr-sm-4 mb-xs-4",attrs:{outlined:"",color:"indigo darken-2"},on:{click:e.handleLoginBtnClick}},[e._v(" Login ")]),t("div",{staticClass:"ga__login_face_recogn_view__controls__separator"},[e._v("/")]),t("v-btn",{staticClass:"ml-sm-4",attrs:{outlined:"",color:"indigo darken-2"},on:{click:e.handleClearBtnClick}},[e._v(" Clear PASS ")])],1):t("v-row",{staticClass:"ga__login_face_recogn_view__images__row"},e._l(e.currentImages,(function(s,a){return t("v-col",{key:a,attrs:{cols:3,"align-self":"center"}},[t("div",{staticClass:"ga__login_face_recogn_view__image_wrapper"},[t("v-avatar",{attrs:{size:e.getSelectableImagesSize,rounded:"lg"},on:{click:function(t){"my own people"===e.currentCategory?e.handleImageClick(s):e.handleImageClick(s.filename)}}},[t("v-img",{attrs:{src:"my own people"===e.currentCategory?e.getUrlByCurrentCategory(s):e.getUrlByCurrentCategory(s.filename)}})],1)],1)])})),1)],1)],1),t("div",{class:["ga__login_face_recogn_view__logo_container",{hidden:!e.logoIsVisible}]},[t("div",{staticClass:"ga__login_face_recogn_view__logo"})]),t("v-snackbar",{scopedSlots:e._u([{key:"action",fn:function(s){let{attrs:a}=s;return[t("v-btn",e._b({attrs:{color:"red darken-3",text:"",timeout:5e3},on:{click:function(t){e.loginErrorShows=!1}}},"v-btn",a,!1),[e._v(" Close ")])]}}]),model:{value:e.loginErrorShows,callback:function(t){e.loginErrorShows=t},expression:"loginErrorShows"}},[e._v(" "+e._s(e.loginErrorMsg)+" ")]),t("v-overlay",{attrs:{value:e.loginInProgressOverlay,opacity:.95}},[t("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1)],1)},i=[],r=s(144),o=s(629),n=s(3971),l=s(546),c=s(3306),g=s(7417),h=r.ZP.extend({name:"GALoginFaceRecognView",data(){return{validLoginForm:!1,loginFormRef:"loginFormRef",userName:"",userNameRules:[e=>!!e||"username is required",e=>e.length<=10||"username must be less than 10 characters"],imageCategoriesItems:[],logoVisible:!0,imagePassCount:n.Ov,currentImages:[],currentCategory:"",imagePasses:[],imageItems:[],imagePassLastCompletedIndex:0,passAfterTransformation:"",imagePassStrengthInterval:null,hasOwnImages:!1,hasAnsweredOwnImages:!1,ownImagesFetched:!1,loginErrorShows:!1,loginErrorMsg:"Invalid username!",loginInProgressOverlay:!1}},async created(){this.setUpDefaultImagesPass(),await this.setUpImagesCategories()},methods:{...(0,o.nv)("images",["fetchFaceImagesCategories","fetchImagesByCategory","fetchUserUploadedImages"]),...(0,o.nv)("authentication",["fetchLogin"]),async handleBackBtnClick(){await this.$router.push({name:n.k4})},async setUpImagesCategories(){this.fetchFaceImagesCategories().then((async e=>{e&&(this.imageCategoriesItems=this.imagesCategories.map((e=>e.label)),await this.fetchImagesByCategory("people"),this.currentCategory="people",this.currentImages=this.peopleFacesImages)}))},setUpDefaultImagesPass(){for(let e=0;e<this.imagePassCount;e++)this.imagePasses.push("")},async handleImageCategoryChange(e){this.logoVisible&&(this.logoVisible=!1),"my own people"!==e&&await this.fetchImagesByCategory(e),this.currentCategory=e,this.setCurrentImages(e)},handleImageClick(e){this.logoVisible&&(this.logoVisible=!1),this.imagePassLastCompletedIndex<this.imagePassCount-1?(this.imagePasses={...this.imagePasses,[this.imagePassLastCompletedIndex]:e},this.imagePassLastCompletedIndex++):(this.imagePasses={...this.imagePasses,[this.imagePassLastCompletedIndex]:e},this.imagePassLastCompletedIndex++,this.passAfterTransformation=(0,c.c)(Object.assign([],this.imagePasses)),this.imagePassStrengthInterval=(0,g._)(this.passAfterTransformation))},handleClearBtnClick(){this.userName="",this.imagePasses=[],this.imagePassLastCompletedIndex=0,this.setUpDefaultImagesPass()},async submitLogin(){const e={userName:this.userName,password:this.passAfterTransformation};try{let t=await this.fetchLogin(e);t&&setTimeout((()=>{this.$router.push({name:n.u6}),this.loginInProgressOverlay=!1}),2e3)}catch(t){setTimeout((()=>{this.loginErrorShows=!0,this.loginErrorMsg=l.mH,this.loginInProgressOverlay=!1}),1e3)}},handleLoginBtnClick(){const e=this.$refs.loginFormRef.validate();e?(this.loginInProgressOverlay=!0,this.submitLogin()):(this.loginErrorShows=!0,this.loginErrorMsg=l.$h,this.$refs.loginFormRef.reset())},async handleHasOwnImages(){if(!this.userName)return this.loginErrorShows=!0,void(this.loginErrorMsg=l.iJ);this.hasAnsweredOwnImages=!this.hasAnsweredOwnImages,this.hasOwnImages=!this.hasOwnImages;try{let e=await this.fetchUserUploadedImages(this.userName);e&&(this.ownImagesFetched=!0,this.imageCategoriesItems=["my own people",...this.imageCategoriesItems],this.currentCategory="my own people",this.currentImages=this.userUploadedImages)}catch(e){this.loginErrorShows=!0,this.loginErrorMsg=l.Jh}},handleDoesNotHaveOwnImages(){this.hasAnsweredOwnImages=!this.hasAnsweredOwnImages,this.hasOwnImages=!this.hasOwnImages},setCurrentImages(e){switch(e){case n.bR:this.currentImages=this.userUploadedImages;break;case n.IX:this.currentImages=this.peopleFacesImages;break}},getUrlByCurrentCategory(e){let t="";switch(this.currentCategory){case n.bR:t="uploaded_actual_image";break;case n.IX:t="people_faces_actual_image";break}return`http://localhost:8080/ga/api/images/${t}/${e}`}},computed:{...(0,o.Se)("images",["imagesCategories","peopleFacesImages","uploadedImages","userUploadedImages"]),onLargerViewPort(){return"lg"===this.$vuetify.breakpoint.name||"xl"===this.$vuetify.breakpoint.name},logoIsVisible(){return this.logoVisible&&this.onLargerViewPort},passIsComplete(){return this.imagePassLastCompletedIndex===this.imagePassCount},getSelectableImagesSize(){return this.onLargerViewPort?"100":"58"}}}),m=h,d=s(1001),_=s(3453),u=s.n(_),v=s(3423),p=s(4562),f=s(266),w=s(5125),C=s(5495),I=s(2933),y=s(3305),S=s(1713),b=s(4859),k=s(9258),x=s(7808),P=(0,d.Z)(m,a,i,!1,null,"5fcc1b6d",null),L=P.exports;u()(P,{VAvatar:v.Z,VBtn:p.Z,VCol:f.Z,VForm:w.Z,VImg:C.Z,VOverlay:I.Z,VProgressCircular:y.Z,VRow:S.Z,VSelect:b.Z,VSnackbar:k.Z,VTextField:x.Z})}}]);
//# sourceMappingURL=335.aa69a42f.js.map