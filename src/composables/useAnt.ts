import { onMounted, ref, unref, type Ref } from 'vue'

type MaybeRef<T> = Ref<T> | T

export const useAnt = (
  tilesRef: MaybeRef<HTMLElement[]>
): {
  allTiles: ReadonlyArray<number>
} => {
  const ant = '🔴'
  const tiles = unref(tilesRef)
  const allTiles: ReadonlyArray<number> = [...Array(100).keys()]
  const currentPosition: Ref<number> = ref(45)

  let timeoutId: null | ReturnType<typeof setTimeout> = null

  const moveAnt = () => {
    clearTimeout(Number(timeoutId))

    const v = unref(currentPosition)
    const tileChildElement = tiles[v].firstElementChild

    if (tileChildElement) tileChildElement.innerHTML = ant

    timeoutId = setTimeout(() => {
      removeAnt(v)
      toggleTileBackground()
      setNextRandomPosition()

      moveAnt()
    }, 800)
  }

  const toggleTileBackground = () => {
    const v = unref(currentPosition)

    if (tiles[v].classList.contains('visited')) {
      tiles[v].classList.remove('visited')
    } else {
      tiles[v].classList.add('visited')
    }
  }

  const removeAnt = (i: number) => {
    const tileChildElement = tiles[i].firstElementChild
    if (tileChildElement) tileChildElement.innerHTML = ''
  }

  const setNextRandomPosition = () => {
    const ps = getNextPossiblePositions()
    currentPosition.value = ps[Math.floor(Math.random() * ps.length)]
  }

  const getNextPossiblePositions = () => {
    const p = unref(currentPosition)

    if (p <= 9 && p % 10 === 0) {
      return [p + 1, p + 10]
    } else if (p <= 9 && p % 10 === 9) {
      return [p - 1, p + 10]
    } else if (p >= 90 && p % 10 === 9) {
      return [p - 1, p - 10]
    } else if (p >= 90 && p % 10 === 0) {
      return [p - 10, p + 1]
    } else if (p <= 9) {
      return [p - 1, p + 1, p + 10]
    } else if (p >= 90) {
      return [p - 1, p + 1, p - 10]
    } else if (p % 10 === 0) {
      return [p + 10, p - 10, p + 1]
    } else if (p % 10 === 9) {
      return [p + 10, p - 10, p - 1]
    } else {
      return [p + 1, p - 1, p + 10, p - 10]
    }
  }

  onMounted(() => {
    moveAnt()
  })

  return { allTiles }
}
