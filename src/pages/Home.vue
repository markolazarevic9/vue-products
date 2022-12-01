<template>
	<div class="chooser">
		<select
			v-model="chosenCategory"
			@change="filterProducts(chosenCategory.categoryId)"
		>
			<option selected disabled>--- Izaberite kategoriju ----</option>
			<option
				class="options"
				v-for="category in categories"
				:key="category.categoryId"
				:value="category"
			>
				{{ category.categoryName }}
			</option>
		</select>
		<button :disabled="chosenCategory === ''" class="button">
			Dodaj novi proizvod
		</button>
	</div>
	<hr />

	<div v-if="chosenCategory" class="main" :class="{ disable: hasProducts }">
		<div id="controls">
			<div id="search">
				<input type="text" :disabled="chosenProducts.length < 1" />
				<i class="fa-solid fa-magnifying-glass"></i>
			</div>
			<div id="sort">
				<h3>Sortiraj po dobavlajcima</h3>
				Rastuce<input type="radio" name="sort" /> Opadajuce<input
					type="radio"
					name="sort"
				/>
			</div>
		</div>
		<div id="products">
			<h2>Proizvodi</h2>
			<ul v-if="chosenProducts.length > 0">
				<li v-for="product in chosenProducts" :key="product.productId">
					{{ product.productName }}
				</li>
			</ul>
			<span v-else>Trenutno nema proizvoda u ovoj kategoriji</span>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Home",
	data() {
		return {
			categories: [],
			allProducts: [],
			chosenProducts: [],
			chosenCategory: "",
		};
	},
	mounted() {
		axios
			.get("http://pabp.viser.edu.rs:8000/api/categories")
			.then((response) => {
				this.categories = response.data;
			});
		axios.get("http://pabp.viser.edu.rs:8000/api/products").then((response) => {
			this.allProducts = response.data;
		});
	},
	methods: {
		filterProducts(id) {
			if (this.allProducts.length > 0) {
				this.chosenProducts = this.allProducts.filter(
					(p) => p.categoryId === id
				);
			}
			console.log(this.chosenProducts);
		},
	},
	computed: {
		hasProducts() {
			if (this.chosenProducts.length > 0) {
				return false;
			}
			return true;
		},
	},
};
</script>

<style>
.disable {
	user-select: none;
	pointer-events: none;
	opacity: 0.5;
}
.chooser {
	display: flex;
	justify-content: center;
	gap: 5%;
	margin-bottom: 2rem;
}

.chooser select {
	flex-basis: 30%;
}

#controls {
	margin-top: 1rem;
	padding: 0.5rem;
	display: flex;
	justify-content: center;
	gap: 5%;
}
#search {
	flex-basis: 50%;
}
#search > input {
	padding: 0.7rem;
	border-radius: 0;
	position: relative;
	border-right: none;
	width: 70%;
	border-color: black;
}

#search > input:focus {
	border-right: none;
	outline: none;
}

#search:focus-within > input,
#search:focus-within > .fa-solid {
	border-color: blue;
}

#search .fa-solid {
	position: relative;
	padding: 0.7rem;
	border: 2px solid black;
	border-left: none;
	border-radius: 0;
	top: 1.5px;
}
#products {
	flex-direction: column;
	display: flex;
	align-items: center;
	margin: 1rem;
}
</style>
