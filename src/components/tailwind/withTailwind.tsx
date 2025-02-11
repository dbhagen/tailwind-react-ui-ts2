import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { filterProps } from '../utils'

import tailwindProps, { propTypes } from './tailwindProps'
import getTailwindClassNames from './getTailwindClassNames'

// TODO: Remove Any Types
const withTailwind = (Component: any, { ignore }: { ignore: any[] } = { ignore: [] }) => {
  const WithTailwind = ({ className, ...props }: { className: any }) => (
    <Component
      {...filterProps(
        props,
        tailwindProps.filter(prop => !ignore.includes(prop)),
      )}
      className={classnames([
        getTailwindClassNames(props, { ignore }),
        className,
      ])}
    />
  )

  WithTailwind.displayName = `WithTailwind(${Component.displayName})`

  WithTailwind.propTypes = {
    className: PropTypes.string,
    ...propTypes,
  }

  WithTailwind.defaultProps = {
    className: undefined,
  }

  return WithTailwind
}

export default withTailwind
