const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const getXYOnMouveEvent = (event) => [
  event.clientX - canvas.offsetLeft, 
  event.clientY - canvas.offsetTop
]
const drawnPoints = []
const contributors = {}
const contributorsDisplayList = document.querySelector("#contributors-list")
let clickLock = false

document.querySelector("#theme-changer").addEventListener('click', event => {
  const isLight = document.documentElement.className === "light"

  document.documentElement.className = isLight ? "dark" : "light"
  event.target.textContent = isLight ? "Escuro" : "Claro"
})

const pushContributor = (contributorName) => {
  fetch(`https://api.github.com/users/${contributorName}`)
    .then(response => response.json())
    .then(response => contributors[contributorName] = {
      avatarThumbnail: response.avatar_url,
      githubPage: response.html_url
    })
}

// Formas geométricas aqui
const drawForms = {
  "line": (points, contributor) => {
    const { x0, y0, x1, y1 } = points
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()

    drawnPoints.push(...[
      {x: x0, y: y0, contributor: contributor},
      {x: x1, y: y1, contributor: contributor},
    ])
  }
}

fetch("./points.json")
  .then(response => response.json())
  .then(response => {
    const alreadyContributed = new Set()
    response.forEach(registry => {
      const { form, contributor, ...points } = registry
      if(alreadyContributed.has(contributor)) return
      pushContributor(contributor)
      drawForms[form](points, contributor)
      alreadyContributed.add(contributor)
    })
  })

const appendContributorOnList = (contributorName) => {
  const contributor = contributors[contributorName]
  const anchor = document.createElement('a')
  const img = document.createElement('img')
  const span = document.createElement('span')

  anchor.id = `user_${contributorName}`
  anchor.className = "contributor-row-display"
  anchor.href = contributor.githubPage
  anchor.target = "_blank"

  img.src = contributor.avatarThumbnail
  anchor.appendChild(img)

  span.textContent = contributorName
  anchor.appendChild(span)

  contributorsDisplayList.appendChild(anchor)
}

const removeContributorFromList = (unhoveredContributors) => {
  const contributorsArray = Array.from(contributorsDisplayList.children)
  if(unhoveredContributors === undefined) {
    contributorsArray.forEach(contributor =>
      contributorsDisplayList.removeChild(contributor)
    )
    return
  }

  unhoveredContributors.forEach(unhovered => {
    contributorsDisplayList.removeChild(
      contributorsArray
        .find(contributor => contributor.id === `user_${unhovered}`)
    )
  })
}

const displayContributors = (pointContributors) => {
  const contributorsHovered = []
  pointContributors.forEach(contributorName => {
    if(document.querySelector(`#user_${contributorName}`)) {
      contributorsHovered.push(contributorName)
      return
    }

    appendContributorOnList(contributorName)
  })

  const unhoveredContributors = []
  if(contributorsHovered.length > 0) {
    Array.from(contributorsDisplayList.children).forEach(child => {
      const [_, contributorName] = child.id.split("user_", 2)

      if(!contributorsHovered.find(contributor => contributor === contributorName)) {
        unhoveredContributors.push(contributorName)
      }
    })
  }
  removeContributorFromList(unhoveredContributors)
}

canvas.addEventListener('mousemove', event => {
  if(clickLock) return
  const [x, y] = getXYOnMouveEvent(event)
  const pointContributors = drawnPoints.filter(point => 
    Math.abs(point.x - x) < 10 && 
    Math.abs(point.y - y) < 10
  )
  if(pointContributors.length === 0) return removeContributorFromList()

  displayContributors(
    pointContributors
      .map(pointContributor => pointContributor.contributor)
  )
})

canvas.addEventListener('click', () => {
  if(contributorsDisplayList.children.length === 0) return

  clickLock = !clickLock
})
