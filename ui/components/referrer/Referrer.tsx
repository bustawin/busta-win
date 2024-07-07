import React from 'react'
import { Col } from 'react-bootstrap'
import RSEditor from 'react-simple-code-editor'
import hs from 'highlight.js'
import example from './example'

export default function Referrer() {
  const [code, setCode] = React.useState(example)
  return (
    <>
      <Col md={6}>
        <RSEditor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => hs.highlight(code, { language: 'toml' }).value}
          padding={10}
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
          }}
        />
      </Col>
      <Col md={6}></Col>
    </>
  )
}
