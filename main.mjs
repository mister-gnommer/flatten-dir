import fsExtra from "fs-extra"

const main = async () => {
  try {
    const path = `C:/Users/kris/OneDrive/Pulpit/zezwolenia/Poznań`

    await moveFiles(path, 0, path)
  } catch (err) {
    console.log(err)
    console.log(err.stack)
  }
}

const moveFiles = async (path, level, mainPath) => {
  // get elements list
  const elements = await fsExtra.readdir(path)

  // for each element check if it is directory or file
  // if directory then check it for

  for (const element of elements) {
    const stats = await fsExtra.stat(`${path}/${element}`)
    if (stats.isDirectory()) {
      console.log("directory", element)
      await moveFiles(`${path}/${element}`, level + 1, mainPath)
    } else if (level !== 0) {
      console.log("file to move", element)
      await fsExtra.move(`${path}/${element}`, `${mainPath}/${element}`)
    }
  }
  if (level !== 0) {
    await fsExtra.remove(path)
  }
}

main()
