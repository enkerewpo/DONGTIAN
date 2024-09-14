<template>
    <div class="home-view">
        <h1>Home View</h1>
        <p>
            <strong>Current route path:</strong> {{ $route.fullPath }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
}
</script>

<style>
.home-view {
    padding: 20px;
}
</style>