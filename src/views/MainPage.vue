<template>
	<v-responsive>
		<v-container dark>
			<v-card flat class="pa-0, height: 100%" max-width="100%">
				<v-card-title class="blue lighten-5"> Result </v-card-title>

				<v-col class="d-flex- text-center">
					<div class="d-flex-text-center">OUTPUT</div>
					{{ $route.params.id }}
				</v-col>
			</v-card>
			<v-container fluid style="margin: 0px; padding: 0px; width: 100%">
				<v-layout>
					<div class="container">
						Content you want in a container as this takes on the container
						class.
					</div>
					<div class="container">
						Content you don't want contained as it takes on the fluid 100%
						width.
					</div>
				</v-layout>
			</v-container>
		</v-container>
	</v-responsive>
</template>

<script>
	export default {};
</script>

<style scoped>
	.border {
		border-style: 2px dotted;
	}
</style>
