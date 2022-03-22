<script setup lang="ts">
import { ref } from 'vue'
import { useAnt } from '../composables/useAnt'
import IconExternalLink from '../components/icons/IconExternalLink.vue'

const tiles = ref<HTMLElement[]>([])
const { allTiles } = useAnt(tiles)
</script>
0
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
        <img class="d-none" src="../assets/ant.png" alt="Ant image" />
      </div>
    </div>
  </main>
</template>

<style scoped>
#container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#tiles {
  width: 300px;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
}

#tiles > .visited {
  background: rgb(53, 52, 52);
}

h1 {
  font-size: 1.8rem;
  display: flex;
  margin-bottom: 1.2rem;
  align-items: center;
}

a {
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;
}

img {
  width: 15px;
}

.d-none {
  display: none;
}

.tile {
  background: rgb(245, 245, 245);
  width: 30px;
  height: 30px;
  outline: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rotate-90 {
  transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

.rotate--90 {
  transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}

.rotate-180 {
  transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}

@media (min-width: 768px) {
  #tiles {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    width: 500px;
  }

  .tile {
    width: 50px;
    height: 50px;
  }

  img {
    width: 20px;
  }
}

@media (min-width: 1024px) {
  #tiles {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    width: 600px;
  }

  .tile {
    width: 60px;
    height: 60px;
  }

  img {
    width: 25px;
  }
}
</style>
