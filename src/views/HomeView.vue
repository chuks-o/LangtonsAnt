<script setup lang="ts">
import { ref } from 'vue'
import { useAnt } from '../composables/useAnt'
import IconExternalLink from '../components/icons/IconExternalLink.vue'

const tiles = ref<HTMLElement[]>([])

const { allTiles } = useAnt(tiles)
</script>

<template>
  <main id="container">
    <h1>
      <a
        href="https://en.wikipedia.org/wiki/Langton%27s_ant"
        target="_blank"
        title="Langton's ant"
        >Langton's ant</a
      >
      <IconExternalLink />
    </h1>

    <div id="tiles">
      <div
        v-for="i in allTiles"
        class="tile"
        :ref="
          (el) => {
            tiles[i] = el
          }
        "
        :id="i"
        :key="i"
      >
        <span></span>
      </div>
    </div>
  </main>
</template>

<style scoped>
#container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  margin-bottom: 15px;
  align-items: baseline;
}

a {
  text-decoration: none;
  margin-right: 10px;
}

#tiles {
  width: 650px;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
}

.tile {
  background: rgb(245, 245, 245);
  width: 65px;
  height: 65px;
  outline: 0.008em solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visited {
  background: rgb(46, 44, 44);
}
</style>
