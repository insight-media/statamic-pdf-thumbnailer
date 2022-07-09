(()=>{function t(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return e(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Statamic.$components.register("page_number-fieldtype",{mixins:[Fieldtype],template:'\n            <div v-if="isPdf">\n                <div v-if="loading">\n                    <loading-graphic text="Generating" />\n                </div>\n                <div class="flex" v-else>\n                    <v-select :options="pageNumberList" :clearable="false" v-model="page" v-if="asset.values.pdf_page_count"/>\n                    <text-input type="number" :min="1" v-model="page" v-else/>\n                    <button type="button" class="btn ml-2" @click="convert">Generate</button>\n                </div>\n            </div>\n            ',data:function(){return{page:1,assetEditor:!1,asset:!1,loading:!1}},created:function(){this.getAssetEditor()},methods:{getAssetEditor:function(){for(var t,e=this.$stacks.stacks[0].$parent;e;){if(e.asset){this.assetEditor=e,this.asset=e.asset;break}e=!!e.$parent&&e.$parent}this.page=null!==(t=this.asset.values.pdf_converted_page)&&void 0!==t?t:1},convert:function(){var t=this,e=cp_url("convert-pdf/");this.loading=!0,this.$axios.post(e,{page:this.page,url:this.asset.url},this.toEleven).then((function(e){t.asset=e.data.asset,t.loading=!1,t.$toast.success("The thumbnail has been generated.")})).catch((function(e){t.loading=!1,t.$toast.error("Something went wrong while generating.")}))}},computed:{isPdf:function(){return this.asset&&this.asset.isPdf},pageNumberList:function(){return t(Array(this.asset.values.pdf_page_count-1+1).keys()).map((function(t){return t+1}))}}})})();