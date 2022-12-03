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
		<button
			@click="toggleAddPage = !toggleAddPage"
			:disabled="chosenCategory === ''"
			class="button"
		>
			Dodaj novi proizvod
		</button>
	</div>
	<hr />

	<div v-if="chosenCategory" class="main">
		<div id="controls">
			<div id="search">
				<input
					type="text"
					placeholder="Unesite maksimalni iznos"
					:disabled="hasProducts"
				/>
			</div>
			<div id="sort">
				<h3>Sortiraj po dobavlajcima</h3>
				<select v-model="chosenSupplier" @change="sortPerSupplier()">
					<option v-for="sup in suppliers" :key="sup.supplierId" :value="sup">
						{{ sup.companyName }}
					</option>
				</select>
			</div>
			<div>
				<button
					:disabled="!chosenSupplier"
					class="button"
					@click="cancelFilters()"
				>
					Ponisti filtriranje
				</button>
			</div>
		</div>
		<div id="products">
			<h2>Proizvodi</h2>
			<table class="products" v-if="chosenProducts.length > 0">
				<thead>
					<td>Naziv proizvoda</td>
					<td>Ukupna vrednost</td>
				</thead>
				<tbody>
					<tr
						class="product"
						v-for="product in chosenProducts"
						:key="product.productId"
						@click="openProduct(product)"
					>
						<td>{{ product.productName }}</td>
						<td>{{ product.unitPrice * product.unitsInStock }}$</td>
					</tr>
				</tbody>
			</table>
			<span class="notification" v-else
				>Trenutno nema proizvoda u ovoj kategoriji</span
			>
		</div>
	</div>
	<Product
		:product="sendProduct"
		v-if="Boolean(this.popUpProduct)"
		@closeProduct="onCloseWindow()"
		@refreshPage="removeProduct($event)"
	></Product>
	<AddProduct
		v-if="toggleAddPage"
		@closeProduct="onCloseWindow()"
		@refreshPage="addNewProduct($event)"
		:category="this.chosenCategory"
	>
	</AddProduct>
</template>

<script>
import Product from "./Product.vue";
import AddProduct from "./AddProduct.vue";
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
			product: false,
			orders: [],
			orderDetails: [],
			popUpProduct: false,
			toggleAddPage: false,
		};
	},
	components: {
		Product,
		AddProduct,
	},
	mounted() {
		axios.get("http://pabp.viser.edu.rs:8000/api/Orders").then((response) => {
			this.orders = response.data;
		});
		axios
			.get("http://pabp.viser.edu.rs:8000/api/OrderDetails")
			.then((response) => {
				this.orderDetails = response.data;
			})
			.catch((error) => console.log(error));
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
		},
		findSupplier(id) {
			if (typeof id != undefined && id != null) {
				let supplierName = "";
				supplierName = this.suppliers.find(
					(supplier) => supplier.supplierId == id
				);
				return supplierName.companyName;
			}
			return "";
		},
		openProduct(product) {
			this.product = product;
			this.product.supplierName = this.findSupplier(product.supplierId);
			this.product.orderDetails = this.orderDetails.filter(
				(o) => o.productId == product.productId
			);
			this.product.orders = [];
			if (this.product.orderDetails.length > 0) {
				this.product.orderDetails.map((orderDetail) => {
					this.orders.map((o) => {
						if (o.orderId == orderDetail.orderId) {
							this.product.orders.push(o);
						}
					});
				});
			}
			this.popUpProduct = true;
		},
		onCloseWindow() {
			this.popUpProduct = false;
			this.toggleAddPage = false;
		},
		sortPerSupplier() {
			this.filterProducts(this.chosenCategory.categoryId);
			this.chosenProducts = this.chosenProducts.filter(
				(p) => p.supplierId == this.chosenSupplier.supplierId
			);
			console.log(this.chosenSupplier.supplierId);
		},
		cancelFilters() {
			this.chosenSupplier = "";
			this.filterProducts(this.chosenCategory.categoryId);
		},
		removeProduct(prod) {
			const index = this.allProducts.indexOf(prod);
			this.allProducts.splice(index, index);
			this.filterProducts(this.chosenCategory.categoryId);
		},
		addNewProduct(prod) {
			if (prod) {
				this.allProducts.push(prod);
				this.filterProducts(this.chosenCategory.categoryId);
			}
		},
	},
	computed: {
		hasProducts() {
			if (this.chosenProducts.length > 0) {
				return false;
			}
			return true;
		},
		sendProduct() {
			return this.product;
		},
	},
};
</script>
