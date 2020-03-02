<script>
	import { loadModules } from "esri-loader";
	import { onMount } from "svelte";

	export let name;
  let viewDiv;
  let centerText;

	onMount(async () => {
    const esriLoaderOptions = { css: true };
    const [EsriMap, MapView] = await loadModules(
      ["esri/Map", "esri/views/MapView"],
      esriLoaderOptions
    );

    const map = new EsriMap({
      basemap: "streets"
    });

    const view = new MapView({
      container: viewDiv,
      map: map,
      zoom: 13,
      center: [-116.53, 33.82] // longitude, latitude
    });

    view.watch("center", center => {
      const { latitude, longitude } = center;
      centerText = `Lat: ${latitude.toFixed(2)} | Lon: ${longitude.toFixed(2)}`;
    });
  });
</script>

<main>
	<h1>Hello {name}!</h1>
	<div class="view" bind:this={viewDiv} />
  {#if centerText}
    <p>{centerText}</p>
  {/if}
</main>

<style>
	.view {
    height: 400px;
    width: 400px;
  }
</style>