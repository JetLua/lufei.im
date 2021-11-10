import {Button, List, ListItem, ListItemButton, ListItemText} from '@mui/material'
import {FileUpload} from '@mui/icons-material'

import {createPromise, useReducer} from '~/util'
import style from './style.module.scss'

export default React.memo(function({className, onFiles, ...props}: Props) {
  const [state, dispatch] = useReducer({
    buttons: [
      {name: '添加图片', id: 'btn:add:image'},
      {name: '添加文件夹', id: 'btn:add:folder'},
      {name: '清除', id: 'btn:clear'}
    ],
    files: [] as File[]
  })

  React.useEffect(() => {
    onFiles(state.files)
  }, [state.files])

  const tap = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget

    switch (target.dataset.name) {
      case 'btn:add:image': {
        getFiles().then(filter).then(files => {
          if (!files.length) return
          dispatch({files: [...state.files, ...files]})
        })
        break
      }
    }
  }

  /**
   * 弹窗选择文件
   */
  const getFiles = () => {
    const [promise, resolve] = createPromise<File[]>()
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/*'
    input.click()
    input.onchange = () => {
      const files = [] as File[]
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files.item(i))
      }
      resolve(files)
    }
    return promise
  }

  /**
   * 过滤重复文件
   */
  const filter = (files: File[]) => {
    return files.filter(f => !state.files.find(old => old.type === f.type && old.lastModified === f.lastModified))
  }

  return <section {...props}
    className={[style.root, className].join(' ').trim()}
  >
    <section className={style.head}>
      {
        state.buttons.map((item, i) => {
          return <Button key={i}
            variant="contained"
            size="small"
            onClick={tap}
            data-name={item.id}
          >{item.name}</Button>
        })
      }
    </section>
    {state.files.length < 1 && <section
      className={style.tip}
      onClick={tap}
      data-name="btn:add:image"
    >
      <FileUpload color="action" fontSize="large"/>
      <i className={style.text}>拖拽文件到此处</i>
    </section>}
    <List className={style.list}>
      {
        state.files.map((file, i) => {
          return <ListItem className={style.item} key={i} disablePadding>
            <ListItemButton className={style.button} disableGutters>
              <Icon className={style.icon} file={file}/>
              <ListItemText primary={file.name}/>
            </ListItemButton>
          </ListItem>
        })
      }
    </List>
  </section>
})

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  onFiles?: (files: File[]) => void
}


const Icon = React.memo(function({style, file, ...props}: IconProps) {
  const [state, dispatch] = useReducer({
    url: ''
  })

  React.useEffect(() => {
    URL.revokeObjectURL(state.url)
    dispatch({url: URL.createObjectURL(file)})
  }, [file])

  return <i {...props}
    style={{...style, backgroundImage: `url(${state.url})`}}
  />
})

interface IconProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  file: File
}
