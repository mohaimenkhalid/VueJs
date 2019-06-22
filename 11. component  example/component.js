
var Event = new Vue();

Vue.component("tabs", {

	template: `
		<div class="tab">	
		<ul>
			<li v-for="tab in tabs" :class="{'active': tab.selectedNow}" @click="makeEvent(tab.name)">
			{{ tab.name }}
			</li>
		</ul>

		<div class="details">
			<slot></slot>
		</div>
	</div>

	`,

	data: function(){
		return {
			tabs: []
		}
	},

	methods:{
		makeEvent: function(s){
			Event.$emit("tabchange", s);
		}
	},

	created: function(){

		this.tabs = this.$children;
	}

});


Vue.component("tab", {

	template: ` 
	
	<div v-if="selectedNow">
		<slot></slot>
	</div>

	`,
	data: function(){
		return {

			selectedNow: false
		}
	},

	created: function(){

		var currenttab = this;
		currenttab.selectedNow = currenttab.selected;

		Event.$on("tabchange", function(s){

			if(s == currenttab.name){
				currenttab.selectedNow = true;
			}else{
				currenttab.selectedNow = false;
			}
		});
	},

	props:["name", "selected"]
});