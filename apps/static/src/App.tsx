import './App.css'
import './musical-form.css'
import { ProjectManager } from '@blueprint-diagrams/canvas'
import type { FormProject } from '@blueprint-diagrams/canvas'

// Sample project data
const sampleProject: FormProject = {
  "id": "demo-song",
  "title": "Song Form — Demo",
  "measures": 80,
  "timeline": {
    "orientation": "horizontal",
    "showTimelineRuler": true,
    "showLevelRuler": true
  },
  "levels": [
    {
      "id": "L0",
      "index": 0,
      "label": "Top",
      "tracks": [
        {
          "id": "T0",
          "label": "Main",
          "blocks": [
            {
              "id": "B-top-1",
              "name": "Standard 4-part band",
              "levelId": "L0",
              "trackId": "T0",
              "span": { "start": { "measure": 1 }, "end": { "measure": 36 } },
              "labels": { "tr": "E major" },
              "style": { "fill": { "r": 249, "g": 241, "b": 199, "a": 0.9 }, "cornerRadius": 20 },
              "isExpanded": true,
              "children": [
                {
                  "id": "B-intro",
                  "name": "Intro",
                  "levelId": "L1",
                  "trackId": "T0-0",
                  "span": { "start": { "measure": 1 }, "end": { "measure": 4 } },
                  "labels": { "tl": "m1–4" },
                  "style": { "fill": { "r": 255, "g": 159, "b": 28, "a": 0.85 } }
                },
                {
                  "id": "B-chorus1",
                  "name": "Chorus 1",
                  "levelId": "L1",
                  "trackId": "T0-0",
                  "span": { "start": { "measure": 5 }, "end": { "measure": 20 } },
                  "labels": { "tl": "m5–20" },
                  "style": { "fill": { "r": 205, "g": 230, "b": 208, "a": 0.7 } },
                  "children": [
                    {
                      "id": "B-verse1",
                      "name": "Verse 1",
                      "levelId": "L2",
                      "trackId": "T0-0",
                      "span": { "start": { "measure": 5 }, "end": { "measure": 12 } },
                      "labels": { "tl": "m5–12", "bl": "[first lyric]" },
                      "style": { "fill": { "r": 193, "g": 219, "b": 254, "a": 0.9 } }
                    },
                    {
                      "id": "B-refrain1",
                      "name": "Refrain",
                      "levelId": "L2",
                      "trackId": "T0-0",
                      "span": { "start": { "measure": 13 }, "end": { "measure": 20 } },
                      "labels": { "tl": "m13–20" },
                      "style": { "fill": { "r": 243, "g": 201, "b": 201, "a": 0.9 } }
                    }
                  ]
                },
                {
                  "id": "B-chorus2",
                  "name": "Chorus 2",
                  "levelId": "L1",
                  "trackId": "T0-0",
                  "span": { "start": { "measure": 21 }, "end": { "measure": 36 } },
                  "labels": { "tl": "m21–36" },
                  "style": { "fill": { "r": 205, "g": 230, "b": 208, "a": 0.7 } },
                  "children": [
                    {
                      "id": "B-verse2",
                      "name": "Verse 2",
                      "levelId": "L2",
                      "trackId": "T0-0",
                      "span": { "start": { "measure": 21 }, "end": { "measure": 28 } },
                      "labels": { "tl": "m21–28", "bl": "[first lyric]" },
                      "style": { "fill": { "r": 193, "g": 219, "b": 254, "a": 0.9 } }
                    },
                    {
                      "id": "B-refrain2",
                      "name": "Refrain",
                      "levelId": "L2",
                      "trackId": "T0-0",
                      "span": { "start": { "measure": 29 }, "end": { "measure": 36 } },
                      "labels": { "tl": "m29–36" },
                      "style": { "fill": { "r": 243, "g": 201, "b": 201, "a": 0.9 } }
                    }
                  ]
                }
              ]
            },
            {
              "id": "B-top-2",
              "name": "Band + Horns",
              "levelId": "L0",
              "trackId": "T0",
              "span": { "start": { "measure": 45 }, "end": { "measure": 80 } },
              "labels": { "tr": "E major", "tl": "m45–End" },
              "style": { "fill": { "r": 249, "g": 241, "b": 199, "a": 0.9 }, "cornerRadius": 20 },
              "isExpanded": true,
              "children": [
                {
                  "id": "B-chorus3",
                  "name": "Chorus 3",
                  "levelId": "L1",
                  "trackId": "T0-1",
                  "span": { "start": { "measure": 45 }, "end": { "measure": 80 } },
                  "labels": { "tl": "m45–End" },
                  "style": { "fill": { "r": 205, "g": 230, "b": 208, "a": 0.7 } },
                  "children": [
                    {
                      "id": "B-verse3",
                      "name": "Verse 3",
                      "levelId": "L2",
                      "trackId": "T0-1",
                      "span": { "start": { "measure": 45 }, "end": { "measure": 52 } },
                      "labels": { "tl": "m45–52", "bl": "[first lyric]" },
                      "style": { "fill": { "r": 193, "g": 219, "b": 254, "a": 0.9 } }
                    },
                    {
                      "id": "B-refrain3",
                      "name": "Refrain",
                      "levelId": "L2",
                      "trackId": "T0-1",
                      "span": { "start": { "measure": 53 }, "end": { "measure": 60 } },
                      "labels": { "tl": "m53–60" },
                      "style": { "fill": { "r": 243, "g": 201, "b": 201, "a": 0.9 } }
                    },
                    {
                      "id": "B-refrain4",
                      "name": "Refrain",
                      "levelId": "L2",
                      "trackId": "T0-1",
                      "span": { "start": { "measure": 61 }, "end": { "measure": 68 } },
                      "labels": { "tl": "m61–68" },
                      "style": { "fill": { "r": 243, "g": 201, "b": 201, "a": 0.9 } }
                    },
                    {
                      "id": "B-fade",
                      "name": "Repeat to fade",
                      "levelId": "L2",
                      "trackId": "T0-1",
                      "span": { "start": { "measure": 69 }, "end": { "measure": 80 } },
                      "labels": { "tl": "m69–End" },
                      "style": { "fill": { "r": 237, "g": 83, "b": 80, "a": 0.85 }, "cornerRadius": 24 }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

function App() {
  return (
    <>
      <ProjectManager initialProject={sampleProject} />
    </>
  )
}

export default App
