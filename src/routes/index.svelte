<script lang="ts">
	import type { LatLng, LocationInfo } from '$lib/utils/common';

	export let latLng: LatLng;
	export let locationInfo: LocationInfo;
</script>

<pre>
  {JSON.stringify(latLng, null, 2)}
</pre>

<pre>
  {JSON.stringify(locationInfo, null, 2)}
</pre>
