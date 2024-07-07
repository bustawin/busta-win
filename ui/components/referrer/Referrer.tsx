import React from 'react'
import { Col, Row } from 'react-bootstrap'
import example from './example'
import hs from 'highlight.js'
import RSEditor from 'react-simple-code-editor'

export default function Referrer() {
  const [code, setCode] = React.useState(example)
  return (
    <>
      <Col md={6}>
        <Row>
          <label>Upload a BibTeX file</label>
          <input type="file" accept=".bibtext" />
        </Row>
      </Col>
      <Col md={6}></Col>
      <RSEditor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => hs.highlight(code, { language: 'json' }).value}
        padding={10}
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
        }}
      />
    </>
  )
}
