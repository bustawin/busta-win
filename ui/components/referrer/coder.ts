import toml from 'toml'

export default function coder(code: string): string {
  let data
  try {
    data = toml.parse(code)
  } catch (e) {
    return (
      'Parsing error on line ' +
      e.line +
      ', column ' +
      e.column +
      ': ' +
      e.message
    )
  }
  const templates = data.templates
  for (const template of templates) {
    const temp = template.template
  }

  return data
}
