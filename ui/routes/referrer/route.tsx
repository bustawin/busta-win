import React from 'react'
import * as layout from '@ui/components/layout/layout'
import RSEditor from 'react-simple-code-editor'
import hs from 'highlight.js'
import { Handler } from '@jutils/ui/components/HydrateOnEligibleRoutes/HydrateOnEligibleRoutes'

export const handle: Handler = { useScripts: true }

export default function ReferrerPage() {
  return (
    <layout.MainContainer top="Referrer">
      <layout.Main>
        <Referrer />
      </layout.Main>
    </layout.MainContainer>
  )
}

function Referrer() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  )
  return (
    <RSEditor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => hs.highlight(code, { language: 'javascript' }).value}
      padding={10}
      style={{
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    />
  )
}
