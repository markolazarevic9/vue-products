<template>
	<div class="product-add">
		<div class="form">
			<h2>Dodaj novi proizvod</h2>

			<input type="text" placeholder="unesite naziv proizvoda" />
			<input type="text" placeholder="unesite naziv proizvoda" />
			<button class="button">Snimi novi proizvod</button>
		</div>
	</div>

	<div class="close">
		<button @click="closeWindow()">&#10006;</button>
	</div>
</template>

<script>
export default {
	name: "AddProduct",
	data() {
		return {
			newProduct: "",
		};
	},
	props: {
		product: Object,
	},
	emits: ["closeProduct"],
	methods: {
		closeWindow() {
			this.$emit("closeProduct", null);
		},
	},
	computed: {},
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
