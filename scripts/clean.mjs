import {existsSync, rmSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(currentDirectory, '..')

const pathsToRemove = [
  '.next',
  'tsconfig.tsbuildinfo',
  'dev-request.log',
  'dev-server.err.log',
  'dev-server.out.log',
]

for (const relativePath of pathsToRemove) {
  const targetPath = join(projectRoot, relativePath)

  if (!existsSync(targetPath)) {
    continue
  }

  rmSync(targetPath, {recursive: true, force: true})
  console.log(`Removed ${relativePath}`)
}
