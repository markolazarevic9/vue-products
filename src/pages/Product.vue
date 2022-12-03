<template>
	<div class="product-container">
		<table class="product-details">
			<h2>Naziv: {{ product.productName }}</h2>
			<tbody>
				<tr>
					<td>Brojnost po jedinici:</td>
					<td>
						<input
							:disabled="!edit"
							type="text"
							v-model="this.productCopy.quantityPerUnit"
						/>
					</td>
				</tr>
				<tr>
					<td>Na lageru:</td>
					<td>
						<input
							:disabled="!edit"
							type="text"
							v-model="this.productCopy.unitsInStock"
						/>
					</td>
				</tr>
				<tr>
					<td>Cena po jedinici:</td>
					<td>
						<input
							:disabled="!edit"
							type="number"
							v-model="this.productCopy.unitPrice"
						/>$
					</td>
				</tr>
				<tr>
					<td>Naruceno:</td>
					<td>{{ product.unitsOnOrder }}</td>
				</tr>
				<tr>
					<td>Dobavljac:</td>
					<td>{{ this.supplierName }}</td>
				</tr>
			</tbody>
			<div class="actions">
				<button @click="deleteProduct()" class="button">Obrisi</button>
				<button @click="edit = !edit" class="button">Izmeni</button>
				<button @click="updateProduct()" class="button">Snimi izmene</button>
			</div>
			<h2>Porudzbine</h2>

			<div class="orders" v-if="orders.length > 0">
				<table>
					<thead>
						<td>Sifra kupca</td>
						<td>Datum narucivanja</td>
						<td>Grad</td>
						<td>Drzava</td>
						<td>Cena po jedinici</td>
						<td>Kolicina</td>
						<td>Popust</td>
					</thead>
					<tbody>
						<tr v-for="order in orders" :key="order.orderId">
							<td>
								{{ order.customerId }}
							</td>
							<td>
								{{ order.orderDate.substring(0, 10) }}
							</td>
							<td>
								{{ order.shipCity }}
							</td>
							<td>
								{{ order.shipCountry }}
							</td>
							<td>
								{{ getOrderDetail(order.orderId)[0].unitPrice }}
							</td>
							<td>
								{{ getOrderDetail(order.orderId)[0].quantity }}
							</td>
							<td>
								{{ getOrderDetail(order.orderId)[0].discount }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<span v-else>Za ovaj proizvod nema porudzbina</span>
		</table>
	</div>
	<div class="close">
		<button @click="closeWindow()">&#10006;</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Product",
	props: {
		product: Object,
	},
	data() {
		return {
			edit: false,
			productCopy: "",
			orders: "",
			orderDetails: "",
			supplierName: "",
		};
	},
	emits: ["closeProduct"],
	methods: {
		closeWindow() {
			this.$emit("closeProduct", null);
		},
		getOrderDetail(id) {
			return this.orderDetails.filter((p) => p.orderId == id);
		},
		updateProduct() {
			axios
				.put(
					`http://pabp.viser.edu.rs:8000/api/Products/${this.productCopy.productId}`,
					this.productCopy
				)
				.then(() => {})
				.catch((error) => console.debug(error));
		},
		deleteProduct() {
			if (confirm("da li zelite da obrisete ovaj proizvod")) {
				axios
					.delete(
						`http://pabp.viser.edu.rs:8000/api/Products/${this.productCopy.productId}`
					)
					.then(() => {
						delete this.productCopy;
						this.closeWindow();
					})
					.catch((error) => console.debug(error));
			}
		},
	},
	computed: {},
	mounted() {
		this.orderDetails = this.product.orderDetails;
		this.orders = this.product.orders;
		this.supplierName = this.product.supplierName;
		delete this.product.orderDetails;
		delete this.product.orders;
		delete this.product.supplierName;
		this.productCopy = this.product;
	},
};
</script>

<style>
.actions {
	display: flex;
	gap: 5%;
}
.actions > button:first-child {
	background-color: rgb(147, 12, 12);
}
.actions > button:nth-child(2) {
	background-color: rgb(91, 91, 39);
}
.product-container {
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

.product-details {
	background-color: white;
	display: flex;
	flex-direction: column;
	flex-basis: 60%;
	height: 100%;
	justify-content: flex-start;
	align-items: center;
}

.product-details > * {
	margin: 1rem;
	padding: 0.5rem;
}

.orders {
	height: 50%;
	overflow-y: scroll;
	flex-basis: 100%;
	margin: 0;
}
</style>
