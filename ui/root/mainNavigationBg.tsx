import svgFile from './bg.svg?raw'

export default function MainNavigationBg() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgFile }}
      className="main-navigation-bg"
    />
  )
}
