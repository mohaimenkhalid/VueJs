var Event = new Vue();

Vue.component("tabs", {

	template: `
		<div class="tab">	
		<ul>
			<li v-for="tab in tabs" :class="{ 'active': tab.selectednow }" @click=makeevent(tab.name)>
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
	created: function(){

		this.tabs = this.$children;
	},

	methods: {

		makeevent: function(s){
			Event.$emit("changetab", s);
		}
	}

});

Vue.component("tab", {

	template: `
		<div v-if="selectednow">
			<slot></slot>
		</div>
	`,

	data: function(){
		return {
			selectednow: false
		}
	},

	created: function(){

		var currenttab = this;
		currenttab.selectednow = currenttab.selected;

		Event.$on("changetab", function(s){
				if (s == currenttab.name) {
					currenttab.selectednow = true;
				}else{
					currenttab.selectednow = false;
				}
		});
	},

	props: ["name", "selected"]


});