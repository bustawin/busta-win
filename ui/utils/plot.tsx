import createPlotlyComponent from 'react-plotly.js/factory'
import Plotly from 'plotly.js-basic-dist'

/**
 * plotly can only load in a window and has a huge size
 * Only load this file through a dynamic import.
 */

export default createPlotlyComponent(Plotly)
