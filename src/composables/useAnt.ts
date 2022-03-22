import { onMounted, ref, unref, type Ref } from 'vue'

type MaybeRef<T> = Ref<T> | T

export const useAnt = (
  tilesRef: MaybeRef<HTMLElement[]>
): {
  allTiles: ReadonlyArray<number>
} => {
  const tiles = unref(tilesRef)
  const allTiles: ReadonlyArray<number> = [...Array(100).keys()]
  const currentPosition: Ref<number> = ref(45)
  let timeoutId: null | ReturnType<typeof setTimeout> = null

  const moveAnt = () => {
    clearTimeout(Number(timeoutId))

    timeoutId = setTimeout(() => {
      setNextRandomPosition()
      moveAnt()
    }, 500)
  }

  const setNextRandomPosition = () => {
    const oldPosition = unref(currentPosition)
    tiles[oldPosition].firstElementChild?.classList.add('d-none')
    tiles[oldPosition].classList.toggle('visited')

    const ps = getNextPossiblePositions()
    currentPosition.value = ps[Math.floor(Math.random() * ps.length)]

    tiles[currentPosition.value].firstElementChild?.classList.toggle('d-none')
    changeAntDirection(oldPosition)
  }

  const changeAntDirection = (op: number) => {
    const transformClasses = ['rotate-90', 'rotate--90', 'rotate-180']
    const np = unref(currentPosition)
    let transformClass = ''

    tiles[np].firstElementChild?.classList.remove(...transformClasses)

    if (np - op === 1) transformClass = 'rotate-90'
    else if (np - op === -1) transformClass = 'rotate--90'
    else if (np - op === 10) transformClass = 'rotate-180'
    else return

    tiles[np].firstElementChild?.classList.add(transformClass)
  }

  const getNextPossiblePositions = () => {
    const cp = unref(currentPosition)
    let newPositions = [cp + 1, cp - 1, cp + 10, cp - 10]
    if (cp % 10 === 9) newPositions = [cp - 1, cp + 10, cp - 10]
    if (cp % 10 === 0) newPositions = [cp + 1, cp + 10, cp - 10]

    return newPositions.filter((num) => allTiles.includes(num))
  }

  onMounted(() => moveAnt())

  return { allTiles }
}
