<template>
	<Layout>
		<RouterView></RouterView>
	</Layout>
</template>

<script>
import Layout from "./components/Layout/Layout.vue";
export default {
	name: "App",
	components: {
		Layout,
	},
};
</script>

<style>
html {
	font-size: 16px;
}

* {
	box-sizing: border-box;
	margin: 0px;
	padding: 0px;
	scroll-behavior: smooth;
	font-family: Arial, Helvetica, sans-serif;
}

.button {
	padding: 0.5rem;
	width: 7rem;
	background-color: rgba(86, 86, 86, 1);
	color: white;
	border: none;
}

.button:hover {
	cursor: pointer;
	background-color: black;
	transition: 0.3s ease-in-out;
}

.button:disabled {
	opacity: 0.3;
	cursor: not-allowed;
}
</style>
