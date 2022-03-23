"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[876],{6370:function(t,e,s){s.d(e,{Z:function(){return l}});var i=s(6952),r=s(2529),a=s(3712),n=s(4589),o=s(3325),l=(0,o.Z)(i.Z,r.Z,a.Z).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes(){return{"v-avatar--left":this.left,"v-avatar--right":this.right,...this.roundedClasses}},styles(){return{height:(0,n.kb)(this.size),minWidth:(0,n.kb)(this.size),width:(0,n.kb)(this.size),...this.measurableStyles}}},render(t){const e={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),this.$slots.default)}})},5827:function(t,e,s){s.d(e,{Fx:function(){return h},Zq:function(){return u},Z5:function(){return c},Qn:function(){return d}});var i=s(6290);function r(t=[],...e){return Array().concat(t,...e)}function a(t,e="top center 0",s){return{name:t,functional:!0,props:{group:{type:Boolean,default:!1},hideOnLeave:{type:Boolean,default:!1},leaveAbsolute:{type:Boolean,default:!1},mode:{type:String,default:s},origin:{type:String,default:e}},render(e,s){const a="transition"+(s.props.group?"-group":""),n={props:{name:t,mode:s.props.mode},on:{beforeEnter(t){t.style.transformOrigin=s.props.origin,t.style.webkitTransformOrigin=s.props.origin}}};return s.props.leaveAbsolute&&(n.on.leave=r(n.on.leave,(t=>{const{offsetTop:e,offsetLeft:s,offsetWidth:i,offsetHeight:r}=t;t._transitionInitialStyles={position:t.style.position,top:t.style.top,left:t.style.left,width:t.style.width,height:t.style.height},t.style.position="absolute",t.style.top=e+"px",t.style.left=s+"px",t.style.width=i+"px",t.style.height=r+"px"})),n.on.afterLeave=r(n.on.afterLeave,(t=>{if(t&&t._transitionInitialStyles){const{position:e,top:s,left:i,width:r,height:a}=t._transitionInitialStyles;delete t._transitionInitialStyles,t.style.position=e||"",t.style.top=s||"",t.style.left=i||"",t.style.width=r||"",t.style.height=a||""}}))),s.props.hideOnLeave&&(n.on.leave=r(n.on.leave,(t=>{t.style.setProperty("display","none","important")}))),e(a,(0,i.ZP)(s.data,n),s.children)}}}function n(t,e,s="in-out"){return{name:t,functional:!0,props:{mode:{type:String,default:s}},render(s,r){return s("transition",(0,i.ZP)(r.data,{props:{name:t},on:e}),r.children)}}}var o=s(4589);function l(t="",e=!1){const s=e?"width":"height",i=`offset${(0,o.jC)(s)}`;return{beforeEnter(t){t._parent=t.parentNode,t._initialStyle={transition:t.style.transition,overflow:t.style.overflow,[s]:t.style[s]}},enter(e){const r=e._initialStyle;e.style.setProperty("transition","none","important"),e.style.overflow="hidden";const a=`${e[i]}px`;e.style[s]="0",e.offsetHeight,e.style.transition=r.transition,t&&e._parent&&e._parent.classList.add(t),requestAnimationFrame((()=>{e.style[s]=a}))},afterEnter:a,enterCancelled:a,leave(t){t._initialStyle={transition:"",overflow:t.style.overflow,[s]:t.style[s]},t.style.overflow="hidden",t.style[s]=`${t[i]}px`,t.offsetHeight,requestAnimationFrame((()=>t.style[s]="0"))},afterLeave:r,leaveCancelled:r};function r(e){t&&e._parent&&e._parent.classList.remove(t),a(e)}function a(t){const e=t._initialStyle[s];t.style.overflow=t._initialStyle.overflow,null!=e&&(t.style[s]=e),delete t._initialStyle}}a("carousel-transition"),a("carousel-reverse-transition"),a("tab-transition"),a("tab-reverse-transition"),a("menu-transition"),a("fab-transition","center center","out-in"),a("dialog-transition"),a("dialog-bottom-transition"),a("dialog-top-transition");const c=a("fade-transition"),d=(a("scale-transition"),a("scroll-x-transition"),a("scroll-x-reverse-transition"),a("scroll-y-transition"),a("scroll-y-reverse-transition"),a("slide-x-transition")),h=(a("slide-x-reverse-transition"),a("slide-y-transition"),a("slide-y-reverse-transition"),n("expand-transition",l())),u=n("expand-x-transition",l("",!0))},1226:function(t,e,s){s.d(e,{Z:function(){return g}});var i=s(144),r=s(5827),a=s(8083),n=s(6952),o=s(3536),l=s(1431),c=s(8085),d=s(4589),h=s(3325);const u=(0,h.Z)(n.Z,(0,o.d)(["absolute","fixed","top","bottom"]),l.Z,c.Z);var v=u.extend({name:"v-progress-linear",directives:{intersect:a.Z},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,d.kb)(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,d.kb)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:t,[this.isReversed?"right":"left"]:(0,d.kb)(this.normalizedValue,"%"),width:(0,d.kb)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?r.Z5:r.Qn},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=(0,d.kb)(this.normalizedBuffer,"%")),t}},methods:{genContent(){const t=(0,d.z9)(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners(){const t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[t]:!0}}))},onClick(t){if(!this.reactive)return;const{width:e}=this.$el.getBoundingClientRect();this.internalValue=t.offsetX/e*100},onObserve(t,e,s){this.isVisible=s},normalize(t){return t<0?0:t>100?100:parseFloat(t)}},render(t){const e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,d.kb)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),p=v,g=i.Z.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:this.$slots.progress||this.$createElement(p,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},1431:function(t,e,s){var i=s(144);function r(t="value",e="change"){return i.Z.extend({name:"proxyable",model:{prop:t,event:e},props:{[t]:{required:!1}},data(){return{internalLazyValue:this[t]}},computed:{internalValue:{get(){return this.internalLazyValue},set(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:{[t](t){this.internalLazyValue=t}}})}const a=r();e["Z"]=a},3876:function(t,e,s){s.r(e),s.d(e,{default:function(){return x}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ga__login_view"},[s("v-row",{staticClass:"ga__login_view__title",attrs:{"align-content":"center",justify:"center"}},[s("v-col",{attrs:{cols:12}},[s("div",{staticClass:"text-md-h5 grey--text text--darken-1"},[t._v("Choose an")]),s("div",{staticClass:"text-overline font-weight-light white--text ga__login_view__title__text",on:{click:t.handleIPassClick}},[t._v(" IPass ")])])],1),s("v-row",{staticClass:"ga__login_view__auth_cards",attrs:{"align-content":"center"}},t._l(t.cards,(function(e){return s("v-col",{key:e.colorClass,staticClass:"ga__login_view__auth_cards__container",attrs:{cols:6,xs:6,sm:3,md:3}},[s("v-card",{class:["ga__login_view__auth_cards__card","ga__login_view__auth_cards__card--"+e.colorClass]},[s("v-avatar",{staticClass:"ga__login_view__auth_cards__card__avatar",attrs:{size:t.avatarSize,color:"white"}},[s("img",{attrs:{src:e.avatar}})]),s("v-card-text",{staticClass:"text-overline ga__login_view__auth_cards__card__title"},[t._v(" "+t._s(e.title)+" ")]),s("v-btn",{staticClass:"ga__login_view__auth_cards__card__button",attrs:{outlined:"",color:e.colorClass+" darken-2"},on:{click:function(s){return t.handleAuthCardClick(e.authMethod)}}},[t._v(" Login ")])],1)],1)})),1)],1)},r=[],a=s(144),n=s(1070),o=a.Z.extend({name:"GALoginView",data(){return{cards:[{title:"Icon Pass",avatar:s(2833),colorClass:"teal",authMethod:n.rj},{title:"Other Pass",avatar:s(9520),colorClass:"indigo",authMethod:""},{title:"Other Pass",avatar:s(9520),colorClass:"deep-orange",authMethod:""},{title:"Other Pass",avatar:s(9520),colorClass:"yellow",authMethod:""}]}},computed:{avatarSize(){return"sm"===this.$vuetify.breakpoint.name||"xs"===this.$vuetify.breakpoint.name?120:200}},methods:{async handleAuthCardClick(t){await this.$router.push({name:t})},async handleIPassClick(){await this.$router.push({name:n.u6})}}}),l=o,c=s(1001),d=s(3453),h=s.n(d),u=s(6370),v=s(680),p=s(5648),g=s(1226),_=s(6505),f=s(3325),m=(0,f.Z)(g.Z,_.Z,p.Z).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,..._.Z.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...p.Z.options.computed.classes.call(this)}},styles(){const t={...p.Z.options.computed.styles.call(this)};return this.img&&(t.background=`url("${this.img}") center center / cover no-repeat`),t}},methods:{genProgress(){const t=g.Z.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:s}=this.generateRouteLink();return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}}),y=s(4589);(0,y.Ji)("v-card__actions"),(0,y.Ji)("v-card__subtitle");const b=(0,y.Ji)("v-card__text");(0,y.Ji)("v-card__title");var C=s(2102),k=s(2877),w=(0,c.Z)(l,i,r,!1,null,"6a52a20c",null),x=w.exports;h()(w,{VAvatar:u.Z,VBtn:v.Z,VCard:m,VCardText:b,VCol:C.Z,VRow:k.Z})},2833:function(t,e,s){t.exports=s.p+"img/icon_pass.2a323dad.png"},9520:function(t,e,s){t.exports=s.p+"img/to_be_implemented.90d63818.png"}}]);
//# sourceMappingURL=876.f8ff4dcf.js.map