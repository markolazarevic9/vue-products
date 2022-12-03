<template>
	<div class="product-add">
		<div class="form">
			<h2>Dodaj novi proizvod</h2>

			<input
				type="text"
				placeholder="unesite naziv proizvoda"
				v-model="newProduct.productName"
			/>
			<input
				type="number"
				placeholder="unesite cenu po jedinici proizvoda"
				v-model="newProduct.unitPrice"
			/>
			<input
				type="number"
				placeholder="Brojnost na lageru"
				v-model="newProduct.unitsInStock"
			/>

			<button @click="addNewProduct()" class="button">
				Snimi novi proizvod
			</button>
		</div>
	</div>

	<div class="close">
		<button @click="closeWindow()">&#10006;</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	inheritAttrs: false,
	name: "AddProduct",
	data() {
		return {
			newProduct: {},
		};
	},
	props: {
		category: Object,
	},
	emits: ["closeProduct"],
	methods: {
		closeWindow() {
			this.$emit("closeProduct", null);
		},
		addNewProduct() {
			const checkEntries =
				this.newProduct.unitPrice != "" &&
				this.newProduct.productName != "" &&
				this.newProduct.unitsInStock != "" &&
				this.category;
			if (checkEntries) {
				this.newProduct.unitPrice = String(this.newProduct.unitPrice);
				this.newProduct.unitsInStock = String(this.newProduct.unitsInStock);
				this.newProduct.categoryId = this.category.categoryId;
				axios
					.post("http://pabp.viser.edu.rs:8000/api/Products", this.newProduct)
					.then(() => {
						alert("uspesno je dodat novi proizvod");
					});
			} else {
				alert("niste uneli podatke");
			}
		},
	},
	computed: {
		hasCategory() {
			return this.category;
		},
	},
};
</script>

<style>
.product-add {
	position: fixed;
	height: 100vh;
	width: 100vw;
	background-color: rgba(27, 27, 27, 0.468);
	top: 0;
	left: 0;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 3rem;
}
.close {
	position: fixed;
	top: 10%;
	left: 70%;
	background-color: white;
	border-radius: 10px;
}
.close button {
	padding: 1rem;
	background-color: transparent;
	color: red;
	border: red;
	font-size: 1.5rem;
}
.close button:hover {
	cursor: pointer;
	background-color: red;
	color: white;
	transition: 0.3s ease-in-out;
}

.form {
	background-color: white;
	display: flex;
	flex-direction: column;
	flex-basis: 60%;
	height: 100%;
	justify-content: flex-start;
	align-items: center;
}

.form > * {
	padding: 1rem;
	margin: 0.5rem;
}
</style>
