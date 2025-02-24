import { paramCase } from 'param-case'

import tailwindPropToClassName from './tailwindPropToClassName'
import tailwindProps, { propVariants } from './tailwindProps'

const hasUpperCase = (str: string) => str.toLowerCase() !== str

const getTailwindClassNames = (props: Object, { ignore, prefix }: {ignore?: any, prefix?: string} = {ignore: [], prefix: ''}) =>
  !!props &&
  Object.keys(props).reduce((twClasses, key) => {
    if (
      ignore !== undefined &&
      ignore.includes(key) ||
      props[key] === false ||
      typeof props[key] === 'undefined'
    )
      return twClasses

    let type = key.indexOf('-') > 0 ? key.substring(0, key.indexOf('-')) : key
    const variant =
      key.indexOf('-') > 0 ? key.substring(key.indexOf('-') + 1) : key

    if (!tailwindProps.includes(type)) return twClasses

    if (hasUpperCase(type)) {
      type = paramCase(type)
    }

    if (propVariants.includes(variant)) {
      if (variant === 'hocus') {
        return [
          ...twClasses,
          tailwindPropToClassName(`hover:${type}`, props[key], prefix),
          tailwindPropToClassName(`focus:${type}`, props[key], prefix),
        ]
      }

      return [
        ...twClasses,
        tailwindPropToClassName(`${variant}:${type}`, props[key], prefix),
      ]
    }

    return [...twClasses, tailwindPropToClassName(type, props[key], prefix)]
  }, [])

export default getTailwindClassNames
