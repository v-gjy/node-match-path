import pathToRegExp from './pathToRegExp'

interface Match {
  matches: boolean
  params: Record<string, string>
}

/**
 * Matches a given url against a path.
 */
export default function match(path: string, url: string): Match {
  const expression = pathToRegExp(path)
  const match = expression.exec(url) || false

  // Matches in strict mode: match string should equal to input (url)
  // Otherwise loose matches will be considered truthy:
  // match('/messages/:id', '/messages/123/users') // true
  const matches = !!match && match[0] === match.input

  return {
    matches,
    params: match && matches ? match.groups : undefined,
  }
}
