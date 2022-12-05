<template>
	<Header></Header>
	<div class="content-container">
		<slot />
	</div>
	<Footer></Footer>
</template>

<script>
import Header from "../Header/Header.vue";
import Footer from "../Footer/Footer.vue";

export default {
	name: "Layout",
	components: {
		Header,
		Footer,
	},
};
</script>

<style>
.content-container {
	margin: 1rem;
	padding: 1rem;
	min-height: calc(100vh - 135px);
	overflow: hidden;
}
</style>
