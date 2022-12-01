<template>
	<div class="chooser">
		<select
			v-model="chosenCategory"
			@change="filterProducts(chosenCategory.categoryId)"
		>
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
				<input type="text" placeholder="Unesite maksimalni iznos" />
				<i class="fa-solid fa-magnifying-glass"></i>
			</div>
			<div id="sort">
				<h3>Sortiraj po dobavlajcima</h3>
				<select v-model="chosenSupplier">
					<option v-for="sup in suppliers" :key="sup.supplierId">
						{{ sup.companyName }}
					</option>
				</select>
			</div>
		</div>
		<div id="products">
			<h2>Proizvodi</h2>
			<div class="products" v-if="chosenProducts.length > 0">
				<div
					class="product"
					v-for="product in chosenProducts"
					:key="product.productId"
					@click="openProduct(product)"
				>
					{{ product.productName }}
					<span class="price">
						Ukupna vrednost: {{ product.unitPrice * product.unitsInStock }}$
					</span>
				</div>
			</div>
			<span v-else>Trenutno nema proizvoda u ovoj kategoriji</span>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import "./home.css";
export default {
	name: "Home",
	data() {
		return {
			categories: [],
			allProducts: [],
			chosenProducts: [],
			suppliers: [],
			chosenCategory: "",
			chosenSupplier: "",
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
		axios
			.get("http://pabp.viser.edu.rs:8000/api/suppliers")
			.then((response) => {
				this.suppliers = response.data;
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
